const sampleStops = [
  {
    date: "2021-12-14",
    place: "Seattle",
    region: "Washington",
    country: "United States",
    countryCode: "US",
    cache: "GC9GEE2 · Wallingford",
    kicker: "THE ADVENTURE BEGINS",
    story: "Scout is released into the wild with one ambitious mission: see the world.",
    lat: 47.6062,
    lng: -122.3321,
  },
  {
    date: "2022-01-08",
    place: "New York City",
    region: "New York",
    country: "United States",
    countryCode: "US",
    cache: "GC7B6G5 · Bryant Park",
    kicker: "COAST TO COAST",
    story: "A red-eye flight delivers Scout to the canyons of Manhattan and a snowy city cache.",
    lat: 40.7128,
    lng: -74.006,
  },
  {
    date: "2022-03-19",
    place: "Reykjavík",
    region: "Capital Region",
    country: "Iceland",
    countryCode: "IS",
    cache: "GC4Z8Y8 · Sun Voyager",
    kicker: "FIRST BORDER CROSSING",
    story: "The first passport stamp comes with sea wind, lava fields, and a view of distant mountains.",
    lat: 64.1466,
    lng: -21.9426,
  },
  {
    date: "2022-05-03",
    place: "London",
    region: "England",
    country: "United Kingdom",
    countryCode: "GB",
    cache: "GC3KG2M · Thames Path",
    kicker: "MIND THE GAP",
    story: "Scout rides the Underground, crosses the Thames, and spends a week near an old stone wall.",
    lat: 51.5072,
    lng: -0.1276,
  },
  {
    date: "2022-07-27",
    place: "Paris",
    region: "Île-de-France",
    country: "France",
    countryCode: "FR",
    cache: "GC5XQ6P · Canal Saint-Martin",
    kicker: "A VERY FRENCH DETOUR",
    story: "A bicycle basket, two croissants, and one accidental loop around the canal.",
    lat: 48.8566,
    lng: 2.3522,
  },
  {
    date: "2022-10-11",
    place: "Rome",
    region: "Lazio",
    country: "Italy",
    countryCode: "IT",
    cache: "GC6FZ2Q · Via Appia",
    kicker: "ALL ROADS LEAD HERE",
    story: "Scout arrives by train and discovers that cobblestones make for a wonderfully bumpy ride.",
    lat: 41.9028,
    lng: 12.4964,
  },
  {
    date: "2023-02-18",
    place: "Athens",
    region: "Attica",
    country: "Greece",
    countryCode: "GR",
    cache: "GC7N8R2 · Pnyx Hill",
    kicker: "AN ANCIENT MILESTONE",
    story: "The little traveler watches the sun set behind hills that have collected stories for millennia.",
    lat: 37.9838,
    lng: 23.7275,
  },
  {
    date: "2023-06-26",
    place: "Nairobi",
    region: "Nairobi County",
    country: "Kenya",
    countryCode: "KE",
    cache: "GC8K4N7 · City in the Sun",
    kicker: "SOUTH OF THE EQUATOR",
    story: "Scout crosses the equator and earns a new favorite view beneath the acacia trees.",
    lat: -1.2921,
    lng: 36.8219,
  },
  {
    date: "2023-11-09",
    place: "Cape Town",
    region: "Western Cape",
    country: "South Africa",
    countryCode: "ZA",
    cache: "GC9M3Q4 · Table View",
    kicker: "THE SOUTHERN TURN",
    story: "A long coastal drive ends under Table Mountain with the Atlantic stretching westward.",
    lat: -33.9249,
    lng: 18.4241,
  },
  {
    date: "2024-03-22",
    place: "Rio de Janeiro",
    region: "Rio de Janeiro",
    country: "Brazil",
    countryCode: "BR",
    cache: "GC8T6J1 · Mirante Carioca",
    kicker: "ACROSS THE ATLANTIC",
    story: "Scout crosses an ocean, catches the samba beat, and adds another hemisphere to the logbook.",
    lat: -22.9068,
    lng: -43.1729,
  },
  {
    date: "2024-08-14",
    place: "Lima",
    region: "Lima Province",
    country: "Peru",
    countryCode: "PE",
    cache: "GC9P5W8 · Malecón",
    kicker: "PACIFIC AGAIN",
    story: "The route reaches the Pacific once more, this time from a cliff high above the water.",
    lat: -12.0464,
    lng: -77.0428,
  },
  {
    date: "2025-02-06",
    place: "Mexico City",
    region: "CDMX",
    country: "Mexico",
    countryCode: "MX",
    cache: "GC7V2C6 · Chapultepec",
    kicker: "THE HOME STRETCH",
    story: "One last enormous city, one very green park, and a northbound ride with a familiar cacher.",
    lat: 19.4326,
    lng: -99.1332,
  },
  {
    date: "2026-08-27",
    place: "Seattle",
    region: "Washington",
    country: "United States",
    countryCode: "US",
    cache: "GCBVT1R · Homecoming",
    kicker: "FULL CIRCLE",
    story: "After four years, five continents, and a truly unreasonable number of miles, Scout comes home.",
    lat: 47.6205,
    lng: -122.3493,
  },
];

const sampleData = {
  meta: {
    source: "sample",
    title: "Scout’s grand bugabout",
    description: "From a rainy Seattle sidewalk to the other side of the world—and back again.",
    publicCode: null,
    fileName: null,
    totalMiles: null,
    hasDates: true,
    hasStories: true,
    antimeridianCrossings: 0,
  },
  stops: sampleStops,
};

const state = {
  progress: 0,
  playing: false,
  speed: 1,
  frame: null,
  lastTime: null,
  currentIndex: -1,
  activeBand: -1,
  logSignature: "",
};

const els = {
  aboutButton: document.querySelector("#aboutButton"),
  aboutDialog: document.querySelector("#aboutDialog"),
  closeAboutButton: document.querySelector("#closeAboutButton"),
  closePlacesButton: document.querySelector("#closePlacesButton"),
  placesDialog: document.querySelector("#placesDialog"),
  placesEyebrow: document.querySelector("#placesEyebrow"),
  placesList: document.querySelector("#placesList"),
  placesTitle: document.querySelector("#placesTitle"),
  countryStat: document.querySelector("#countryStat"),
  countryStatCard: document.querySelector("#countryStatCard"),
  countryStatLabel: document.querySelector("#countryStatLabel"),
  descriptionToggle: document.querySelector("#descriptionToggle"),
  descriptionWrap: document.querySelector("#descriptionWrap"),
  distanceStat: document.querySelector("#distanceStat"),
  dropOverlay: document.querySelector("#dropOverlay"),
  fitButton: document.querySelector("#fitButton"),
  mapToggle: document.querySelector(".map-toggle"),
  zoomInButton: document.querySelector("#zoomInButton"),
  zoomOutButton: document.querySelector("#zoomOutButton"),
  followButton: document.querySelector("#followButton"),
  journeyDescription: document.querySelector("#journeyDescription"),
  journeySidebar: document.querySelector(".journey-sidebar"),
  journeyStats: document.querySelector("#journeyStats"),
  journeyTitle: document.querySelector("#journeyTitle"),
  journeyTitleText: document.querySelector("#journeyTitleText"),
  kmlInput: document.querySelector("#kmlInput"),
  logByPlace: document.querySelector("#logByPlace"),
  logByTime: document.querySelector("#logByTime"),
  mapFallback: document.querySelector("#mapFallback"),
  mapStage: document.querySelector(".map-stage"),
  openKmlButton: document.querySelector("#openKmlButton"),
  playButton: document.querySelector("#playButton"),
  playerDate: document.querySelector("#playerDate"),
  playerPlace: document.querySelector("#playerPlace"),
  shareButton: document.querySelector("#shareButton"),
  soundButton: document.querySelector("#soundButton"),
  soundMenu: document.querySelector("#soundMenu"),
  speedButton: document.querySelector("#speedButton"),
  statusPill: document.querySelector("#statusPill"),
  stateReadout: document.querySelector("#stateReadout"),
  stateStat: document.querySelector("#stateStat"),
  stateStatLabel: document.querySelector("#stateStatLabel"),
  stopCount: document.querySelector("#stopCount"),
  stopList: document.querySelector("#stopList"),
  timeline: document.querySelector("#timeline"),
  timelineLabels: document.querySelector("#timelineLabels"),
  toast: document.querySelector("#toast"),
};

const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

const shortDateFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

const compactDateFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

const toDate = (value) => new Date(`${value}T12:00:00Z`);
const clamp = (value, minimum, maximum) => Math.max(minimum, Math.min(maximum, value));
const normalizeLongitude = (value) => ((((value + 180) % 360) + 360) % 360) - 180;
const worldOffsets = [-360, 0, 360];

// The route is coloured by chronology: oldest stops plum, newest coral. These are
// hand-picked stops rather than a single purple-to-orange interpolation, which
// passes through a muddy grey-brown at its midpoint. Coral is the palette's
// existing movement accent, so the newest segment matches the bug.
const ROUTE_RAMP = [
  "#3a2a9e",
  "#1f6fd0",
  "#12a5b0",
  "#4fbf6a",
  "#e8c53a",
  "#f2762e",
  "#d92d5e",
];
// Above any stop marker's 100 + index, with room for the pixel-Y term Leaflet
// adds on top, so the bug is never buried by the caches it is visiting.
const BUG_Z_INDEX = 1000000;

const TILE_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const ROUTE_BANDS = 24;

function hexToRgb(hex) {
  const value = Number.parseInt(hex.slice(1), 16);
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
}

function rampColor(amount) {
  const scaled = clamp(amount, 0, 1) * (ROUTE_RAMP.length - 1);
  const lower = Math.min(Math.floor(scaled), ROUTE_RAMP.length - 2);
  const blend = scaled - lower;
  const from = hexToRgb(ROUTE_RAMP[lower]);
  const to = hexToRgb(ROUTE_RAMP[lower + 1]);
  const channel = (index) => Math.round(from[index] + (to[index] - from[index]) * blend);
  return `rgb(${channel(0)}, ${channel(1)}, ${channel(2)})`;
}

