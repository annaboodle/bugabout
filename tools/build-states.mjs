// Builds vendor/us-states.json, the state index used by country-lookup.js to
// resolve a US stop to its state.
//
// Uses Natural Earth's 10m admin-1 set rather than 50m. State borders follow
// rivers and roads, which is exactly where geocaches cluster, so the coarser 50m
// generalization would misassign stops near state lines often enough to notice.
// The 10m source is ~39 MB, so it is cached outside the repo and only the ~51 US
// features are shipped.
//
// Run once: node tools/build-states.mjs

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { tmpdir } from "node:os";
import { slimFeatures } from "./lib/boundaries.mjs";

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const TARGET = join(projectRoot, "vendor", "us-states.json");

const SOURCE_URL =
  "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_1_states_provinces.geojson";
const CACHE_DIR = join(tmpdir(), "bugabout-natural-earth");
const CACHE_FILE = join(CACHE_DIR, "ne_10m_admin_1_states_provinces.geojson");

// ~110 m, well inside the 10m source's own generalization, so it is never the
// limiting factor on border accuracy.
const PRECISION = 3;

async function readSource() {
  if (!existsSync(CACHE_FILE)) {
    console.log(`downloading ${SOURCE_URL}`);
    const response = await fetch(SOURCE_URL);
    if (!response.ok) throw new Error(`download failed: ${response.status}`);
    mkdirSync(CACHE_DIR, { recursive: true });
    writeFileSync(CACHE_FILE, Buffer.from(await response.arrayBuffer()));
  }
  return JSON.parse(readFileSync(CACHE_FILE, "utf8"));
}

const source = await readSource();
const features = source.features.filter((feature) => feature.properties.iso_a2 === "US");
if (!features.length) throw new Error("no US features found in the source");

const { names, isos, polys } = slimFeatures(features, {
  precision: PRECISION,
  nameOf: (feature) => feature.properties.name,
  isoOf: (feature) => feature.properties.iso_3166_2,
});

const output = {
  source: "Natural Earth 10m admin-1 states and provinces, United States only",
  precision: PRECISION,
  names,
  isos,
  polys,
};

writeFileSync(TARGET, JSON.stringify(output));
console.log(
  `us-states.json: ${names.length} states, ${polys.length} polygons, ${(JSON.stringify(output).length / 1024 / 1024).toFixed(2)} MB`,
);
