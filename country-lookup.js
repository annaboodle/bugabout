(function exposeCountryLookup(global) {
  "use strict";

  // The vendored data carries its own version. index.html cache-busts the authored
  // CSS and JS, but nothing invalidated these, so regenerating a boundary file
  // left browsers serving the old one. Bump when tools/ regenerates them.
  const DATA_VERSION = "2";
  // Root-absolute: the app also runs from a bug page at /<slug>/, where "./"
  // would resolve inside that directory and the lookup would silently fail,
  // leaving every stop without a country.
  const COUNTRIES_URL = `/vendor/countries.json?v=${DATA_VERSION}`;
  const STATES_URL = `/vendor/us-states.json?v=${DATA_VERSION}`;

  // Geocaching stops sit on shorelines, and the 50m country outline generalizes
  // the coast by a kilometre or two. 11% of the large fixture's stops land just
  // outside every polygon; every one is within 25 km of a coast, none mid-ocean.
  const COAST_TOLERANCE_KM = 25;

  // States are a different problem: they share long land borders, so a generous
  // snap could hand a stop to the wrong neighbour. The 10m source's gaps are only
  // a few hundred metres, so a short tolerance covers offshore and near-border
  // stops without guessing across a state line.
  const STATE_TOLERANCE_KM = 10;

  const KM_PER_DEGREE = 111.32;

  // Longitude degrees shrink toward the poles. The floor keeps the search box
  // from widening into a whole-world scan at extreme latitudes.
  const MIN_LATITUDE_SCALE = 0.15;

  // Scanning every polygon per stop costs over a second for a 2,472-stop journey.
  // Bucketing them into a coarse grid keeps each lookup to a few candidates.
  const GRID_DEGREES = 10;
  const GRID_COLUMNS = 360 / GRID_DEGREES;
  const GRID_ROWS = 180 / GRID_DEGREES;

  const supported = () => typeof fetch === "function";

  const latitudeScale = (latitude) =>
    Math.max(MIN_LATITUDE_SCALE, Math.cos((latitude * Math.PI) / 180));

  const rowAt = (lat) =>
    Math.min(GRID_ROWS - 1, Math.max(0, Math.floor((lat + 90) / GRID_DEGREES)));

  function pointInRing(lng, lat, ring) {
    let inside = false;
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const current = ring[i];
      const previous = ring[j];
      const yi = current[1];
      const yj = previous[1];
      if (yi > lat === yj > lat) continue;
      const xi = current[0];
      const xj = previous[0];
      if (lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) inside = !inside;
    }
    return inside;
  }

  function pointInPolygon(lng, lat, rings) {
    if (!pointInRing(lng, lat, rings[0])) return false;
    for (let i = 1; i < rings.length; i += 1) {
      if (pointInRing(lng, lat, rings[i])) return false;
    }
    return true;
  }

  function segmentDistanceKm(lng, lat, scale, ax, ay, bx, by) {
    const startX = (ax - lng) * scale;
    const startY = ay - lat;
    const deltaX = (bx - ax) * scale;
    const deltaY = by - ay;
    const lengthSquared = deltaX * deltaX + deltaY * deltaY;
    let amount = lengthSquared ? -(startX * deltaX + startY * deltaY) / lengthSquared : 0;
    if (amount < 0) amount = 0;
    else if (amount > 1) amount = 1;
    return Math.hypot(startX + amount * deltaX, startY + amount * deltaY) * KM_PER_DEGREE;
  }

  // One boundary set: countries, or US states. Each keeps its own index and grid.
  function createBoundarySet(url, toleranceKm) {
    let loadPromise = null;
    let index = null;
    let grid = null;

    // Dedupes candidates across cells without allocating a Set per lookup.
    let seen = null;
    let seenStamp = 0;

    function buildGrid(polys) {
      grid = new Array(GRID_COLUMNS * GRID_ROWS).fill(null);
      seen = new Int32Array(polys.length);
      seenStamp = 0;

      polys.forEach((polygon, polygonIndex) => {
        const box = polygon.b;
        const firstColumn = Math.floor((box[0] + 180) / GRID_DEGREES);
        const lastColumn = Math.floor((box[2] + 180) / GRID_DEGREES);
        const firstRow = rowAt(box[1]);
        const lastRow = rowAt(box[3]);
        for (let column = firstColumn; column <= lastColumn; column += 1) {
          const wrapped = ((column % GRID_COLUMNS) + GRID_COLUMNS) % GRID_COLUMNS;
          for (let row = firstRow; row <= lastRow; row += 1) {
            const cell = row * GRID_COLUMNS + wrapped;
            if (!grid[cell]) grid[cell] = [];
            grid[cell].push(polygonIndex);
          }
        }
      });
    }

    // Columns wrap so a search near the antimeridian still sees the far side.
    function candidates(lat, lng, latPad, lngPad) {
      const found = [];
      seenStamp += 1;
      const firstColumn = Math.floor((lng - lngPad + 180) / GRID_DEGREES);
      const lastColumn = Math.floor((lng + lngPad + 180) / GRID_DEGREES);
      const firstRow = rowAt(lat - latPad);
      const lastRow = rowAt(lat + latPad);

      for (let column = firstColumn; column <= lastColumn; column += 1) {
        const wrapped = ((column % GRID_COLUMNS) + GRID_COLUMNS) % GRID_COLUMNS;
        for (let row = firstRow; row <= lastRow; row += 1) {
          const cell = grid[row * GRID_COLUMNS + wrapped];
          if (!cell) continue;
          for (const polygonIndex of cell) {
            if (seen[polygonIndex] === seenStamp) continue;
            seen[polygonIndex] = seenStamp;
            found.push(polygonIndex);
          }
        }
      }
      return found;
    }

    function containingPolygon(lat, lng) {
      for (const polygonIndex of candidates(lat, lng, 0, 0)) {
        const polygon = index.polys[polygonIndex];
        const box = polygon.b;
        if (lng < box[0] || lng > box[2] || lat < box[1] || lat > box[3]) continue;
        if (pointInPolygon(lng, lat, polygon.r)) return polygon;
      }
      return null;
    }

    function nearestPolygon(lat, lng, maxKm) {
      const scale = latitudeScale(lat);
      const latPad = maxKm / KM_PER_DEGREE;
      const lngPad = latPad / scale;
      let best = null;
      let bestDistance = maxKm;

      for (const polygonIndex of candidates(lat, lng, latPad, lngPad)) {
        const polygon = index.polys[polygonIndex];
        const box = polygon.b;
        if (lng < box[0] - lngPad || lng > box[2] + lngPad) continue;
        if (lat < box[1] - latPad || lat > box[3] + latPad) continue;

        for (const ring of polygon.r) {
          for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
            const distance = segmentDistanceKm(
              lng,
              lat,
              scale,
              ring[j][0],
              ring[j][1],
              ring[i][0],
              ring[i][1],
            );
            if (distance < bestDistance) {
              bestDistance = distance;
              best = polygon;
            }
          }
        }
      }
      return best;
    }

    function describe(polygon, source) {
      return {
        name: index.names[polygon.c],
        iso: index.isos[polygon.c] || null,
        group: index.groups?.[polygon.c] || null,
        source,
      };
    }

    function lookup(lat, lng) {
      if (!index || !Number.isFinite(lat) || !Number.isFinite(lng)) return null;
      const contained = containingPolygon(lat, lng);
      if (contained) return describe(contained, "polygon");
      const nearby = nearestPolygon(lat, lng, toleranceKm);
      return nearby ? describe(nearby, "coast") : null;
    }

    // Resolves to the index, or null if the data is unavailable for any reason.
    // Callers fall back to reporting the value as unavailable rather than failing.
    function load() {
      if (loadPromise) return loadPromise;
      loadPromise = fetch(url)
        .then((response) => {
          if (!response.ok) throw new Error(`${response.status}`);
          return response.json();
        })
        .then((data) => {
          if (!Array.isArray(data?.polys) || !Array.isArray(data?.names)) return null;
          index = data;
          buildGrid(index.polys);
          return index;
        })
        .catch(() => null);
      return loadPromise;
    }

    return { load, lookup };
  }

  const countries = createBoundarySet(COUNTRIES_URL, COAST_TOLERANCE_KM);
  const states = createBoundarySet(STATES_URL, STATE_TOLERANCE_KM);

  global.BugaboutCountries = Object.freeze({
    load: countries.load,
    lookup: countries.lookup,
    loadStates: states.load,
    lookupState: states.lookup,
    supported,
  });
})(window);