// One source of truth for the ramp: the map bands read it from JS, the timeline
// track and legend swatch read the same stops back out of this custom property.
function publishRouteRamp() {
  const stops = ROUTE_RAMP.map(
    (color, index) => `${color} ${Math.round((index / (ROUTE_RAMP.length - 1)) * 100)}%`,
  ).join(", ");
  document.documentElement.style.setProperty(
    "--route-ramp",
    `linear-gradient(to right, ${stops})`,
  );
}

let journey = [];
let journeyMeta = sampleData.meta;
let maxProgress = 0;
let cumulativeMiles = [];
let distanceScale = 1;
let map;
let routeLine;
let routeBands = [];
let bugMarkers = [];
let stopMarkers = new Map();
let sampledIndexes = [];

function cacheCodeFromStop(stop) {
  return stop.code ?? stop.cache?.match(/\bGC[A-Z0-9]+\b/i)?.[0] ?? null;
}

function normalizeStop(stop, index) {
  const code = cacheCodeFromStop(stop) ?? `Stop ${index + 1}`;
  return {
    id: stop.id ?? `${code}-${index + 1}`,
    code,
    cache: stop.cache ?? code,
    cacheUrl: stop.cacheUrl ?? (/^GC[A-Z0-9]+$/i.test(code) ? `https://coord.info/${code}` : null),
    place: stop.place || code,
    region: stop.region ?? "",
    country: stop.country ?? "",
    countryCode: stop.countryCode ?? "",
    continent: stop.continent ?? "",
    countrySource: stop.countrySource ?? (stop.country ? "source" : null),
    date: stop.date ?? null,
    kicker: stop.kicker ?? "",
    story: stop.story ?? "",
    lat: Number(stop.lat),
    lng: normalizeLongitude(Number(stop.lng)),
    altitude: stop.altitude ?? null,
  };
}

function haversineMiles(a, b) {
  const radius = 3958.8;
  const radians = (degrees) => (degrees * Math.PI) / 180;
  const dLat = radians(b.lat - a.lat);
  let longitudeDelta = b.lng - a.lng;
  if (longitudeDelta > 180) longitudeDelta -= 360;
  if (longitudeDelta < -180) longitudeDelta += 360;
  const dLng = radians(longitudeDelta);
  const lat1 = radians(a.lat);
  const lat2 = radians(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * radius * Math.asin(Math.sqrt(h));
}

function calculateJourneyMetrics() {
  cumulativeMiles = [0];
  for (let index = 1; index < journey.length; index += 1) {
    cumulativeMiles[index] = cumulativeMiles[index - 1] + haversineMiles(journey[index - 1], journey[index]);
  }
  const calculatedTotal = cumulativeMiles.at(-1) ?? 0;
  distanceScale =
    journeyMeta.totalMiles && calculatedTotal > 0 ? journeyMeta.totalMiles / calculatedTotal : 1;
}

function formatMiles(value) {
  if (value < 10) return value.toFixed(1);
  return Math.round(value).toLocaleString("en-US");
}

function flagEmoji(code) {
  if (!/^[A-Z]{2}$/.test(code ?? "")) return "";
  return String.fromCodePoint(...[...code].map((letter) => 0x1f1e6 + letter.charCodeAt(0) - 65));
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);
}

const LOG_WINDOW = 64;

// The window normally follows the bug. These let a paused reader pull more of the
// journey into view without losing that behaviour once playback resumes.
let logExpandBefore = 0;
let logExpandAfter = 0;

let logMode = "time";
let placeTree = [];
let expandedCountry = null;
let expandedState = null;

const UNKNOWN_PLACE = "Location unavailable";
const countryNameOf = (stop) => stop.country || UNKNOWN_PLACE;

// Countries in the order the bug first reached them, and US countries carrying
// their states in the same first-visit order. A Map preserves insertion order,
// so walking the journey once gives both levels their ordering for free.
function buildPlaceTree() {
  const countries = new Map();
  journey.forEach((stop, index) => {
    const name = countryNameOf(stop);
    if (!countries.has(name)) {
      countries.set(name, { name, flag: flagEmoji(stop.countryCode), indexes: [], states: new Map() });
    }
    const country = countries.get(name);
    country.indexes.push(index);

    if (stop.country === "United States" && stop.region) {
      if (!country.states.has(stop.region)) country.states.set(stop.region, { name: stop.region, indexes: [] });
      country.states.get(stop.region).indexes.push(index);
    }
  });

  placeTree = [...countries.values()].map((country) => ({
    ...country,
    states: [...country.states.values()],
  }));
}

// A window into one list of journey indexes. Washington alone holds over 1,500
// stops, so an expanded group needs the same bounded rendering as the flat list.
function indexWindow(indexes, centerIndex) {
  const size = LOG_WINDOW + logExpandBefore + logExpandAfter;
  if (indexes.length <= Math.max(120, size)) return { start: 0, end: indexes.length };
  const position = Math.max(0, indexes.indexOf(centerIndex));
  const start = clamp(position - logExpandBefore, 0, indexes.length - size);
  return { start, end: start + size };
}

function stopRowHtml(index, depth = 0, active = false) {
  const stop = journey[index];
  const secondary = [stop.region, stop.country].filter(Boolean).join(", ") || "Mapped cache";
  const date = stop.date ? compactDateFormat.format(toDate(stop.date)) : `Stop ${index + 1}`;
  const story =
    stop.kicker || stop.story
      ? `<span class="stop-story">${stop.kicker ? `<span class="stop-kicker">${escapeHtml(stop.kicker)}</span>` : ""}${
          stop.story ? `<span class="stop-text">${escapeHtml(stop.story)}</span>` : ""
        }</span>`
      : "";
  const link = stop.cacheUrl
    ? `<a class="stop-cache-link" href="${escapeHtml(stop.cacheUrl)}" target="_blank" rel="noreferrer" aria-label="View ${escapeHtml(stop.code)} on Geocaching" title="View ${escapeHtml(stop.code)} on Geocaching"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 16 16 8M9.5 8H16v6.5" /></svg></a>`
    : "";
  return `
    <li class="stop-item${depth ? ` depth-${depth}` : ""}${active ? " active" : ""}" data-stop="${index}">
      <button class="stop-button" type="button" aria-label="Jump to ${escapeHtml(stop.place)}">
        <span class="stop-marker" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.6A2.6 2.6 0 1 1 12 6.4a2.6 2.6 0 0 1 0 5.2Z" /></svg></span>
        <span class="stop-name">
          <strong>${escapeHtml(stop.place)}</strong>
          <small>${escapeHtml(secondary)}</small>
          ${story}
        </span>
        <span class="stop-date">${escapeHtml(date)}</span>
      </button>
      ${link}
    </li>
  `;
}

function stopRowsHtml(indexes, centerIndex, depth = 0) {
  const bounds = indexWindow(indexes, centerIndex);
  const gapClass = depth ? ` depth-${depth}` : "";
  const rows = indexes.slice(bounds.start, bounds.end).map((index) => stopRowHtml(index, depth));
  if (bounds.start > 0) {
    rows.unshift(
      `<li class="stop-gap${gapClass}"><button type="button" data-gap="before">↑ ${Math.min(LOG_WINDOW, bounds.start)} of ${bounds.start.toLocaleString("en-US")} earlier stops</button></li>`,
    );
  }
  if (bounds.end < indexes.length) {
    const later = indexes.length - bounds.end;
    rows.push(
      `<li class="stop-gap${gapClass}"><button type="button" data-gap="after">↓ ${Math.min(LOG_WINDOW, later)} of ${later.toLocaleString("en-US")} later stops</button></li>`,
    );
  }
  return rows.join("");
}

function placeRowHtml({ name, flag, count, detail, open, attribute, isState }) {
  return `
    <li class="place-item${isState ? " state-item" : ""}${open ? " open" : ""}" ${attribute}="${escapeHtml(name)}">
      <button class="place-button" type="button" aria-expanded="${open}">
        <span class="place-chevron" aria-hidden="true">›</span>
        <span class="place-name">
          <strong>${flag ? `<span class="place-flag" aria-hidden="true">${flag}</span>` : ""}${escapeHtml(name)}${
            detail ? ` <span class="place-detail">(${escapeHtml(detail)})</span>` : ""
          }</strong>
        </span>
        <span class="place-count">${count.toLocaleString("en-US")}</span>
      </button>
    </li>
  `;
}

function placeListHtml(centerIndex) {
  const rows = [];
  for (const country of placeTree) {
    const open = country.name === expandedCountry;
    rows.push(
      placeRowHtml({
        name: country.name,
        flag: country.flag,
        count: country.indexes.length,
        detail: country.states.length
          ? `${country.states.length} ${country.states.length === 1 ? "state" : "states"}`
          : "",
        open,
        attribute: "data-country",
        isState: false,
      }),
    );
    if (!open) continue;

    if (!country.states.length) {
      rows.push(stopRowsHtml(country.indexes, centerIndex, 1));
      continue;
    }
    for (const region of country.states) {
      const openState = region.name === expandedState;
      rows.push(
        placeRowHtml({
          name: region.name,
          count: region.indexes.length,
          detail: "",
          open: openState,
          attribute: "data-state",
          isState: true,
        }),
      );
      if (openState) rows.push(stopRowsHtml(region.indexes, centerIndex, 2));
    }
  }
  return rows.join("");
}

// Indexes of whichever leaf list is currently on screen, so the rebuild check
// knows when its window has drifted.
function expandedLeafIndexes() {
  const country = placeTree.find((entry) => entry.name === expandedCountry);
  if (!country) return null;
  if (!country.states.length) return country.indexes;
  return country.states.find((region) => region.name === expandedState)?.indexes ?? null;
}

