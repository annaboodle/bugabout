// Builds vendor/countries.json, the country-boundary index used by country-lookup.js.
//
// Run once: node tools/build-countries.mjs
// Rerun only if the Natural Earth source file is replaced.

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { slimFeatures } from "./lib/boundaries.mjs";

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE = join(projectRoot, "vendor", "ne_50m_admin_0_countries.geojson");
const TARGET = join(projectRoot, "vendor", "countries.json");

// ~110 m at the equator: far finer than country resolution, and country-lookup.js
// absorbs any remaining edge error with its coastal tolerance.
const PRECISION = 3;

// Natural Earth's formal ADMIN name is the identity key, but a few are too long
// for the player's location line. Keep this list minimal.
const DISPLAY_NAMES = {
  "United States of America": "United States",
  "Hong Kong S.A.R.": "Hong Kong",
  "Macao S.A.R": "Macao",
};

const source = JSON.parse(readFileSync(SOURCE, "utf8"));
const { names, isos, groups, polys } = slimFeatures(source.features, {
  precision: PRECISION,
  nameOf: (feature) => DISPLAY_NAMES[feature.properties.ADMIN] ?? feature.properties.ADMIN,
  isoOf: (feature) => feature.properties.ISO_A2_EH,
  // Continent, so a journey can report how many it reached.
  groupOf: (feature) => feature.properties.CONTINENT,
});

const output = {
  source: "Natural Earth 50m admin-0 countries",
  precision: PRECISION,
  names,
  isos,
  groups,
  polys,
};

writeFileSync(TARGET, JSON.stringify(output));
console.log(
  `countries.json: ${names.length} countries, ${polys.length} polygons, ${(JSON.stringify(output).length / 1024 / 1024).toFixed(2)} MB`,
);
