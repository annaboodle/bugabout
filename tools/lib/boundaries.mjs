// Shared slimming for the vendored boundary sets. Natural Earth ships 168
// properties per feature and full-precision geometry; the browser needs a name,
// a code, and rings with a bounding box to prefilter against.

export function roundRing(ring, precision) {
  const factor = 10 ** precision;
  const round = (value) => Math.round(value * factor) / factor;
  const points = [];
  for (const [lng, lat] of ring) {
    const point = [round(lng), round(lat)];
    const previous = points.at(-1);
    // Rounding collapses neighbouring vertices; consecutive duplicates add bytes
    // and segment tests without changing the shape.
    if (previous && previous[0] === point[0] && previous[1] === point[1]) continue;
    points.push(point);
  }
  return points;
}

export function boundingBox(ring) {
  let minLng = Infinity;
  let minLat = Infinity;
  let maxLng = -Infinity;
  let maxLat = -Infinity;
  for (const [lng, lat] of ring) {
    if (lng < minLng) minLng = lng;
    if (lng > maxLng) maxLng = lng;
    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;
  }
  return [minLng, minLat, maxLng, maxLat];
}

// Flattens Polygon/MultiPolygon features into one polygon list with precomputed
// outer-ring bounding boxes, which is the prefilter that makes a brute-force
// point-in-polygon lookup fast enough to run in the browser.
export function slimFeatures(features, { precision, nameOf, isoOf, groupOf }) {
  const names = [];
  const isos = [];
  const groups = [];
  const polys = [];

  for (const feature of features) {
    const index = names.length;
    names.push(nameOf(feature));
    isos.push(isoOf(feature) ?? "");
    if (groupOf) groups.push(groupOf(feature) ?? "");

    const polygons =
      feature.geometry.type === "Polygon"
        ? [feature.geometry.coordinates]
        : feature.geometry.coordinates;

    for (const polygon of polygons) {
      // A ring needs at least three distinct points plus the closing point.
      const rings = polygon
        .map((ring) => roundRing(ring, precision))
        .filter((ring) => ring.length >= 4);
      if (!rings.length) continue;
      polys.push({ c: index, b: boundingBox(rings[0]), r: rings });
    }
  }

  return groupOf ? { names, isos, groups, polys } : { names, isos, polys };
}