// Structure only. Active-row highlighting is a class toggle handled separately,
// so playback does not rebuild the list on every stop.
function logSignature(centerIndex) {
  if (logMode === "time") {
    const bounds = indexWindow(journey.map((_, index) => index), centerIndex);
    return `t|${bounds.start}|${bounds.end}`;
  }
  const leaf = expandedLeafIndexes();
  const bounds = leaf ? indexWindow(leaf, centerIndex) : null;
  return `p|${expandedCountry}|${expandedState}|${bounds ? `${bounds.start}-${bounds.end}` : ""}`;
}

function renderStopCount() {
  if (logMode === "place") {
    els.stopCount.textContent = `${placeTree.length.toLocaleString("en-US")} ${placeTree.length === 1 ? "country" : "countries"}`;
    return;
  }
  els.stopCount.textContent = `${journey.length.toLocaleString("en-US")} stops`;
}

function buildStopList(centerIndex = 0, force = false) {
  const signature = logSignature(centerIndex);
  if (!force && signature === state.logSignature) return;
  state.logSignature = signature;

  els.stopList.classList.toggle("by-place", logMode === "place");
  els.stopList.innerHTML =
    logMode === "place"
      ? placeListHtml(centerIndex)
      : stopRowsHtml(
          journey.map((_, index) => index),
          centerIndex,
        );
}

// Inserting rows above the active card would otherwise shove it off screen, so
// the card's on-screen position is measured before and restored after. Rows that
// were not previously in the window fade in, which shows what actually arrived.
// Only ever called from a user action — playback rebuilds must stay silent.
function rebuildLogWithTransition(change, { anchor = true } = {}) {
  const rowsBefore = new Set(
    [...els.stopList.querySelectorAll(".stop-item")].map((row) => row.dataset.stop),
  );
  const anchorBefore = anchor
    ? els.stopList.querySelector(".stop-item.active")?.getBoundingClientRect().top ?? null
    : null;

  change();
  buildStopList(state.currentIndex, true);
  updateStops(state.currentIndex);

  for (const row of els.stopList.querySelectorAll(".stop-item")) {
    if (rowsBefore.has(row.dataset.stop)) continue;
    row.classList.add("entering");
    row.addEventListener("animationend", () => row.classList.remove("entering"), { once: true });
  }

  if (anchorBefore === null) return;
  const anchorAfter = els.stopList.querySelector(".stop-item.active")?.getBoundingClientRect().top;
  if (anchorAfter === undefined) return;
  const drift = anchorAfter - anchorBefore;
  if (Math.abs(drift) < 1) return;

  // The sidebar scrolls on desktop; the page itself scrolls on mobile.
  const sidebar = els.journeySidebar;
  if (sidebar.scrollHeight > sidebar.clientHeight + 1) sidebar.scrollTop += drift;
  else window.scrollBy(0, drift);
}

function setLogMode(mode) {
  if (logMode === mode) return;
  logMode = mode;
  els.logByTime.classList.toggle("selected", mode === "time");
  els.logByPlace.classList.toggle("selected", mode === "place");
  els.logByTime.setAttribute("aria-pressed", String(mode === "time"));
  els.logByPlace.setAttribute("aria-pressed", String(mode === "place"));
  renderStopCount();
  // Everything changes, so cross-fade the list rather than each row.
  els.stopList.classList.remove("log-swap");
  void els.stopList.offsetWidth;
  els.stopList.classList.add("log-swap");
  buildStopList(state.currentIndex, true);
  updateStops(state.currentIndex);
}

function initializeMap() {
  if (!window.L) {
    els.mapFallback.hidden = false;
    return;
  }

  map = L.map("map", {
    center: [30, -10],
    zoom: 2,
    zoomControl: false,
    worldCopyJump: true,
    minZoom: 2,
    zoomSnap: 0,
  });

  map.on("moveend", refreshStopMarkers);
  map.on("dragstart", disengageFollow);
  map.getContainer().addEventListener("wheel", disengageFollow, { passive: true });
  map.getContainer().addEventListener("dblclick", disengageFollow);

  // A coarse layer that never changes zoom level sits underneath the detailed
  // one. Changing zoom drops the old tiles before the new ones arrive, and with
  // nothing behind them the bare container showed through as a grey flash. These
  // few low-zoom tiles are cached after first load and always cover the viewport,
  // so the gap shows a blurry map instead of flat colour.
  L.tileLayer(TILE_URL, {
    className: "map-underlay",
    maxNativeZoom: 4,
    maxZoom: 18,
    keepBuffer: 6,
    updateWhenZooming: false,
  }).addTo(map);

  L.tileLayer(TILE_URL, {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 18,
    // Hold more tiles around the viewport, and skip requests mid-zoom that would
    // be thrown away before they arrive.
    keepBuffer: 4,
    updateWhenZooming: false,
  }).addTo(map);
}

function splitAtAntimeridian(points) {
  if (!points.length) return [];
  const parts = [[points[0]]];
  for (let index = 1; index < points.length; index += 1) {
    const previous = points[index - 1];
    const current = points[index];
    const longitudeDelta = current[1] - previous[1];
    if (Math.abs(longitudeDelta) > 180) {
      const crossesEastward = longitudeDelta < -180;
      const adjustedLongitude = current[1] + (crossesEastward ? 360 : -360);
      const departureLongitude = crossesEastward ? 180 : -180;
      const arrivalLongitude = -departureLongitude;
      const crossingAmount =
        (departureLongitude - previous[1]) / (adjustedLongitude - previous[1]);
      const crossingLatitude =
        previous[0] + (current[0] - previous[0]) * crossingAmount;

      parts.at(-1).push([crossingLatitude, departureLongitude]);
      parts.push([[crossingLatitude, arrivalLongitude]]);
    }
    parts.at(-1).push(current);
  }
  return parts.filter((part) => part.length);
}

function repeatAcrossWorlds(parts) {
  return worldOffsets.flatMap((longitudeOffset) =>
    parts.map((part) =>
      part.map(([latitude, longitude]) => [latitude, longitude + longitudeOffset]),
    ),
  );
}

function wrappedRouteLatLngs(points) {
  return repeatAcrossWorlds(splitAtAntimeridian(points));
}

function routeLatLngs(stops) {
  return wrappedRouteLatLngs(stops.map((stop) => [stop.lat, stop.lng]));
}

// Sampling the whole journey meant only every 21st stop on the large fixture had
// a dot, so the route bent through caches nothing could be clicked on. Markers
// are drawn for what is actually on screen instead, so zooming in reveals every
// stop in view and the budget still bounds the work.
const MARKER_BUDGET = 260;

function visibleStopPositions() {
  const bounds = map.getBounds().pad(0.2);
  const south = bounds.getSouth();
  const north = bounds.getNorth();
  const west = bounds.getWest();
  const east = bounds.getEast();
  const centreLng = (west + east) / 2;

  const found = [];
  for (let index = 0; index < journey.length; index += 1) {
    const stop = journey[index];
    if (stop.lat < south || stop.lat > north) continue;
    // Unwrapped against the view, so markers land in whichever world copy is on
    // screen without needing three copies of every one.
    const lng = unwrapLongitude(stop.lng, centreLng);
    if (lng < west || lng > east) continue;
    found.push({ index, lng });
  }
  if (found.length <= MARKER_BUDGET) return found;

  const step = found.length / MARKER_BUDGET;
  const sampled = [];
  for (let i = 0; i < MARKER_BUDGET; i += 1) sampled.push(found[Math.floor(i * step)]);
  return sampled;
}

function refreshStopMarkers() {
  if (!map || !journey.length) return;
  stopMarkers.forEach((marker) => map.removeLayer(marker));
  stopMarkers = new Map();
  trailedMarkers = new Map();

  const chosen = visibleStopPositions();
  sampledIndexes = chosen.map((entry) => entry.index);

  for (const { index, lng } of chosen) {
    const stop = journey[index];
    const date = stop.date ? shortDateFormat.format(toDate(stop.date)) : `Stop ${index + 1}`;
    const marker = L.marker([stop.lat, lng], {
      icon: L.divIcon({
        className: "",
        html: '<span class="map-stop-icon"></span>',
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      }),
      title: stop.place,
      zIndexOffset: 100 + index,
    }).addTo(map);
    marker.bindTooltip(`${escapeHtml(stop.place)} · ${escapeHtml(date)}`, {
      className: "bug-tooltip",
      direction: "top",
      offset: [0, -8],
    });
    marker.on("click", () => {
      pause();
      engageFollow();
      setProgress(index * 100, { force: true, scroll: true });
    });
    stopMarkers.set(index, marker);
  }
  paintStopMarkers(state.currentIndex);
}

function clearMapJourney() {
  if (!map) return;
  [routeLine, ...routeBands.map((band) => band.line), ...bugMarkers].forEach((layer) => {
    if (layer) map.removeLayer(layer);
  });
  stopMarkers.forEach((marker) => map.removeLayer(marker));
  routeLine = null;
  routeBands = [];
  bugMarkers = [];
  stopMarkers = new Map();
  sampledIndexes = [];
}

function buildMapJourney() {
  if (!map || !journey.length) return;
  clearMapJourney();

  routeLine = L.polyline(routeLatLngs(journey), {
    className: "route-preview",
    color: "#6b6f78",
    weight: 3,
    opacity: 1,
    dashArray: "2 9",
    lineCap: "round",
    interactive: false,
  }).addTo(map);

  buildRouteBands();

  bugMarkers = worldOffsets.map((longitudeOffset) =>
    L.marker([journey[0].lat, journey[0].lng + longitudeOffset], {
      icon: L.divIcon({
        className: "bug-marker-wrap",
        html: '<span class="bug-marker" aria-hidden="true">🐞</span>',
        iconSize: [46, 46],
        iconAnchor: [23, 23],
      }),
      zIndexOffset: BUG_Z_INDEX,
      keyboard: false,
    }).addTo(map),
  );

  window.setTimeout(() => {
    map.invalidateSize();
    fitRoute(false);
    updateCameraControls();
    refreshStopMarkers();
  }, 0);
}

