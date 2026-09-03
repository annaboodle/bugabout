await (async function runBrowserSmokeTests() {
  "use strict";

  const summary = document.querySelector("#summary");
  const results = document.querySelector("#results");
  const details = document.querySelector("#details");
  const failures = [];
  let passed = 0;

  function assert(condition, message) {
    if (!condition) throw new Error(message);
  }

  function equal(actual, expected, label) {
    assert(
      Object.is(actual, expected),
      `${label}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`,
    );
  }

  function near(actual, expected, tolerance, label) {
    assert(
      Math.abs(actual - expected) <= tolerance,
      `${label}: expected ${expected} ± ${tolerance}, got ${actual}`,
    );
  }

  async function test(name, check) {
    const row = document.createElement("li");
    row.textContent = name;
    results.append(row);
    try {
      await check();
      row.className = "pass";
      passed += 1;
    } catch (error) {
      row.className = "fail";
      const message = error instanceof Error ? error.stack || error.message : String(error);
      failures.push(`${name}\n${message}`);
    }
  }

  async function fixture(code) {
    const fileName = `${code}.kml`;
    const response = await fetch(`./fixtures/${fileName}`);
    assert(response.ok, `${fileName}: HTTP ${response.status}`);
    return window.BugaboutKml.parse(await response.text(), { fileName });
  }

  async function derivePlaces(stops) {
    const countries = await window.BugaboutCountries.load();
    assert(countries, "country boundaries did not load");

    const countryNames = new Set();
    const matches = stops.map((stop) => {
      const match = window.BugaboutCountries.lookup(stop.lat, stop.lng);
      assert(match, `no country for ${stop.code} at ${stop.lat}, ${stop.lng}`);
      countryNames.add(match.name);
      return match;
    });

    const states = new Set();
    if (matches.some((match) => match.name === "United States")) {
      const stateBoundaries = await window.BugaboutCountries.loadStates();
      assert(stateBoundaries, "US state boundaries did not load");
      stops.forEach((stop, index) => {
        if (matches[index].name !== "United States") return;
        const state = window.BugaboutCountries.lookupState(stop.lat, stop.lng);
        assert(state, `no US state for ${stop.code} at ${stop.lat}, ${stop.lng}`);
        states.add(state.name);
      });
    }

    return { countryNames, states };
  }

  async function run() {
    let small;
    let large;

    await test("KML importer preserves absent descriptions as empty", () => {
      const parsed = window.BugaboutKml.parse(
        `<?xml version="1.0"?><kml xmlns="http://www.opengis.net/kml/2.2"><Document><name>Minimal</name><Placemark><name>GC00001</name><Point><coordinates>-122.33,47.61,0</coordinates></Point></Placemark></Document></kml>`,
        { fileName: "TBTEST.kml" },
      );
      equal(parsed.meta.description, "", "description");
      equal(parsed.stops.length, 1, "stop count");
      equal(parsed.meta.publicCode, undefined, "no public code is derived from the file name");
    });

    await test("TBBDVQG fixture parses with its official totals", async () => {
      small = await fixture("TBBDVQG");
      equal(small.stops.length, 6, "stop count");
      near(small.meta.totalMiles, 1.671, 0.001, "official miles");
    });

    // Few stops, enormous distances. This is the shape that broke the follow
    // camera: its fixed 45-stop lookahead spanned the entire route at every
    // index, so the frame never changed and the map never moved.
    await test("TBAR286 fixture is sparse but globe-spanning", async () => {
      const sparse = await fixture("TBAR286");
      equal(sparse.stops.length, 18, "stop count");
      near(sparse.meta.totalMiles, 18972.448, 0.001, "official miles");
      const longitudes = sparse.stops.map((stop) => stop.lng);
      const span = Math.max(...longitudes) - Math.min(...longitudes);
      assert(span > 150, `expected a globe-spanning route, got ${span.toFixed(1)} degrees`);
      assert(
        sparse.stops.length < 45,
        "the point of this fixture is that it has fewer stops than the camera lookahead",
      );
    });

    await test("TBA5TD9 fixture parses with antimeridian crossings", async () => {
      large = await fixture("TBA5TD9");
      equal(large.stops.length, 2487, "stop count");
      equal(large.meta.uniqueCacheCodes, 2442, "unique cache count");
      near(large.meta.totalMiles, 176698.986, 0.01, "official miles");
      equal(large.meta.antimeridianCrossings, 2, "antimeridian crossings");
    });

    await test("small fixture resolves to the United States and Washington", async () => {
      const places = await derivePlaces(small.stops);
      equal(places.countryNames.size, 1, "country count");
      assert(places.countryNames.has("United States"), "United States was not resolved");
      equal(places.states.size, 1, "state count");
      assert(places.states.has("Washington"), "Washington was not resolved");
    });

    await test("large fixture resolves 22 countries and 19 US states", async () => {
      const places = await derivePlaces(large.stops);
      equal(places.countryNames.size, 22, "country count");
      assert(places.countryNames.has("Macao"), "Macao was not resolved");
      assert(places.countryNames.has("Monaco"), "Monaco was not resolved");
      equal(places.states.size, 19, "US state count");
    });

    await test("small journeys survive a share-link round trip", async () => {
      assert(window.BugaboutLink.supported(), "CompressionStream is unavailable");
      const link = await window.BugaboutLink.encode(small.stops, small.meta);
      assert(link && link.length <= 2000, "small journey did not produce a shareable link");
      window.history.replaceState(null, "", link);
      const decoded = await window.BugaboutLink.decode();
      assert(decoded, "share link did not decode");
      equal(decoded.stops.length, small.stops.length, "decoded stop count");
      equal(decoded.meta.publicCode, undefined, "no public code survives a round trip");
      near(decoded.meta.totalMiles, Math.round(small.meta.totalMiles * 100) / 100, 0.001, "decoded official miles");
      near(decoded.stops[0].lat, small.stops[0].lat, 0.0001, "decoded latitude");
      near(decoded.stops[0].lng, small.stops[0].lng, 0.0001, "decoded longitude");
      window.BugaboutLink.clear();
    });

    await test("oversized journeys are not offered as fragile links", async () => {
      equal(await window.BugaboutLink.encode(large.stops, large.meta), null, "large link");
    });

    document.documentElement.dataset.status = failures.length ? "failed" : "passed";
    summary.textContent = failures.length
      ? `${passed} passed, ${failures.length} failed`
      : `${passed} browser smoke tests passed`;
    if (failures.length) {
      details.hidden = false;
      details.textContent = failures.join("\n\n");
    }
  }

  await run().catch((error) => {
    document.documentElement.dataset.status = "failed";
    summary.textContent = "Smoke-test runner failed";
    details.hidden = false;
    details.textContent = error instanceof Error ? error.stack || error.message : String(error);
  });
})();