// Each band owns a contiguous run of stops and keeps one polyline. Adjacent bands
// share their boundary stop so the colour changes without leaving a gap. One
// polyline still covers all three world copies, because wrappedRouteLatLngs
// returns a multi-part path.
function buildRouteBands() {
  const segments = journey.length - 1;
  const bandCount = Math.max(1, Math.min(ROUTE_BANDS, segments));
  routeBands = [];

  for (let band = 0; band < bandCount; band += 1) {
    const line = L.polyline([], {
      color: rampColor(bandCount === 1 ? 1 : (band + 0.5) / bandCount),
      weight: 4,
      opacity: 1,
      lineCap: "round",
    }).addTo(map);
    routeBands.push({
      line,
      start: Math.round((band * segments) / bandCount),
      end: Math.round(((band + 1) * segments) / bandCount),
    });
  }
}

function bandIndexFor(stopIndex) {
  for (let index = routeBands.length - 1; index >= 0; index -= 1) {
    if (stopIndex >= routeBands[index].start) return index;
  }
  return 0;
}

function bandLatLngs(band, throughIndex, trailingPosition) {
  const last = Math.min(throughIndex, band.end);
  const points = [];
  for (let index = band.start; index <= last; index += 1) {
    points.push([journey[index].lat, journey[index].lng]);
  }
  if (trailingPosition) points.push(trailingPosition);
  return wrappedRouteLatLngs(points);
}

// Two thirds of the large fixture's legs are under 5 km while its longest is
// nearly 10,000 km, so a fixed world view hides most of the journey. The camera
// frames a short window of stops around the bug and eases toward it, which zooms
// in while the bug pothers around one town and pulls out for an ocean crossing.
// Wide, because this journey will not hold still: playback advances about 41
// stops a second and the bug hops Seattle to California and back inside one run,
// so framing a handful of stops meant chasing every cache. A window this size
// keeps the bug inside one frame for seconds at a time instead.
const CAMERA_LOOKBEHIND = 8;
const CAMERA_LOOKAHEAD = 45;
// The frame is held until the bug leaves it. The inset re-frames a little before
// the true edge so the bug is never on the boundary.
const CAMERA_FRAME_INSET = 0.06;
const CAMERA_BOTTOM_INSET = 0.24;
// A little slack so the bug is not re-framed the instant it touches the edge.
// Kept small: at 0.35 the frames grew past what the minimum zoom can display, the
// frame stopped fitting the viewport, and the bug spent half the journey off it.
const CAMERA_FRAME_PADDING = 0.08;
// Whole zoom levels only. Fractional zoom let one frame land on 8.2 and the next
// on 8.4, which reads as a glitch rather than a move, and it also keeps tiles on
// their native level instead of upscaling them.
const CAMERA_ZOOM_STEP = 1;
// Above this, fitting the whole journey is already a close view and following
// cannot show anything the fit does not, so the camera control is hidden.
const CAMERA_CONTROL_MIN_ZOOM = 12;
// Holding only until the bug leaves the screen means a view that zoomed out for
// an ocean crossing never comes back in, because everything stays visible. This
// is how many whole levels tighter the journey must warrant before the camera
// closes in again — large enough that it ignores small differences.
const CAMERA_ZOOM_REGAIN = 2;
// "glide" eases between frames; "cut" jumps straight to them. Cutting removes
// continuous motion entirely, which is the fallback if gliding still reads busy.
const CAMERA_STYLE = "cut";
const CAMERA_MAX_ZOOM = 14;
// Easing is expressed in time, not frames, so the camera glides at the same rate
// whatever the frame rate. Roughly the time to close two thirds of a gap.
const CAMERA_TIME_CONSTANT = 420;
// A setView costs an order of magnitude more than the rest of a frame, and the
// map moving at 30/sec under a marker that moves every frame is imperceptible.
const CAMERA_MIN_INTERVAL = 33;
// Edge margins in pixels. The bottom is deeper because the player card covers it.
const CAMERA_PAD_X = 70;
const CAMERA_PAD_TOP = 60;
const CAMERA_PAD_BOTTOM = 170;
// setView resets the whole viewport, so it costs an order of magnitude more than
// the rest of a frame. Once the easing has converged, the move is invisible and
// worth skipping entirely.
const CAMERA_MIN_PIXEL_STEP = 0.5;
const CAMERA_MIN_ZOOM_STEP = 0.002;

let soundEnabled = false;

// "Off" plus one entry per synthesised voice, so the pieces can be compared
// without leaving the map.
function renderSoundMenu() {
  const bee = window.BugaboutBumblebee;
  if (!bee?.supported()) return;
  const entries = [{ id: "off", label: "Off" }, ...bee.voices()];
  els.soundMenu.innerHTML = entries
    .map((entry) => {
      const chosen = entry.id === "off" ? !soundEnabled : soundEnabled && bee.voice() === entry.id;
      return `<button type="button" role="menuitemradio" data-voice="${entry.id}" aria-checked="${chosen}">${escapeHtml(entry.label)}</button>`;
    })
    .join("");
}

function setSoundMenuOpen(open) {
  els.soundMenu.hidden = !open;
  els.soundButton.setAttribute("aria-expanded", String(open));
  if (open) renderSoundMenu();
}

function syncSound() {
  const bee = window.BugaboutBumblebee;
  if (!bee?.supported()) return;
  bee.setRate(state.speed);
  if (soundEnabled && state.playing) bee.start();
  else bee.stop();
}

let followEnabled = true;
let followActive = false;
let camera = null;
let appliedCamera = null;
let cameraTime = 0;
let cameraSnap = false;
let cameraView = null;

function disengageFollow() {
  followActive = false;
}

function unwrapLongitude(longitude, reference) {
  let delta = longitude - reference;
  while (delta > 180) delta -= 360;
  while (delta < -180) delta += 360;
  return reference + delta;
}

function windowFrame(index, position) {
  const first = Math.max(0, index - CAMERA_LOOKBEHIND);
  const last = Math.min(journey.length - 1, index + CAMERA_LOOKAHEAD);

  // Longitudes are unwrapped against the bug so a route crossing the
  // antimeridian frames the crossing instead of the whole globe.
  let minLat = position[0];
  let maxLat = position[0];
  let minLng = position[1];
  let maxLng = position[1];
  for (let i = first; i <= last; i += 1) {
    const lat = journey[i].lat;
    const lng = unwrapLongitude(journey[i].lng, position[1]);
    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;
    if (lng < minLng) minLng = lng;
    if (lng > maxLng) maxLng = lng;
  }
  const padLat = Math.max((maxLat - minLat) * CAMERA_FRAME_PADDING, 0.01);
  const padLng = Math.max((maxLng - minLng) * CAMERA_FRAME_PADDING, 0.01);
  return {
    minLat: minLat - padLat,
    maxLat: maxLat + padLat,
    minLng: minLng - padLng,
    maxLng: maxLng + padLng,
  };
}

function viewHolds(position) {
  const bounds = map.getBounds();
  const south = bounds.getSouth();
  const north = bounds.getNorth();
  const west = bounds.getWest();
  const east = bounds.getEast();
  const latSpan = north - south;
  const lngSpan = east - west;
  const lng = unwrapLongitude(position[1], (west + east) / 2);

  // The player card covers the bottom of the map, so the bug needs to leave
  // sooner down there than it does at the top.
  return (
    position[0] >= south + latSpan * CAMERA_BOTTOM_INSET &&
    position[0] <= north - latSpan * CAMERA_FRAME_INSET &&
    lng >= west + lngSpan * CAMERA_FRAME_INSET &&
    lng <= east - lngSpan * CAMERA_FRAME_INSET
  );
}

function routeFitZoom() {
  if (!map || !journey.length) return 0;
  const bounds = L.latLngBounds(journey.map((stop) => [stop.lat, stop.lng]));
  return map.getBoundsZoom(
    bounds,
    false,
    L.point(CAMERA_PAD_X * 2, CAMERA_PAD_TOP + CAMERA_PAD_BOTTOM),
  );
}

function viewForFrame({ minLat, maxLat, minLng, maxLng }) {
  const bounds = L.latLngBounds([minLat, minLng], [maxLat, maxLng]);

  // Never reserve so much margin that nothing is left to draw in; a short map
  // pane would otherwise push getBoundsZoom to nonsense.
  const size = map.getSize();
  const scale = Math.min(
    1,
    (size.x * 0.6) / (CAMERA_PAD_X * 2),
    (size.y * 0.6) / (CAMERA_PAD_TOP + CAMERA_PAD_BOTTOM),
  );
  const padX = CAMERA_PAD_X * scale;
  const padTop = CAMERA_PAD_TOP * scale;
  const padBottom = CAMERA_PAD_BOTTOM * scale;

  // getBoundsZoom takes the *total* padding, so the centre shift has to be
  // exactly half the top/bottom difference or the framing slides out of view.
  // Floored, never rounded: rounding up would zoom past what the frame fits.
  const fitted = map.getBoundsZoom(bounds, false, L.point(padX * 2, padTop + padBottom));
  const floor = Math.max(map.getMinZoom(), Math.floor(routeFitZoom()));
  const zoom = clamp(
    Math.floor(fitted / CAMERA_ZOOM_STEP) * CAMERA_ZOOM_STEP,
    floor,
    CAMERA_MAX_ZOOM,
  );
  const centre = map.project(bounds.getCenter(), zoom);
  centre.y += (padBottom - padTop) / 2;
  const shifted = map.unproject(centre, zoom);
  return { lat: shifted.lat, lng: shifted.lng, zoom };
}

function updateCamera(index, position) {
  if (!map || !followEnabled || !followActive || !journey.length) return;

  const now = performance.now();
  const elapsed = now - cameraTime;
  if (camera && !cameraSnap && elapsed < CAMERA_MIN_INTERVAL) return;
  cameraTime = now;

  // The frame is recomputed only when the bug leaves it, so the camera sits
  // perfectly still for seconds at a time instead of tracking every stop.
  if (!cameraView) {
    cameraView = viewForFrame(windowFrame(index, position));
  } else {
    const wanted = viewForFrame(windowFrame(index, position));
    if (!viewHolds(position) || wanted.zoom - cameraView.zoom >= CAMERA_ZOOM_REGAIN) {
      cameraView = wanted;
    }
  }
  const target = cameraView;

  // The camera only advances when progress does, so a discrete jump — scrubbing,
  // picking a stop, opening a place — has to land immediately or it would be
  // stranded part-way through the glide. Playback eases frame by frame instead.
  if (!camera || cameraSnap || CAMERA_STYLE === "cut") {
    camera = { ...target };
    cameraSnap = false;
  } else {
    const ease = 1 - Math.exp(-elapsed / CAMERA_TIME_CONSTANT);
    const targetLng = unwrapLongitude(target.lng, camera.lng);
    camera.lat += (target.lat - camera.lat) * ease;
    camera.lng += (targetLng - camera.lng) * ease;
    camera.zoom += (target.zoom - camera.zoom) * ease;
  }

  const degreesPerPixelNow = 360 / (256 * 2 ** camera.zoom);
  if (
    Math.abs(camera.lat - target.lat) < CAMERA_MIN_PIXEL_STEP * degreesPerPixelNow &&
    Math.abs(camera.lng - target.lng) < CAMERA_MIN_PIXEL_STEP * degreesPerPixelNow &&
    Math.abs(camera.zoom - target.zoom) < CAMERA_MIN_ZOOM_STEP
  ) {
    camera = { ...target };
  }

  if (appliedCamera && Math.abs(camera.zoom - appliedCamera.zoom) < CAMERA_MIN_ZOOM_STEP) {
    // Degrees per pixel at this zoom, near enough for a visibility threshold.
    const degreesPerPixel = 360 / (256 * 2 ** camera.zoom);
    const step = CAMERA_MIN_PIXEL_STEP * degreesPerPixel;
    if (
      Math.abs(camera.lat - appliedCamera.lat) < step &&
      Math.abs(camera.lng - appliedCamera.lng) < step
    ) {
      return;
    }
  }

  appliedCamera = { ...camera };
  map.setView([camera.lat, normalizeLongitude(camera.lng)], camera.zoom, { animate: false });
}

function setFollowEnabled(enabled) {
  followEnabled = enabled;
  followActive = enabled && followActive;
  els.followButton.setAttribute("aria-pressed", String(enabled));
  els.fitButton.setAttribute("aria-pressed", String(!enabled));
}

function engageFollow({ snap = true } = {}) {
  if (!followEnabled) return;
  if (!followActive) {
    camera = null;
    appliedCamera = null;
    cameraView = null;
    cameraTime = 0;
  }
  if (snap) cameraSnap = true;
  followActive = true;
}

function updateCameraControls() {
  if (!map || !journey.length) return;
  const unnecessary = routeFitZoom() >= CAMERA_CONTROL_MIN_ZOOM;
  els.mapToggle.hidden = unnecessary;
  if (unnecessary) setFollowEnabled(false);
}

function fitRoute(animate = true) {
  if (!map || !journey.length) return;
  if (journey.length === 1) {
    map.setView([journey[0].lat, journey[0].lng], 12, { animate });
    return;
  }
  const bounds = L.latLngBounds(journey.map((stop) => [stop.lat, stop.lng]));
  map.fitBounds(bounds, {
    paddingTopLeft: [42, 85],
    paddingBottomRight: [42, 150],
    animate,
    duration: 0.7,
  });
}

function interpolatePosition(from, to, amount) {
  const eased = amount < 0.5 ? 2 * amount * amount : 1 - (-2 * amount + 2) ** 2 / 2;
  let longitudeDelta = to.lng - from.lng;
  if (longitudeDelta > 180) longitudeDelta -= 360;
  if (longitudeDelta < -180) longitudeDelta += 360;
  return [
    from.lat + (to.lat - from.lat) * eased,
    normalizeLongitude(from.lng + longitudeDelta * eased),
  ];
}

function distanceAtProgress(progress) {
  const segmentIndex = Math.min(Math.floor(progress / 100), journey.length - 1);
  if (segmentIndex >= journey.length - 1) return (cumulativeMiles.at(-1) ?? 0) * distanceScale;
  const segmentAmount = (progress % 100) / 100;
  const segmentDistance = cumulativeMiles[segmentIndex + 1] - cumulativeMiles[segmentIndex];
  return (cumulativeMiles[segmentIndex] + segmentDistance * segmentAmount) * distanceScale;
}

function updateStory(index) {
  const stop = journey[index];
  els.playerDate.textContent = stop.date
    ? dateFormat.format(toDate(stop.date))
    : `Stop ${index + 1} of ${journey.length.toLocaleString("en-US")}`;
  const where = [stop.region, stop.country].filter(Boolean).join(", ");
  const cacheLink = stop.cacheUrl
    ? `<a class="player-cache" href="${escapeHtml(stop.cacheUrl)}" target="_blank" rel="noreferrer">${escapeHtml(stop.code)}</a>`
    : escapeHtml(stop.code);
  els.playerPlace.innerHTML = where
    ? `${escapeHtml(where)} <span class="player-dot" aria-hidden="true">•</span> ${cacheLink}`
    : cacheLink;
}

// Long journeys only render about 120 of their stops, so an exact index match
// almost never lands on a marker. Highlight the closest one that exists.
function nearestSampledIndex(index) {
  if (!sampledIndexes.length) return -1;
  let low = 0;
  let high = sampledIndexes.length - 1;
  while (low < high) {
    const middle = (low + high) >> 1;
    if (sampledIndexes[middle] < index) low = middle + 1;
    else high = middle;
  }
  const candidate = sampledIndexes[low];
  const previous = sampledIndexes[low - 1];
  if (previous !== undefined && Math.abs(previous - index) <= Math.abs(candidate - index)) {
    return previous;
  }
  return candidate;
}

const MARKER_TRAIL = 45;

let trailedMarkers = new Map();

function setMarkerRecency(markerIndex, recency) {
  const icon = stopMarkers.get(markerIndex)?.getElement()?.querySelector(".map-stop-icon");
  if (!icon) return;
  if (recency > 0) icon.style.setProperty("--recency", recency.toFixed(3));
  else icon.style.removeProperty("--recency");
}

function paintStopMarkers(index) {
  const highlighted = nearestSampledIndex(index);
  stopMarkers.forEach((marker, markerIndex) => {
    const element = marker.getElement();
    element?.classList.toggle("stop-unvisited", markerIndex > index);
    element?.querySelector(".map-stop-icon")?.classList.toggle("current", markerIndex === highlighted);
  });

  // Only the markers inside the trail window are touched, so this stays cheap
  // even though it runs on every stop change.
  const next = new Map();
  for (const markerIndex of sampledIndexes) {
    const age = index - markerIndex;
    if (age < 0 || age > MARKER_TRAIL) continue;
    next.set(markerIndex, 1 - age / MARKER_TRAIL);
  }
  for (const markerIndex of trailedMarkers.keys()) {
    if (!next.has(markerIndex)) setMarkerRecency(markerIndex, 0);
  }
  for (const [markerIndex, recency] of next) setMarkerRecency(markerIndex, recency);
  trailedMarkers = next;
}

function updateStops(index) {
  buildStopList(index);
  els.stopList.querySelectorAll(".stop-item").forEach((item) => {
    const itemIndex = Number(item.dataset.stop);
    item.classList.toggle("active", itemIndex === index);
    item.classList.toggle("visited", itemIndex <= index);
  });

  if (logMode === "place") {
    const stop = journey[index];
    els.stopList.querySelectorAll(".place-item").forEach((item) => {
      const active =
        "country" in item.dataset
          ? item.dataset.country === countryNameOf(stop)
          : item.dataset.state === stop.region;
      item.classList.toggle("active", active);
    });
  }

  paintStopMarkers(index);
}

function updateStats(progress, index) {
  const visited = journey.slice(0, index + 1);
  const knownCountries = visited.map((stop) => stop.country).filter(Boolean);
  const hasCountryData = knownCountries.length === index + 1;
  const derived = hasCountryData && visited.some((stop) => stop.countrySource === "polygon" || stop.countrySource === "coast");
  els.distanceStat.textContent = formatMiles(distanceAtProgress(progress));
  const countryCount = new Set(knownCountries).size;
  els.countryStat.textContent = hasCountryData ? String(countryCount) : "—";
  els.countryStatLabel.textContent = hasCountryData
    ? countryCount === 1
      ? "country"
      : "countries"
    : "countries not in KML";
  if (journeyHasStates) {
    const states = new Set(
      visited.filter((stop) => stop.country === "United States" && stop.region).map((stop) => stop.region),
    );
    els.stateStat.textContent = String(states.size);
    els.stateStatLabel.textContent = states.size === 1 ? "state" : "states";
  }
  els.stateReadout.hidden = !journeyHasStates;
  els.countryStatCard.title = derived
    ? "Derived from stop coordinates using Natural Earth country boundaries, not included in the KML."
    : "";
}

function updateRoute(progress) {
  if (!map || !routeBands.length || !bugMarkers.length) return;
  const segmentIndex = Math.min(Math.floor(progress / 100), journey.length - 1);
  const travelling = segmentIndex < journey.length - 1;
  const segmentAmount = travelling ? (progress % 100) / 100 : 0;
  const position = travelling
    ? interpolatePosition(journey[segmentIndex], journey[segmentIndex + 1], segmentAmount)
    : [journey[segmentIndex].lat, journey[segmentIndex].lng];

  const activeBand = bandIndexFor(segmentIndex);
  if (activeBand !== state.activeBand) {
    // Only when a boundary is crossed, or the timeline is scrubbed backwards:
    // settle every other band so the per-frame work below touches just one.
    routeBands.forEach((band, index) => {
      if (index === activeBand) return;
      band.line.setLatLngs(index < activeBand ? bandLatLngs(band, band.end) : []);
    });
    state.activeBand = activeBand;
  }

  const band = routeBands[activeBand];
  band.line.setLatLngs(bandLatLngs(band, segmentIndex, travelling ? position : null));

  bugMarkers.forEach((marker, index) =>
    marker.setLatLng([position[0], position[1] + worldOffsets[index]]),
  );
  updateCamera(segmentIndex, position);
}

function setProgress(value, options = {}) {
  const progress = clamp(Number(value), 0, maxProgress);
  const index = Math.min(Math.floor(progress / 100), journey.length - 1);
  const indexChanged = index !== state.currentIndex;
  state.progress = progress;
  state.currentIndex = index;

  els.timeline.value = String(progress);
  els.timeline.style.setProperty(
    "--progress",
    `${maxProgress ? (progress / maxProgress) * 100 : 0}%`,
  );
  updateRoute(progress);
  updateStats(progress, index);

  if (indexChanged || options.force) {
    updateStory(index);
    updateStops(index);
    if (options.pan && map && !(followEnabled && followActive)) {
      map.panTo([journey[index].lat, journey[index].lng], { animate: true, duration: 0.7 });
    }
    if (options.scroll) {
      els.stopList
        .querySelector(`[data-stop="${index}"]`)
        ?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }
}

// Duration grew linearly with stops but capped at a minute, so every journey over
// about fifty stops ran for exactly the same time — the 2,472-stop fixture raced
// past at 41 stops a second, which is why nothing on the map could settle. Square
// root keeps short journeys brisk while giving long ones room to be watched.
function playbackDuration() {
  return clamp(12000 + 2800 * Math.sqrt(journey.length), 12000, 150000);
}

function tick(time) {
  if (!state.playing) return;
  if (state.lastTime === null) state.lastTime = time;
  const delta = time - state.lastTime;
  state.lastTime = time;
  const unitsPerMillisecond = (maxProgress / playbackDuration()) * state.speed;
  const nextProgress = state.progress + delta * unitsPerMillisecond;

  if (nextProgress >= maxProgress) {
    setProgress(maxProgress, { force: true, scroll: true });
    pause();
    showToast(`${journeyMeta.title} reached the latest mapped stop.`);
    return;
  }

  setProgress(nextProgress);
  state.frame = requestAnimationFrame(tick);
}

function play() {
  if (maxProgress <= 0) {
    showToast("This journey has only one mapped stop.");
    return;
  }
  if (state.progress >= maxProgress) setProgress(0, { force: true, pan: true, scroll: true });
  engageFollow({ snap: !followActive });
  logExpandBefore = 0;
  logExpandAfter = 0;
  state.playing = true;
  syncSound();
  state.lastTime = null;
  els.playButton.classList.add("playing");
  els.mapStage.classList.add("playing");
  els.playButton.setAttribute("aria-label", "Pause journey");
  state.frame = requestAnimationFrame(tick);
}

function pause() {
  state.playing = false;
  window.BugaboutBumblebee?.stop();
  state.lastTime = null;
  els.playButton.classList.remove("playing");
  els.mapStage.classList.remove("playing");
  els.playButton.setAttribute("aria-label", "Play journey");
  if (state.frame) cancelAnimationFrame(state.frame);
  state.frame = null;
}

function renderTimelineLabels() {
  if (journeyMeta.hasDates && journey.every((stop) => stop.date)) {
    const indexes = [0, 0.5, 1].map((ratio) =>
      Math.round((journey.length - 1) * ratio),
    );
    els.timelineLabels.innerHTML = indexes
      .map((index) => `<span>${toDate(journey[index].date).getUTCFullYear()}</span>`)
      .join("");
    return;
  }
  els.timelineLabels.innerHTML = ["Start", "Latest"]
    .map((label) => `<span>${label}</span>`)
    .join("");
}

let descriptionExpanded = false;

function applyDescriptionHeight(needsToggle) {
  const wrap = els.descriptionWrap;
  if (!needsToggle) {
    wrap.style.maxHeight = "none";
    return;
  }
  if (descriptionExpanded) {
    wrap.style.maxHeight = `${wrap.scrollHeight}px`;
    const release = (event) => {
      if (event.propertyName !== "max-height") return;
      wrap.removeEventListener("transitionend", release);
      if (descriptionExpanded) wrap.style.maxHeight = "none";
    };
    wrap.addEventListener("transitionend", release);
    return;
  }
  // Collapsing from "none" has nothing to interpolate from, so pin the current
  // height for a frame first.
  if (wrap.style.maxHeight === "none") {
    wrap.style.maxHeight = `${wrap.scrollHeight}px`;
    void wrap.offsetHeight;
  }
  wrap.style.maxHeight = "";
}

function renderDescription() {
  const full = (journeyMeta.description ?? "").replace(/\s+/g, " ").trim();
  els.journeyDescription.textContent = full;

  const wrap = els.descriptionWrap;
  wrap.classList.remove("expanded");
  wrap.style.maxHeight = "";
  const needsToggle = wrap.scrollHeight > wrap.clientHeight + 2;

  els.descriptionWrap.classList.toggle("expanded", descriptionExpanded || !needsToggle);
  applyDescriptionHeight(needsToggle);
  els.descriptionToggle.hidden = !needsToggle;
  els.descriptionToggle.textContent = descriptionExpanded ? "Read less" : "Read more";
  els.descriptionToggle.setAttribute("aria-expanded", String(descriptionExpanded));
}

// Where a link stops fitting depends on how spread out the route is, so this is
// the honest order of magnitude rather than a hard limit.
const SHARE_STOP_GUIDE = 450;

const EQUATOR_MILES = 24901;
const MOON_MILES = 238900;
const MARATHON_MILES = 26.2;
const MIN_LAP_NOTE_MILES = EQUATOR_MILES * 0.1;
const MIN_MOON_MILES = MOON_MILES * 0.01;
const MIN_MARATHON_MILES = MARATHON_MILES * 5;
// Rough coast-to-coast drive, Los Angeles to New York.
const COAST_TO_COAST_MILES = 2790;

function formatDegrees(value, positive, negative) {
  return `${Math.abs(value).toFixed(1)}° ${value >= 0 ? positive : negative}`;
}

function journeyExtremes() {
  let north = -90;
  let south = 90;
  let east = -180;
  let west = 180;
  let northAt = 0;
  let southAt = 0;
  let eastAt = 0;
  let westAt = 0;
  let longest = 0;
  let longestAt = 0;
  const hops = [];

  for (let i = 0; i < journey.length; i += 1) {
    const stop = journey[i];
    if (stop.lat > north) { north = stop.lat; northAt = i; }
    if (stop.lat < south) { south = stop.lat; southAt = i; }
    if (stop.lng > east) { east = stop.lng; eastAt = i; }
    if (stop.lng < west) { west = stop.lng; westAt = i; }
    if (i > 0) {
      const hop = haversineMiles(journey[i - 1], stop) * distanceScale;
      hops.push(hop);
      if (hop > longest) { longest = hop; longestAt = i; }
    }
  }
  hops.sort((a, b) => a - b);

  let dateLine = 0;
  for (let i = 1; i < journey.length; i += 1) {
    if (Math.abs(journey[i].lng - journey[i - 1].lng) > 180) dateLine += 1;
  }

  const hemispheres = [
    journey.some((stop) => stop.lat > 0) && "N",
    journey.some((stop) => stop.lat < 0) && "S",
    journey.some((stop) => stop.lng > 0) && "E",
    journey.some((stop) => stop.lng < 0) && "W",
  ].filter(Boolean);

  return {
    north,
    south,
    east,
    west,
    northAt,
    southAt,
    eastAt,
    westAt,
    longest,
    longestAt,
    median: hops.length ? hops[hops.length >> 1] : 0,
    dateLine,
    hemispheres,
  };
}

function journeyTotals() {
  const distinct = (values) => new Set(values.filter(Boolean)).size;
  const miles = journeyMeta.totalMiles ?? (cumulativeMiles.at(-1) ?? 0) * distanceScale;
  const laps = miles / EQUATOR_MILES;
  const uniqueCaches = new Set(journey.map((stop) => stop.code)).size;
  const revisits = journey.length - uniqueCaches;
  const states = distinct(
    journey.filter((stop) => stop.country === "United States").map((stop) => stop.region),
  );

  const far = journeyExtremes();
  const tiles = [
    {
      label: "Miles travelled",
      value: formatMiles(miles),
      note:
        miles < MIN_LAP_NOTE_MILES
          ? null
          : laps >= 1
            ? `${laps.toFixed(1)}× around the world`
            : `${Math.round(laps * 100)}% of the way round`,
    },
    { label: "Countries", value: distinct(journey.map((stop) => stop.country)), places: "countries" },
    { label: "Continents", value: distinct(journey.map((stop) => stop.continent)), places: "continents" },
    {
      label: "Caches",
      value: uniqueCaches.toLocaleString("en-US"),
      note: revisits ? `${revisits.toLocaleString("en-US")} return ${revisits === 1 ? "visit" : "visits"}` : null,
    },
    { label: "Longest hop", value: `${formatMiles(far.longest)} mi`, hop: far.longestAt },
    { label: "Typical hop", value: `${formatMiles(far.median)} mi`, note: "half its moves were shorter" },
    { label: "Furthest north", value: formatDegrees(far.north, "N", "S"), stop: far.northAt },
    { label: "Furthest south", value: formatDegrees(far.south, "N", "S"), stop: far.southAt },
    { label: "Furthest east", value: formatDegrees(far.east, "E", "W"), stop: far.eastAt },
    { label: "Furthest west", value: formatDegrees(far.west, "E", "W"), stop: far.westAt },
    { label: "Hemispheres", value: far.hemispheres.join(" · ") || "—" },
    {
      label: "Date line",
      value: far.dateLine,
      note: far.dateLine ? `crossed ${far.dateLine === 1 ? "once" : `${far.dateLine} times`}` : null,
    },
    {
      label: "Toward the Moon",
      value: `${(miles / MOON_MILES * 100).toFixed(0)}%`,
      note: "of a one-way trip",
      min: MIN_MOON_MILES,
    },
    {
      label: "In marathons",
      value: Math.round(miles / MARATHON_MILES).toLocaleString("en-US"),
      min: MIN_MARATHON_MILES,
    },
    {
      label: "Coast to coast",
      value: `${(miles / COAST_TO_COAST_MILES).toFixed(0)}×`,
      note: "LA to New York",
      min: COAST_TO_COAST_MILES,
    },
  ];
  if (states) tiles.splice(2, 0, { label: "US states", value: states, places: "states" });
  return tiles.filter((tile) => !tile.min || miles >= tile.min);
}

function stopReferenceHtml(index) {
  const stop = journey[index];
  if (!stop) return "";
  const where = [stop.region, stop.country].filter(Boolean).join(", ");
  const code = stop.cacheUrl
    ? `<a href="${escapeHtml(stop.cacheUrl)}" target="_blank" rel="noreferrer">${escapeHtml(stop.code)}</a>`
    : escapeHtml(stop.code);
  return `${code}${where ? ` · ${escapeHtml(where)}` : ""}`;
}

function statPlaceHtml(index) {
  const reference = stopReferenceHtml(index);
  return reference ? `<small>${reference}</small>` : "";
}

function statHopHtml(toIndex) {
  const from = stopReferenceHtml(toIndex - 1);
  const to = stopReferenceHtml(toIndex);
  if (!from || !to) return statPlaceHtml(toIndex);
  return `<small>${from}<span class="stat-arrow">→</span>${to}</small>`;
}

function renderJourneyStats() {
  els.journeyStats.innerHTML = journeyTotals()
    .filter((tile) => tile.value !== 0 && tile.value !== "0")
    .map((tile) => {
      const detail = tile.hop !== undefined
        ? statHopHtml(tile.hop)
        : tile.stop !== undefined
          ? statPlaceHtml(tile.stop)
          : tile.note
            ? `<small>${escapeHtml(tile.note)}</small>`
            : "";
      const interactive = tile.places
        ? ` data-places="${tile.places}" role="button" tabindex="0"`
        : "";
      return `
        <div${interactive}>
          <dt>${escapeHtml(tile.label)}</dt>
          <dd>${escapeHtml(String(tile.value))}${detail}</dd>
        </div>
      `;
    })
    .join("");
}

function renderJourneyHeader() {
  // Imports are the only way to load a bug, so the pill would say nothing. The
  // sample is different: it is fictional and has to stay visibly labeled.
  els.statusPill.hidden = journeyMeta.source !== "sample";
  els.statusPill.innerHTML = "<i></i> Sample journey";
  els.statusPill.title = "Fictional demonstration data";
  // The public reference is never in the KML itself; it only reaches us from the
  // file name, so the title links only when we actually have one.
  const code = journeyMeta.publicCode;
  els.journeyTitleText.innerHTML = code
    ? `<a class="journey-title-link" href="https://coord.info/${escapeHtml(code)}" target="_blank" rel="noreferrer" title="View ${escapeHtml(code)} on Geocaching">${escapeHtml(journeyMeta.title)}</a>`
    : escapeHtml(journeyMeta.title);
  descriptionExpanded = false;
  renderDescription();
  renderJourneyStats();
  refreshShareLink();
  els.stopCount.textContent = `${journey.length.toLocaleString("en-US")} stops`;
}

function loadJourneyData(data, options = {}) {
  pause();
  journeyMeta = { ...data.meta };
  journey = data.stops.map(normalizeStop).filter((stop) =>
    Number.isFinite(stop.lat) && Number.isFinite(stop.lng),
  );
  if (!journey.length) throw new Error("No valid mapped stops were found.");

  maxProgress = Math.max(0, (journey.length - 1) * 100);
  state.progress = 0;
  state.currentIndex = -1;
  state.activeBand = -1;
  journeyHasStates = journey.some((stop) => stop.country === "United States" && stop.region);
  buildPlaceTree();
  state.logSignature = "";
  logExpandBefore = 0;
  logExpandAfter = 0;
  followActive = false;
  camera = null;
  appliedCamera = null;
  cameraView = null;
  expandedCountry = null;
  expandedState = null;
  state.speed = 1;
  els.speedButton.textContent = "1×";
  els.timeline.max = String(maxProgress || 100);
  els.timeline.disabled = maxProgress === 0;
  calculateJourneyMetrics();
  renderJourneyHeader();
  renderStopCount();
  renderTimelineLabels();
  buildStopList(0, true);
  buildMapJourney();
  setProgress(0, { force: true });
  enrichCountries();

  if (options.announce) {
    const distance = journeyMeta.totalMiles == null ? "" : ` · ${formatMiles(journeyMeta.totalMiles)} miles`;
    const omissions = journeyMeta.hasDates ? "" : " Dates and log text are not included in KML.";
    showToast(
      `${journeyMeta.title}: ${journey.length.toLocaleString("en-US")} mapped stops${distance}.${omissions}`,
      5200,
    );
  }
}

let countryEnrichmentToken = 0;
let journeyHasStates = false;

// Walks stops in time slices so a few thousand boundary tests never block a
// frame, yielding only while the page is visible — a hidden tab throttles timers
// to about a second per turn and would stretch the pass over a minute.
// Resolves to whether anything changed, or null if a newer journey took over.
async function resolveInSlices(stops, token, resolve) {
  let sliceStart = performance.now();
  let changed = false;
  for (let i = 0; i < stops.length; i += 1) {
    if (resolve(stops[i])) changed = true;
    if ((i & 31) === 31 && !document.hidden && performance.now() - sliceStart > 8) {
      await new Promise((settle) => setTimeout(settle, 0));
      if (token !== countryEnrichmentToken) return null;
      sliceStart = performance.now();
    }
  }
  return changed;
}

// KML carries coordinates but no country, so derive the blanks from the boundary
// data. Countries that arrived with the journey are authored or source-provided
// and are never overwritten.
async function enrichCountries() {
  const token = (countryEnrichmentToken += 1);
  const pending = journey.filter((stop) => !stop.country);
  if (!pending.length || !window.BugaboutCountries) return;

  const index = await window.BugaboutCountries.load();
  // Bail if the data is unavailable, or a newer journey loaded while we waited.
  if (!index || token !== countryEnrichmentToken) return;

  const countryCache = new Map();
  const countriesChanged = await resolveInSlices(pending, token, (stop) => {
    const key = `${stop.lat.toFixed(3)},${stop.lng.toFixed(3)}`;
    if (!countryCache.has(key)) {
      countryCache.set(key, window.BugaboutCountries.lookup(stop.lat, stop.lng));
    }
    const match = countryCache.get(key);
    if (!match) return false;
    stop.country = match.name;
    stop.countryCode = match.iso ?? "";
    stop.continent = match.group ?? "";
    stop.countrySource = match.source;
    return true;
  });
  if (countriesChanged === null) return;

  // Only US stops have state boundaries to resolve, so the states file is never
  // fetched for a journey that stays outside the country.
  const usStops = journey.filter((stop) => stop.country === "United States" && !stop.region);
  let statesChanged = false;
  if (usStops.length) {
    const states = await window.BugaboutCountries.loadStates();
    if (token !== countryEnrichmentToken) return;
    if (states) {
      const stateCache = new Map();
      const resolved = await resolveInSlices(usStops, token, (stop) => {
        const key = `${stop.lat.toFixed(3)},${stop.lng.toFixed(3)}`;
        if (!stateCache.has(key)) {
          stateCache.set(key, window.BugaboutCountries.lookupState(stop.lat, stop.lng));
        }
        const match = stateCache.get(key);
        if (!match) return false;
        stop.region = match.name;
        return true;
      });
      if (resolved === null) return;
      statesChanged = resolved;
      if (statesChanged) journeyHasStates = true;
    }
  }

  if (!countriesChanged && !statesChanged) return;
  buildPlaceTree();
  renderStopCount();
  renderJourneyStats();
  buildStopList(state.currentIndex, true);
  setProgress(state.progress, { force: true });
}

// Places reached up to the current stop, in the order the bug first arrived —
// the same basis as the readout the list is opened from.
function visitedPlaces(kind, index) {
  const seen = new Map();
  for (let i = 0; i <= index; i += 1) {
    const stop = journey[i];
    const isState = kind === "states";
    const isContinent = kind === "continents";
    if (isState && (stop.country !== "United States" || !stop.region)) continue;
    const name = isState ? stop.region : isContinent ? stop.continent : stop.country;
    if (!name) continue;
    const entry = seen.get(name) ?? {
      name,
      flag: isState || isContinent ? "" : flagEmoji(stop.countryCode),
      count: 0,
    };
    entry.count += 1;
    seen.set(name, entry);
  }
  return [...seen.values()];
}

const PLACE_NOUNS = {
  countries: ["country", "countries"],
  states: ["state", "states"],
  continents: ["continent", "continents"],
};

function openPlaces(kind, index = state.currentIndex) {
  const places = visitedPlaces(kind, index);
  const [noun, plural] = PLACE_NOUNS[kind] ?? PLACE_NOUNS.countries;
  els.placesEyebrow.textContent = `In order of first visit`;
  const whole = index >= journey.length - 1;
  els.placesTitle.textContent = `${places.length.toLocaleString("en-US")} ${places.length === 1 ? noun : plural}${whole ? "" : " so far"}`;
  els.placesList.innerHTML = places
    .map(
      (place) => `
        <li>
          <span class="places-name">${place.flag ? `<span class="place-flag" aria-hidden="true">${place.flag}</span>` : ""}${escapeHtml(place.name)}</span>
          <span class="places-count">${place.count.toLocaleString("en-US")}</span>
        </li>
      `,
    )
    .join("");
  els.placesDialog.showModal();
}

let shareLink = null;
let shareToken = 0;

// Prepared when a journey loads, so the button can say up front whether sharing
// is possible instead of failing on click.
async function refreshShareLink() {
  const token = (shareToken += 1);
  shareLink = null;
  els.shareButton.disabled = true;
  els.shareButton.title = "Preparing a link…";

  const link = await window.BugaboutLink?.encode(journey, journeyMeta);
  if (token !== shareToken) return;

  shareLink = link ?? null;
  els.shareButton.disabled = !shareLink;
  els.shareButton.title = shareLink
    ? "Share a link to this journey"
    : `This journey has too many stops to fit in a link. Sharing works up to roughly ${SHARE_STOP_GUIDE} stops; this one has ${journey.length.toLocaleString("en-US")}.`;
}

let toastTimer;
function showToast(message, duration = 3200) {
  window.clearTimeout(toastTimer);
  els.toast.textContent = message;
  els.toast.classList.add("visible");
  toastTimer = window.setTimeout(() => els.toast.classList.remove("visible"), duration);
}

async function importKmlFile(file) {
  if (!file) return;
  if (!file.name.toLowerCase().endsWith(".kml")) {
    showToast("Choose the .kml file downloaded from “View in Google Earth.”");
    return;
  }
  if (file.size > 15 * 1024 * 1024) {
    showToast("That KML is over 15 MB. Bugabout is not ready for a file that large yet.");
    return;
  }

  try {
    const text = await file.text();
    const parsed = window.BugaboutKml.parse(text, { fileName: file.name });
    window.BugaboutLink?.clear();
    loadJourneyData(parsed, { announce: true });
  } catch (error) {
    showToast(error instanceof Error ? error.message : "Bugabout could not read that KML file.", 5000);
  } finally {
    els.kmlInput.value = "";
  }
}

els.playButton.addEventListener("click", () => {
  if (state.playing) pause();
  else play();
});

els.timeline.addEventListener("input", (event) => {
  pause();
  engageFollow();
  setProgress(event.target.value, { force: true });
});

els.timeline.addEventListener("change", (event) => {
  setProgress(event.target.value, { force: true, pan: true, scroll: true });
});

els.speedButton.addEventListener("click", () => {
  const speeds = [1, 2, 4];
  state.speed = speeds[(speeds.indexOf(state.speed) + 1) % speeds.length];
  els.speedButton.textContent = `${state.speed}×`;
  syncSound();
  showToast(`Playback speed: ${state.speed}×`);
});

els.stopList.addEventListener("click", (event) => {
  const gap = event.target.closest("[data-gap]");
  if (gap) {
    pause();
    rebuildLogWithTransition(() => {
      if (gap.dataset.gap === "before") logExpandBefore += LOG_WINDOW;
      else logExpandAfter += LOG_WINDOW;
    });
    return;
  }

  const stopItem = event.target.closest(".stop-item");
  if (stopItem) {
    pause();
    engageFollow();
    setProgress(Number(stopItem.dataset.stop) * 100, { force: true, pan: true, scroll: false });
    return;
  }

  const placeItem = event.target.closest(".place-item");
  if (!placeItem) return;

  const isCountry = "country" in placeItem.dataset;
  const name = isCountry ? placeItem.dataset.country : placeItem.dataset.state;
  const wasOpen = isCountry ? expandedCountry === name : expandedState === name;

  if (isCountry) {
    expandedCountry = wasOpen ? null : name;
    expandedState = null;
  } else {
    expandedState = wasOpen ? null : name;
  }

  // Opening a place takes you there; closing one leaves the bug where it is.
  if (!wasOpen) {
    const country = placeTree.find((entry) => entry.name === expandedCountry);
    const indexes = isCountry
      ? country?.indexes
      : country?.states.find((region) => region.name === name)?.indexes;
    if (indexes?.length) {
      pause();
      setProgress(indexes[0] * 100, { force: true, pan: true, scroll: false });
    }
  }
  rebuildLogWithTransition(() => {}, { anchor: false });
});

els.logByTime.addEventListener("click", () => setLogMode("time"));
els.logByPlace.addEventListener("click", () => setLogMode("place"));

els.fitButton.addEventListener("click", () => {
  // Re-fits even when already selected, since the map may have been panned since.
  setFollowEnabled(false);
  disengageFollow();
  fitRoute(true);
});

els.soundButton.addEventListener("click", (event) => {
  event.stopPropagation();
  setSoundMenuOpen(els.soundMenu.hidden);
});

els.soundMenu.addEventListener("click", (event) => {
  const choice = event.target.closest("[data-voice]");
  if (!choice) return;
  const bee = window.BugaboutBumblebee;
  soundEnabled = choice.dataset.voice !== "off";
  if (soundEnabled) bee?.setVoice(choice.dataset.voice);

  els.soundButton.classList.toggle("selected", soundEnabled);
  syncSound();
  renderSoundMenu();
  setSoundMenuOpen(false);

  if (soundEnabled && !state.playing) {
    showToast("Flight of the Bumblebee plays while the journey does.");
  }
});

document.addEventListener("click", (event) => {
  if (!els.soundMenu.hidden && !event.target.closest(".map-sound")) setSoundMenuOpen(false);
});

els.zoomInButton.addEventListener("click", () => {
  disengageFollow();
  map?.zoomIn();
});

els.zoomOutButton.addEventListener("click", () => {
  disengageFollow();
  map?.zoomOut();
});

els.followButton.addEventListener("click", () => {
  if (followEnabled) return;
  setFollowEnabled(true);
  engageFollow();
  setProgress(state.progress, { force: true });
});

els.descriptionToggle.addEventListener("click", () => {
  descriptionExpanded = !descriptionExpanded;
  renderDescription();
});

els.openKmlButton.addEventListener("click", () => els.kmlInput.click());
els.kmlInput.addEventListener("change", (event) => importKmlFile(event.target.files?.[0]));

els.shareButton.addEventListener("click", async () => {
  const link = shareLink;
  if (!link) return;

  // Put the link in the address bar too, so what was copied and what the user is
  // looking at are the same thing.
  window.BugaboutLink.adopt(link);

  if (navigator.share) {
    try {
      // No `text`: share targets concatenate it with the url, so what got pasted
      // carried a trailing sentence that broke the link.
      await navigator.share({ title: journeyMeta.title, url: link });
      return;
    } catch (error) {
      if (error.name === "AbortError") return;
    }
  }
  try {
    await navigator.clipboard.writeText(link);
    showToast("Route link copied. Anyone with it can replay this journey.", 4200);
  } catch {
    showToast("Bugabout could not copy the link.");
  }
});

els.journeyStats.addEventListener("click", (event) => {
  const tile = event.target.closest("[data-places]");
  if (tile) openPlaces(tile.dataset.places, journey.length - 1);
});

els.journeyStats.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  const tile = event.target.closest("[data-places]");
  if (!tile) return;
  event.preventDefault();
  openPlaces(tile.dataset.places, journey.length - 1);
});

els.countryStatCard.addEventListener("click", () => openPlaces("countries"));
els.stateReadout.addEventListener("click", () => openPlaces("states"));
els.closePlacesButton.addEventListener("click", () => els.placesDialog.close());
els.placesDialog.addEventListener("click", (event) => {
  if (event.target === els.placesDialog) els.placesDialog.close();
});

els.aboutButton.addEventListener("click", () => els.aboutDialog.showModal());
els.closeAboutButton.addEventListener("click", () => els.aboutDialog.close());
els.aboutDialog.addEventListener("click", (event) => {
  if (event.target === els.aboutDialog) els.aboutDialog.close();
});

let dragDepth = 0;
document.addEventListener("dragenter", (event) => {
  if (!event.dataTransfer?.types.includes("Files")) return;
  dragDepth += 1;
  els.dropOverlay.classList.add("visible");
});
document.addEventListener("dragover", (event) => {
  if (event.dataTransfer?.types.includes("Files")) event.preventDefault();
});
document.addEventListener("dragleave", (event) => {
  if (!event.dataTransfer?.types.includes("Files")) return;
  dragDepth = Math.max(0, dragDepth - 1);
  if (!dragDepth) els.dropOverlay.classList.remove("visible");
});
document.addEventListener("drop", (event) => {
  if (!event.dataTransfer?.files.length) return;
  event.preventDefault();
  dragDepth = 0;
  els.dropOverlay.classList.remove("visible");
  importKmlFile(event.dataTransfer.files[0]);
});

publishRouteRamp();
initializeMap();

// The default journey is a real public trackable rather than the fictional
// sample, so a first visit shows what an actual bug's travels look like.
const DEFAULT_JOURNEY = { url: "./fixtures/TBA5TD9.kml", fileName: "TBA5TD9.kml" };

async function loadDefaultJourney() {
  try {
    const response = await fetch(DEFAULT_JOURNEY.url);
    if (!response.ok) throw new Error(String(response.status));
    const parsed = window.BugaboutKml.parse(await response.text(), {
      fileName: DEFAULT_JOURNEY.fileName,
    });
    loadJourneyData(parsed);
  } catch {
    // Falls back to the fictional sample, which needs no network at all.
    loadJourneyData(sampleData);
  }
}

async function bootstrap() {
  const shared = await window.BugaboutLink?.decode();
  if (shared) {
    try {
      loadJourneyData(shared, { announce: true });
      return;
    } catch {
      showToast("That shared link could not be opened.");
    }
  } else if (window.BugaboutLink?.hasFragment()) {
    showToast("That shared link could not be opened.");
  }
  await loadDefaultJourney();
}

bootstrap();
