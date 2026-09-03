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
  productAboutButton: document.querySelector("#productAboutButton"),
  productDialog: document.querySelector("#productDialog"),
  closeProductDialogButton: document.querySelector("#closeProductDialogButton"),
  productKmlHelpButton: document.querySelector("#productKmlHelpButton"),
  closePlacesButton: document.querySelector("#closePlacesButton"),
  placesDialog: document.querySelector("#placesDialog"),
  placesEyebrow: document.querySelector("#placesEyebrow"),
  placesList: document.querySelector("#placesList"),
  placesScroller: document.querySelector("#placesScroller"),
  placesText: document.querySelector("#placesText"),
  appShell: document.querySelector(".app-shell"),
  emptyState: document.querySelector("#emptyState"),
  journeyWorkspace: document.querySelector(".journey-workspace"),
  emptyActions: document.querySelector("#emptyActions"),
  headerActions: document.querySelector("#headerActions"),
  introActions: document.querySelector("#introActions"),
  openKmlLabel: document.querySelector("#openKmlButton .button-label"),
  stylePicker: document.querySelector("#stylePicker"),
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
  statsScroller: document.querySelector("#statsScroller"),
  statsNudgeBack: document.querySelector("#statsNudgeBack"),
  statsNudgeNext: document.querySelector("#statsNudgeNext"),
  journeyTitle: document.querySelector("#journeyTitle"),
  journeyTitleText: document.querySelector("#journeyTitleText"),
  kmlInput: document.querySelector("#kmlInput"),
  logByPlace: document.querySelector("#logByPlace"),
  logByTime: document.querySelector("#logByTime"),
  mapFallback: document.querySelector("#mapFallback"),
  mapStage: document.querySelector(".map-stage"),
  openKmlButton: document.querySelector("#openKmlButton"),
  playButton: document.querySelector("#playButton"),
  playerCard: document.querySelector(".player-card"),
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
// TEMPORARY: reads the ?off= switches the head script parsed onto <html>.
// Remove with the build marker and the diagnostic CSS block.
const switchedOff = (name) =>
  (document.documentElement.dataset.off ?? "").split(" ").includes(name);

const clamp = (value, minimum, maximum) => Math.max(minimum, Math.min(maximum, value));
const normalizeLongitude = (value) => ((((value + 180) % 360) + 360) % 360) - 180;
const worldOffsets = [-360, 0, 360];

// The route is coloured by chronology: oldest stops plum, newest coral. These are
// hand-picked stops rather than a single purple-to-orange interpolation, which
// passes through a muddy grey-brown at its midpoint. Coral is the palette's
// existing movement accent, so the newest segment matches the bug.
// The ramp lives in CSS as --route-stops so a theme owns it. Read here rather
// than declared here: the route is the most visually dominant element on the
// page, and a theme that could not recolour it would only be half applied.
let routeRamp = ["#3a2a9e", "#d92d5e"];

// Same reason as the ramp: the value lives in CSS so a theme owns it, but the
// canvas renderer needs it as a plain colour.
// Was `.route-preview { opacity: 0.38 }` before the route moved to canvas.
const ROUTE_PREVIEW_OPACITY = 0.38;
let previewRenderer = null;

// The vendored Leaflet build exposes no `getContainer()` on a renderer, so the
// canvas is read from `_container`. Pinned in vendor/, and guarded, so a build
// that changes the field degrades to no fade rather than throwing.
const previewCanvas = () => previewRenderer?._container ?? null;

function routePreviewColor() {
  return (
    getComputedStyle(document.documentElement).getPropertyValue("--route-preview").trim() ||
    "#6b6f78"
  );
}

// The preview used to be hidden by `.map-stage.playing .route-preview`, which a
// canvas layer never sees.
function syncRoutePreview() {
  previewCanvas()?.classList.toggle("is-hidden", state.playing);
}

function readRouteStops() {
  const raw = getComputedStyle(document.documentElement).getPropertyValue("--route-stops");
  const stops = raw
    .split(",")
    .map((stop) => stop.trim())
    .filter((stop) => /^#[0-9a-f]{6}$/i.test(stop));
  return stops.length >= 2 ? stops : routeRamp;
}
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
  const scaled = clamp(amount, 0, 1) * (routeRamp.length - 1);
  const lower = Math.min(Math.floor(scaled), routeRamp.length - 2);
  const blend = scaled - lower;
  const from = hexToRgb(routeRamp[lower]);
  const to = hexToRgb(routeRamp[lower + 1]);
  const channel = (index) => Math.round(from[index] + (to[index] - from[index]) * blend);
  return `rgb(${channel(0)}, ${channel(1)}, ${channel(2)})`;
}

// One source of truth for the ramp: the map bands read it from JS, the timeline
// track and legend swatch read the same stops back out of this custom property.
function publishRouteRamp() {
  routeRamp = readRouteStops();
  const stops = routeRamp.map(
    (color, index) => `${color} ${Math.round((index / (routeRamp.length - 1)) * 100)}%`,
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
let bugPosition = null;
let visibleBugCopy = null;
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

// Colour glyphs paint their own colours whatever the fill is, so filling black
// and reading back a chromatic pixel proves a real flag rendered rather than the
// "FI" letter-pair some platforms fall back to. A width comparison was tried
// first and was wrong: the pair measures *wider* than the two letters.
let flagsRenderCache = null;
function flagsRender() {
  if (flagsRenderCache !== null) return flagsRenderCache;
  flagsRenderCache = false;
  try {
    const canvas = document.createElement("canvas");
    canvas.width = 24;
    canvas.height = 24;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    ctx.fillStyle = "#000";
    ctx.textBaseline = "top";
    ctx.font = "20px sans-serif";
    ctx.fillText("\u{1F1EB}\u{1F1EE}", 0, 0);
    const { data } = ctx.getImageData(0, 0, 24, 24);
    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] === 0) continue;
      if (data[i] !== data[i + 1] || data[i + 1] !== data[i + 2]) {
        flagsRenderCache = true;
        break;
      }
    }
  } catch {
    flagsRenderCache = false;
  }
  return flagsRenderCache;
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
const STOP_SELECTION_DURATION = 240;

// The window normally follows the bug. These let a paused reader pull more of the
// journey into view without losing that behaviour once playback resumes.
let logExpandBefore = 0;
let logExpandAfter = 0;
// Directly selecting a visible row pins the current window so the card changes
// in place. Playback and every other navigation path clear the pin and resume
// the normal behaviour of opening the window on the current stop.
let logWindowStart = null;
let stopSelectionFrame = null;

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
// The window's start is quantised, so it advances in steps rather than tracking
// every stop. It used to re-anchor on each one, and since the render signature
// is built from these bounds that meant `buildStopList` rewriting all 64 rows
// through innerHTML about seventeen times a second — tens of kilobytes of HTML
// parsed, styled and laid out per second. A short journey is not windowed at all
// and so never paid this, which is why an 18-stop bug played fine on a phone
// where a 2,483-stop one locked every button on the page. Stepping cuts those
// rebuilds by eight and leaves the active card within a few rows of the top.
const LOG_WINDOW_STEP = 8;

function indexWindow(indexes, centerIndex) {
  const size = LOG_WINDOW + logExpandBefore + logExpandAfter;
  if (indexes.length <= Math.max(120, size)) return { start: 0, end: indexes.length };
  const position = Math.max(0, indexes.indexOf(centerIndex));
  const lastStart = indexes.length - size;
  let start = clamp(position - logExpandBefore, 0, lastStart);
  start = Math.min(lastStart, Math.floor(start / LOG_WINDOW_STEP) * LOG_WINDOW_STEP);
  // Snap to the true end rather than stopping a few rows short of it. Flooring
  // to a step can leave `end` up to LOG_WINDOW_STEP - 1 below the last index,
  // which showed a "later stops" gap that could never be exhausted: expanding it
  // grew `size`, which pulled `start` backwards, so the rows appeared above the
  // window and the count stayed put.
  if (start > lastStart - LOG_WINDOW_STEP) start = lastStart;
  if (logWindowStart !== null) {
    const pinned = clamp(logWindowStart, 0, indexes.length - size);
    if (position >= pinned && position < pinned + size) start = pinned;
    else logWindowStart = null;
  }
  return { start, end: start + size };
}

function stopRowHtml(index, depth = 0, active = false) {
  const stop = journey[index];
  const secondary = [stop.region, stop.country].filter(Boolean).join(", ") || "Mapped cache";
  const date = stop.date ? compactDateFormat.format(toDate(stop.date)) : `Stop ${index + 1}`;
  const story =
    stop.kicker || stop.story
      ? `<span class="stop-story"><span class="stop-story-inner">${
          stop.kicker ? `<span class="stop-kicker">${escapeHtml(stop.kicker)}</span>` : ""
        }${stop.story ? `<span class="stop-text">${escapeHtml(stop.story)}</span>` : ""}</span></span>`
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

// An open place wraps its own contents rather than being followed by them. That
// is what lets its header stick for exactly as long as the group is on screen —
// in a flat list the header's containing block is its own single row, so it
// would either not stick at all or go on hovering over whatever came next.
function placeRowHtml({ name, flag, count, detail, open, attribute, isState, children = "" }) {
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
      ${children ? `<ol class="place-children">${children}</ol>` : ""}
    </li>
  `;
}

function countryChildrenHtml(country, centerIndex) {
  if (!country.states.length) return stopRowsHtml(country.indexes, centerIndex, 1);
  return country.states
    .map((region) => {
      const openState = region.name === expandedState;
      return placeRowHtml({
        name: region.name,
        count: region.indexes.length,
        detail: "",
        open: openState,
        attribute: "data-state",
        isState: true,
        children: openState ? stopRowsHtml(region.indexes, centerIndex, 2) : "",
      });
    })
    .join("");
}

function placeListHtml(centerIndex) {
  return placeTree
    .map((country) => {
      const open = country.name === expandedCountry;
      return placeRowHtml({
        name: country.name,
        flag: country.flag,
        count: country.indexes.length,
        detail: country.states.length
          ? `${country.states.length} ${country.states.length === 1 ? "state" : "states"}`
          : "",
        open,
        attribute: "data-country",
        isState: false,
        children: open ? countryChildrenHtml(country, centerIndex) : "",
      });
    })
    .join("");
}

// Indexes of whichever leaf list is currently on screen, so the rebuild check
// knows when its window has drifted.
function expandedLeafIndexes() {
  const country = placeTree.find((entry) => entry.name === expandedCountry);
  if (!country) return null;
  if (!country.states.length) return country.indexes;
  return country.states.find((region) => region.name === expandedState)?.indexes ?? null;
}

function pinCurrentLogWindow() {
  const firstRow = els.stopList.querySelector(".stop-item");
  if (!firstRow) {
    logWindowStart = null;
    return;
  }
  const firstIndex = Number(firstRow.dataset.stop);
  if (logMode === "time") {
    logWindowStart = firstIndex;
    return;
  }
  const leaf = expandedLeafIndexes();
  const position = leaf?.indexOf(firstIndex) ?? -1;
  logWindowStart = position >= 0 ? position : null;
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

// Two gaps of the same direction and depth are the same gap as far as the feed
// is concerned; only its count has changed, and a re-announcement on every
// window shift would be noise.
function gapKey(gap) {
  const direction = gap.querySelector("[data-gap]")?.dataset.gap ?? "";
  const depth = gap.classList.contains("depth-2") ? 2 : gap.classList.contains("depth-1") ? 1 : 0;
  return `${direction}:${depth}`;
}

// The "earlier stops" row arrives unannounced mid-playback, the moment the
// window slides past the start of the journey, and every row below it stepped
// down by its height between two frames. Growing it from nothing lets the feed
// ease into the new position instead. The height has to be measured and handed
// to CSS because the row's natural height is `auto`, which has nothing to
// animate from.
function openNewGapRows(previousKeys) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  for (const gap of els.stopList.querySelectorAll(".stop-gap")) {
    if (previousKeys.has(gapKey(gap))) continue;
    gap.style.setProperty("--gap-height", `${gap.offsetHeight}px`);
    gap.classList.add("opening");
    gap.addEventListener(
      "animationend",
      () => {
        gap.classList.remove("opening");
        gap.style.removeProperty("--gap-height");
      },
      { once: true },
    );
  }
}

function buildStopList(centerIndex = 0, force = false) {
  // TEMPORARY: ?off=loglist freezes the log while the journey plays, so the
  // question "is it the list teardown that breaks taps on iOS" can be answered
  // in one gesture instead of guessed at. Remove with the build marker.
  if (state.playing && switchedOff("loglist")) return;
  const signature = logSignature(centerIndex);
  if (!force && signature === state.logSignature) return;
  state.logSignature = signature;

  const hadRows = els.stopList.childElementCount > 0;
  const gapsBefore = new Set([...els.stopList.querySelectorAll(".stop-gap")].map(gapKey));

  els.stopList.classList.toggle("by-place", logMode === "place");
  els.stopList.innerHTML =
    logMode === "place"
      ? placeListHtml(centerIndex)
      : stopRowsHtml(
          journey.map((_, index) => index),
          centerIndex,
        );

  // A first build has nothing to move down, and the card is running its own
  // entrance animation over the top of it.
  if (hadRows) openNewGapRows(gapsBefore);
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

  logWindowStart = null;
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

  offsetLogScroll(drift);
}

// Whichever box is actually scrolling the log. On mobile the sidebar's own box
// is dropped (display: contents) and the bounded list scrolls instead; on
// desktop the list is unbounded and the sidebar around it scrolls. Checking the
// list first means neither layout has to be named here.
function logScroller() {
  for (const element of [els.stopList, els.journeySidebar]) {
    if (element && element.scrollHeight > element.clientHeight + 1) return element;
  }
  return null;
}

function scrollBehavior() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
}

// Falls back to the page only when nothing else scrolls the log.
function offsetLogScroll(drift) {
  const scroller = logScroller();
  if (scroller) scroller.scrollTop += drift;
  else window.scrollBy(0, drift);
}

function restoreStopRowPosition(index, topBefore) {
  const selected = els.stopList.querySelector(`[data-stop="${index}"]`);
  if (!selected) return;
  const drift = selected.getBoundingClientRect().top - topBefore;
  if (Math.abs(drift) >= 1) offsetLogScroll(drift);
}

function cancelStopSelectionAnimation() {
  if (stopSelectionFrame !== null) cancelAnimationFrame(stopSelectionFrame);
  stopSelectionFrame = null;
  els.stopList.classList.remove("selecting-stop");
}

function prepareStopSelectionAnimation() {
  cancelStopSelectionAnimation();
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  els.stopList.classList.add("selecting-stop");
  // Establish the transition rules before the active classes change.
  void els.stopList.offsetHeight;
}

// The old card shrinks while the clicked row grows. Hold the clicked row at the
// same viewport coordinate throughout that exchange so the polish never brings
// back the jump this interaction was designed to remove.
function animateStopSelection(index, topBefore) {
  restoreStopRowPosition(index, topBefore);
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const started = performance.now();
  const holdPosition = (now) => {
    restoreStopRowPosition(index, topBefore);
    if (now - started < STOP_SELECTION_DURATION + 40) {
      stopSelectionFrame = requestAnimationFrame(holdPosition);
      return;
    }
    stopSelectionFrame = null;
    els.stopList.classList.remove("selecting-stop");
    restoreStopRowPosition(index, topBefore);
  };
  stopSelectionFrame = requestAnimationFrame(holdPosition);
}

// All the way up rather than just far enough to reveal the active card: the
// "Journey log" heading and the By time / By place toggle come back with it, and
// the card sits right under them anyway once the window is collapsed.
function scrollLogToTop() {
  // Only ever the log's own scroller, never the page: on mobile moving the page
  // would pull the map away as playback starts.
  const scroller = logScroller();
  if (!scroller) return;
  scroller.scrollTo({ top: 0, behavior: scrollBehavior() });
}

// Where an opened place comes to rest: a country at the top of the log, a state
// directly beneath the country header that stays pinned above it.
function scrollPlaceToRest(placeItem) {
  const scroller = logScroller();
  if (!scroller || !placeItem) return;
  const countryHeader = placeItem.classList.contains("state-item")
    ? placeItem.closest(".place-item[data-country]")?.querySelector(":scope > .place-button")
    : null;
  // Read back off the sticky row rather than re-deriving it: a state parks below
  // the country header *and* the air above itself, so resting it at the header's
  // bare height left sticky to make up the difference — clamping the row 5px
  // down over the gap above its first cache card. Falls back to the header's
  // height for a state that is active without being open, which is not sticky.
  const stuck = countryHeader
    ? parseFloat(getComputedStyle(placeItem.querySelector(":scope > .place-button")).top)
    : 0;
  const rest = Number.isFinite(stuck) ? stuck : countryHeader.offsetHeight;
  const drift =
    placeItem.getBoundingClientRect().top - scroller.getBoundingClientRect().top - rest;
  if (Math.abs(drift) < 1) return;
  scroller.scrollTo({ top: scroller.scrollTop + drift, behavior: scrollBehavior() });
}

// Same desktop-only rule as scrollLogToTop, for the same reason: on mobile the
// page is the scroller, so pulling a row into view drags the map off screen —
// exactly what someone watching playback does not want.
// Scrubbing and starting playback both re-aim the journey, so the log goes home:
// any expanded window collapses and the sidebar returns to the top, where the
// "Journey log" heading and the By time / By place toggle live. Bringing the
// active card to rest against the top edge instead scrolls both of them away,
// and the windowed list already keeps that card a heading's height from the top.
function returnLogHome() {
  if (logExpandBefore || logExpandAfter) {
    // Anchored, so collapsing the rows does not shift what is on screen — on
    // mobile that shift is the whole viewport, since the page is the scroller.
    rebuildLogWithTransition(() => {
      logExpandBefore = 0;
      logExpandAfter = 0;
    });
  }
  scrollLogToTop();
}

// Sticky place headers park at the top of the log, so pinning a card to the
// scroller's own top edge slides it underneath them — the country and state rows
// covered the card they were meant to label as soon as playback started. Measures
// the stack standing above this row and pins below it, keeping the same air an
// opened place leaves above its first card.
//
// Cached because the pin runs on every index change — seventeen times a second on
// a long journey — and this reads computed style. What it depends on is which
// places are open, not where playback has reached, so the mode, the open pair and
// the width are the whole key.
let stickyInset = { key: null, value: 0 };

function stickyLogInset(row) {
  const key = `${logMode}|${expandedCountry}|${expandedState}|${window.innerWidth}`;
  if (stickyInset.key === key) return stickyInset.value;
  let value = 0;
  for (
    let item = row.parentElement?.closest(".place-item");
    item;
    item = item.parentElement?.closest(".place-item")
  ) {
    const button = item.querySelector(":scope > .place-button");
    if (!button || getComputedStyle(button).position !== "sticky") continue;
    value = Math.max(value, (parseFloat(getComputedStyle(button).top) || 0) + button.offsetHeight);
  }
  // Read back rather than hard-coded, so it tracks .place-children's margin.
  if (value) value += parseFloat(getComputedStyle(row.parentElement).marginTop) || 0;
  stickyInset = { key, value };
  return value;
}

// Holds the active card at the top of the log as playback moves through it. The
// list is its own scroller in both layouts now, so this applies to each. Guards
// run cheapest-first: `logScroller` reads scrollHeight and clientHeight, a
// forced reflow, so nothing asks it until the cheap checks have passed.
function pinLogToCurrentStop(index) {
  const row = els.stopList.querySelector(`[data-stop="${index}"]`);
  if (!row) return false;
  const scroller = logScroller();
  if (!scroller || scroller !== els.stopList) return false;
  // TEMPORARY: ?off=pin stops playback scrolling the log at all, the other half
  // of the failing pair alongside ?off=sticky. Remove with the build marker.
  if (state.playing && switchedOff("pin")) return true;
  const drift =
    row.getBoundingClientRect().top -
    scroller.getBoundingClientRect().top -
    stickyLogInset(row);
  // Pinned, not merely kept in view. The window start is quantised to steps of
  // eight, so without this the card walks eight rows — about 360px — down the
  // list before the next rebuild snaps it back.
  if (Math.abs(drift) < 2) return true;
  scroller.scrollTo({
    top: scroller.scrollTop + drift,
    behavior: state.playing ? "auto" : scrollBehavior(),
  });
  return true;
}

function scrollLogToStop(index) {
  const scroller = logScroller();
  if (!scroller) return;
  // The list scroller holds the card at its top; the sidebar only reveals it.
  if (scroller === els.stopList) {
    pinLogToCurrentStop(index);
    return;
  }
  // "nearest" stops the moment the row's edge meets the frame, which on the
  // final stop leaves the sidebar's 30px bottom padding below the fold and the
  // last card jammed against the edge. Go all the way down instead.
  if (index >= journey.length - 1) {
    scroller.scrollTo({ top: scroller.scrollHeight, behavior: scrollBehavior() });
    return;
  }
  els.stopList.querySelector(`[data-stop="${index}"]`)?.scrollIntoView({
    block: "nearest",
    behavior: scrollBehavior(),
  });
}

function setLogMode(mode) {
  if (logMode === mode) return;
  logWindowStart = null;
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

  // The old list's scroll position means nothing in the new one, so switching
  // used to land mid-list on whatever happened to be at that offset. Go to
  // where the bug currently is: its country in By place, its stop in By time.
  const active = els.stopList.querySelector(".place-item.active");
  if (active) scrollPlaceToRest(active);
  else if (!pinLogToCurrentStop(state.currentIndex)) scrollLogToTop();
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
    // Canvas, not SVG. The route is 24 bands repeated across three world copies,
    // and on a long journey that is thousands of points which Leaflet reprojects
    // and rewrites as path `d` attributes on every map move — the dominant cost
    // of playback on a phone, and one no amount of trimming per-stop DOM work
    // could reach. Markers are divIcons and stay in the DOM either way.
    preferCanvas: true,
    // A phone-width map needs to dip below zoom 2 to make a genuinely global
    // journey fit. Fractional zoom keeps the world as large as the pane allows.
    minZoom: 0,
    zoomSnap: 0,
  });

  map.on("moveend", () => {
    refreshStopMarkers();
    showNearestBugCopy();
  });
  map.on("dragstart", disengageFollow);
  map.getContainer().addEventListener("wheel", disengageFollow, { passive: true });
  map.getContainer().addEventListener("dblclick", disengageFollow);
  new ResizeObserver(() => scheduleMapLayout()).observe(map.getContainer());

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

// Fit the geometry the route actually draws, not just its cache coordinates.
// A dateline crossing adds endpoints at both ±180°; omitting them lets
// fitBounds crop the flight to and from the edge even though every stop fits.
function routeFitBounds() {
  const points = journey.map((stop) => [stop.lat, stop.lng]);
  return L.latLngBounds(splitAtAntimeridian(points).flat());
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
  if (previewRenderer) map.removeLayer(previewRenderer);
  previewRenderer = null;
  routeLine = null;
  routeBands = [];
  bugMarkers = [];
  bugPosition = null;
  visibleBugCopy = null;
  stopMarkers = new Map();
  sampledIndexes = [];
}

function buildMapJourney() {
  if (!map || !journey.length) return;
  clearMapJourney();

  // Its own canvas, created before the bands so it sits under them. Giving the
  // preview a dedicated renderer means there *is* an element for CSS to reach
  // again: the opacity and its 320ms fade live on that canvas, so hiding the
  // unvisited route during playback is a composited fade rather than a redraw.
  previewRenderer = L.canvas({ padding: 0.5 });
  routeLine = L.polyline(routeLatLngs(journey), {
    className: "route-preview",
    renderer: previewRenderer,
    // Still read here: the stroke is painted into the canvas, which no
    // stylesheet can restyle. Only the element's opacity is CSS's to animate.
    color: routePreviewColor(),
    weight: 3,
    opacity: 1,
    dashArray: "2 9",
    lineCap: "round",
    interactive: false,
  }).addTo(map);
  previewCanvas()?.classList.add("route-preview-canvas");
  syncRoutePreview();

  buildRouteBands();

  bugMarkers = worldOffsets.map((longitudeOffset) =>
    L.marker([journey[0].lat, journey[0].lng + longitudeOffset], {
      icon: L.divIcon({
        className: "bug-marker-wrap",
        html: '<span class="bug-marker" aria-hidden="true"><img src="/assets/buggg.svg?v=1" alt=""></span>',
        iconSize: [46, 46],
        iconAnchor: [23, 23],
      }),
      zIndexOffset: BUG_Z_INDEX,
      keyboard: false,
    }).addTo(map),
  );

  window.setTimeout(() => {
    map.invalidateSize();
    updateCameraControls();
    if (followEnabled) activateFollowCamera();
    else fitRoute(false);
    refreshStopMarkers();
  }, 0);
}

// Route vectors repeat across wrapped worlds, but the story has one bug. At a
// globe-scale mobile fit more than one world edge can enter the pane; showing
// only the copy nearest the camera avoids a second, clipped bug in the margin.
function showNearestBugCopy() {
  if (!map || !bugPosition || !bugMarkers.length) return;
  const centre = map.getCenter().lng;
  let nearest = 0;
  let distance = Infinity;
  worldOffsets.forEach((offset, index) => {
    const candidate = Math.abs(bugPosition[1] + offset - centre);
    if (candidate >= distance) return;
    distance = candidate;
    nearest = index;
  });
  if (nearest === visibleBugCopy) return;
  visibleBugCopy = nearest;
  bugMarkers.forEach((marker, index) => marker.setOpacity(index === nearest ? 1 : 0));
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

function renderSpeedControl() {
  els.speedButton.textContent = `Speed ${state.speed}×`;
  els.speedButton.setAttribute("aria-label", `Playback speed: ${state.speed}×`);
}

let followEnabled = true;
let followActive = false;
let routeFitActive = true;
let camera = null;
let appliedCamera = null;
let cameraTime = 0;
let cameraSnap = false;
let cameraView = null;
let mapLayoutFrame = null;
let animateNextRouteFit = false;
let mapLayoutTransitioning = false;
let mapLayoutTransitionToken = 0;
let mapLayoutAnimations = [];

const MAP_LAYOUT_TRANSITION_DURATION = 420;
const FOLLOW_CAMERA_TRANSITION_DURATION = 0.55;

function disengageFollow() {
  followActive = false;
  routeFitActive = false;
}

function unwrapLongitude(longitude, reference) {
  let delta = longitude - reference;
  while (delta > 180) delta -= 360;
  while (delta < -180) delta += 360;
  return reference + delta;
}

// The fixed counts were tuned on a 2,472-stop journey, where neighbouring stops
// are often metres apart and 45 ahead is a local cluster. On a sparse journey
// they span the whole route: an 18-stop bug crossing the Caribbean, Hawaii and
// Switzerland framed stops 0..17 at every index, so the frame never changed and
// the camera never moved. Scaling to the journey keeps the dense case identical
// (2,483 still yields 8 and 45) while letting a short one actually travel.
function cameraWindow() {
  const ahead = Math.min(CAMERA_LOOKAHEAD, Math.max(2, Math.round(journey.length / 8)));
  const behind = Math.min(CAMERA_LOOKBEHIND, Math.max(1, Math.round(ahead / 5)));
  return { behind, ahead };
}

function windowFrame(index, position) {
  const { behind, ahead } = cameraWindow();
  const first = Math.max(0, index - behind);
  const last = Math.min(journey.length - 1, index + ahead);

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
  const bounds = routeFitBounds();
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
  const changed = followEnabled !== enabled;
  followEnabled = enabled;
  followActive = enabled && followActive;
  els.followButton.setAttribute("aria-pressed", String(enabled));
  els.fitButton.setAttribute("aria-pressed", String(!enabled));
  els.mapStage.classList.toggle("whole-route-view", !enabled);
  if (changed) scheduleMapLayout();
}

function engageFollow({ snap = true } = {}) {
  if (!followEnabled) return;
  routeFitActive = false;
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

const ROUTE_FIT_PAD_X = 42;
const ROUTE_FIT_PAD_TOP = 85;
const ROUTE_FIT_PAD_BOTTOM = 150;
const MOBILE_ROUTE_FIT_PAD_X = 24;
const MOBILE_ROUTE_FIT_PAD_TOP = 72;
const MOBILE_ROUTE_FIT_PAD_BOTTOM = 24;
const GLOBE_ROUTE_LONGITUDE_SPAN = 300;

function wholeRoutePadding() {
  const stacked =
    els.mapStage.classList.contains("whole-route-view") &&
    window.matchMedia("(max-width: 780px)").matches;
  return stacked
    ? {
        x: MOBILE_ROUTE_FIT_PAD_X,
        top: MOBILE_ROUTE_FIT_PAD_TOP,
        bottom: MOBILE_ROUTE_FIT_PAD_BOTTOM,
      }
    : { x: ROUTE_FIT_PAD_X, top: ROUTE_FIT_PAD_TOP, bottom: ROUTE_FIT_PAD_BOTTOM };
}

function wholeRouteView(bounds) {
  const padding = wholeRoutePadding();
  const zoom = map.getBoundsZoom(
    bounds,
    false,
    L.point(padding.x * 2, padding.top + padding.bottom),
  );
  const northWest = map.project(bounds.getNorthWest(), zoom);
  const southEast = map.project(bounds.getSouthEast(), zoom);
  const centre = northWest.add(southEast).divideBy(2);

  // A globe-spanning route is usually concentrated away from the equator.
  // Centring on those stops exposes Leaflet's hard north or south map edge,
  // even though the horizontally wrapping world still has room. Prefer the
  // equator so the world itself is vertically balanced, then constrain that
  // choice only as much as needed to keep every stop inside the safe area.
  const longitudeSpan = Math.abs(bounds.getEast() - bounds.getWest());
  if (longitudeSpan >= GLOBE_ROUTE_LONGITUDE_SPAN) {
    const mapSize = map.getSize();
    const worldCentre = map.project(L.latLng(0, bounds.getCenter().lng), zoom);
    const minimumCentreY = southEast.y - mapSize.y / 2 + padding.bottom;
    const maximumCentreY = northWest.y + mapSize.y / 2 - padding.top;

    if (minimumCentreY <= maximumCentreY) {
      worldCentre.y = clamp(worldCentre.y, minimumCentreY, maximumCentreY);
      return { centre: map.unproject(worldCentre, zoom), zoom };
    }
  }

  // Centre the route inside the safe area. Moving all aspect-ratio slack below
  // the route made a width-constrained world view crop at the top as the pane
  // changed shape. Only the exact asymmetric-padding correction belongs here.
  centre.y += (padding.bottom - padding.top) / 2;

  return { centre: map.unproject(centre, zoom), zoom };
}

function fitRoute(animate = true) {
  if (!map || !journey.length) return;
  routeFitActive = true;
  if (journey.length === 1) {
    map.setView([journey[0].lat, journey[0].lng], 12, { animate });
    return;
  }
  const bounds = routeFitBounds();
  const view = wholeRouteView(bounds);
  map.setView(view.centre, view.zoom, {
    animate,
    duration: 0.7,
  });
}

// Leaflet notices a browser resize, but it preserves the previous centre and
// zoom. Whole route needs a fresh fit because the limiting axis may have changed;
// Follow bug needs a fresh camera frame. ResizeObserver also catches the mobile
// mode switch, where CSS changes the map without resizing the window.
function scheduleMapLayout({ animateFit = false } = {}) {
  animateNextRouteFit ||= animateFit;
  if (!map || mapLayoutFrame !== null) return;
  mapLayoutFrame = requestAnimationFrame(() => {
    mapLayoutFrame = null;
    const animate = animateNextRouteFit;
    animateNextRouteFit = false;
    map.invalidateSize({ pan: false });
    if (mapLayoutTransitioning) return;
    if (!journey.length) return;

    if (!followEnabled || routeFitActive) {
      fitRoute(animate);
      return;
    }
    if (!followActive) return;

    camera = null;
    appliedCamera = null;
    cameraView = null;
    cameraTime = 0;
    cameraSnap = true;
    setProgress(state.progress, { force: true });
  });
}

function activateFollowCamera({ animate = false } = {}) {
  engageFollow({ snap: !animate });
  if (!animate || typeof map.flyTo !== "function") {
    setProgress(state.progress, { force: true });
    return;
  }

  const index = Math.min(Math.floor(state.progress / 100), journey.length - 1);
  const position = bugPosition ?? [journey[index].lat, journey[index].lng];
  const target = viewForFrame(windowFrame(index, position));
  cameraView = target;
  camera = { ...target };
  appliedCamera = { ...target };
  cameraTime = performance.now();
  cameraSnap = false;
  map.flyTo([target.lat, normalizeLongitude(target.lng)], target.zoom, {
    duration: FOLLOW_CAMERA_TRANSITION_DURATION,
    easeLinearity: 0.25,
  });
}

function cancelMapLayoutTransition() {
  mapLayoutTransitionToken += 1;
  mapLayoutAnimations.forEach((animation) => animation.cancel());
  mapLayoutAnimations = [];
  mapLayoutTransitioning = false;
  els.mapStage.classList.remove("map-layout-transitioning");
  if (mapLayoutFrame !== null) {
    cancelAnimationFrame(mapLayoutFrame);
    mapLayoutFrame = null;
  }
  animateNextRouteFit = false;
}

// Mobile runs two different layouts: a stacked overview with the player below
// the map, and a tall map with the player overlaid. Switching either way is
// animated so the map does not jump between shapes. `applyLayout` performs the
// actual state change between the before and after measurements; `settle` runs
// once the geometry has stopped moving and re-aims the camera.
function transitionMapLayout(applyLayout, settle) {
  cancelMapLayoutTransition();

  const canAnimate =
    map &&
    typeof els.mapStage.animate === "function" &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!canAnimate) {
    applyLayout();
    settle(false);
    return;
  }

  const stageFrom = els.mapStage.getBoundingClientRect().height;
  const mapFrom = map.getContainer().getBoundingClientRect().height;
  const playerFrom = els.playerCard.getBoundingClientRect().width;
  const styleFrom = getComputedStyle(els.playerCard);
  const cardFrom = {
    bottom: styleFrom.bottom,
    borderRadius: styleFrom.borderRadius,
    boxShadow: styleFrom.boxShadow,
  };

  const token = (mapLayoutTransitionToken += 1);
  mapLayoutTransitioning = true;
  applyLayout();

  const stageTo = els.mapStage.getBoundingClientRect().height;
  const mapTo = map.getContainer().getBoundingClientRect().height;
  const playerTo = els.playerCard.getBoundingClientRect().width;
  const styleTo = getComputedStyle(els.playerCard);

  // Desktop serves one layout for both modes, so nothing moved and there is
  // nothing to animate. Checking the measurements rather than the breakpoint
  // keeps this correct if the layouts ever converge at another width.
  if (Math.abs(stageFrom - stageTo) < 1 && Math.abs(mapFrom - mapTo) < 1) {
    mapLayoutTransitioning = false;
    settle(false);
    return;
  }

  els.mapStage.classList.add("map-layout-transitioning");
  const timing = {
    duration: MAP_LAYOUT_TRANSITION_DURATION,
    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    fill: "both",
  };
  mapLayoutAnimations = [
    els.mapStage.animate([{ height: `${stageFrom}px` }, { height: `${stageTo}px` }], timing),
    map
      .getContainer()
      .animate([{ height: `${mapFrom}px` }, { height: `${mapTo}px` }], timing),
    els.playerCard.animate(
      [
        {
          ...cardFrom,
          transform: `scaleX(${playerTo ? playerFrom / playerTo : 1})`,
          transformOrigin: "center bottom",
        },
        {
          bottom: styleTo.bottom,
          borderRadius: styleTo.borderRadius,
          boxShadow: styleTo.boxShadow,
          transform: "scaleX(1)",
          transformOrigin: "center bottom",
        },
      ],
      timing,
    ),
  ];

  Promise.allSettled(mapLayoutAnimations.map((animation) => animation.finished)).then(() => {
    if (token !== mapLayoutTransitionToken) return;
    const completed = mapLayoutAnimations;
    mapLayoutAnimations = [];
    completed.forEach((animation) => animation.cancel());
    els.mapStage.classList.remove("map-layout-transitioning");
    if (mapLayoutFrame !== null) {
      cancelAnimationFrame(mapLayoutFrame);
      mapLayoutFrame = null;
    }
    animateNextRouteFit = false;
    map.invalidateSize({ pan: false });
    settle(true);
    requestAnimationFrame(() => {
      if (token === mapLayoutTransitionToken) mapLayoutTransitioning = false;
    });
  });
}

function transitionToFollow() {
  transitionMapLayout(
    () => setFollowEnabled(true),
    (animated) => {
      if (!animated) {
        activateFollowCamera();
        scheduleMapLayout();
        return;
      }
      activateFollowCamera({ animate: true });
    },
  );
}

function transitionToWholeRoute() {
  transitionMapLayout(
    () => {
      setFollowEnabled(false);
      disengageFollow();
    },
    (animated) => {
      if (!animated) {
        scheduleMapLayout({ animateFit: true });
        return;
      }
      fitRoute(true);
    },
  );
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

// Built once and then only ever re-lettered. This line used to be reassembled
// with innerHTML on every stop — about seventeen times a second — which is what
// broke every button on the page during playback on a phone: a click is only
// dispatched if the element the touch *began* on is still in the document when
// the finger lifts, and this was detaching a subtree inside the player card
// under the user's thumb. Nothing here may replace a node; only text and
// attributes change.
let playerPlaceParts = null;

function playerPlaceNodes() {
  if (playerPlaceParts && playerPlaceParts.place.parentNode === els.playerPlace) {
    return playerPlaceParts;
  }
  els.playerPlace.textContent = "";
  const place = document.createTextNode("");
  const dot = document.createElement("span");
  dot.className = "player-dot";
  dot.setAttribute("aria-hidden", "true");
  dot.textContent = "•";
  const link = document.createElement("a");
  link.className = "player-cache";
  link.target = "_blank";
  link.rel = "noreferrer";
  // A stop without a cache URL still shows its code, as plain text.
  const plainCode = document.createTextNode("");
  els.playerPlace.append(place, dot, document.createTextNode(" "), link, plainCode);
  playerPlaceParts = { place, dot, link, plainCode };
  return playerPlaceParts;
}

function updateStory(index) {
  const stop = journey[index];
  els.playerDate.textContent = stop.date
    ? dateFormat.format(toDate(stop.date))
    : `Stop ${index + 1} of ${journey.length.toLocaleString("en-US")}`;

  const { place, dot, link, plainCode } = playerPlaceNodes();
  const where = [stop.region, stop.country].filter(Boolean).join(", ");
  place.nodeValue = where ? `${where} ` : "";
  dot.hidden = !where;

  if (stop.cacheUrl) {
    link.hidden = false;
    link.href = stop.cacheUrl;
    link.textContent = stop.code;
    plainCode.nodeValue = "";
  } else {
    link.hidden = true;
    link.removeAttribute("href");
    link.textContent = "";
    plainCode.nodeValue = stop.code;
  }
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

// The icon is looked up once per marker and remembered on the element. This ran
// a querySelector per marker per stop — 260 of them about seventeen times a
// second — before anything had even changed.
function iconFor(element) {
  if (!element) return null;
  if (!element._bugaboutIcon) element._bugaboutIcon = element.querySelector(".map-stop-icon");
  return element._bugaboutIcon;
}

function setMarkerRecency(markerIndex, recency) {
  const icon = iconFor(stopMarkers.get(markerIndex)?.getElement());
  if (!icon) return;
  if (recency > 0) icon.style.setProperty("--recency", recency.toFixed(3));
  else icon.style.removeProperty("--recency");
}

function paintStopMarkers(index) {
  const highlighted = nearestSampledIndex(index);
  // Advancing one stop changes the state of one marker, not all of them, but
  // every marker was being rewritten anyway. Each write lands on an element
  // carrying a transition and a shadow, so the wasted ones were not free: they
  // were most of the per-stop cost of playback on a phone.
  stopMarkers.forEach((marker, markerIndex) => {
    const element = marker.getElement();
    if (!element) return;

    const unvisited = markerIndex > index;
    if (element._bugaboutUnvisited !== unvisited) {
      element.classList.toggle("stop-unvisited", unvisited);
      element._bugaboutUnvisited = unvisited;
    }

    const isCurrent = markerIndex === highlighted;
    const icon = iconFor(element);
    if (icon && icon._bugaboutCurrent !== isCurrent) {
      icon.classList.toggle("current", isCurrent);
      icon._bugaboutCurrent = isCurrent;
    }
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

// Following the bug through the log during playback is reverted for now, and
// must not come back as-is. Opening a place gives expandedLeafIndexes() a leaf,
// so the windowed cache rows slide as playback advances and logSignature keeps
// changing — which means els.stopList.innerHTML is replaced over and over while
// the journey plays. That is the element-removal pattern behind the iOS
// click-synthesis bug in AGENTS.md, and it broke every tap on the page again.
//
// With nothing expanded the signature is the constant `p|null|null|` and the
// list is never rebuilt, which is why By place was safe during playback before.
// Any future attempt has to slide that window without tearing down DOM.

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

// Running totals for every prefix of the journey, built once. The readout used
// to derive these by rescanning `journey.slice(0, index + 1)` — five passes and
// six array allocations — on every frame of playback, sixty times a second. At
// eighteen stops that is free; at 2,483 it is roughly 750,000 element
// operations a second plus the garbage to match, which on a phone starved the
// main thread badly enough that touches timed out and *every* button on the
// page stopped responding while the map still panned. Prefixes make it O(1).
let statsPrefix = [];

function buildStatsPrefix() {
  const countries = new Set();
  const states = new Set();
  let everyStopHasCountry = true;
  let anyDerived = false;

  statsPrefix = journey.map((stop) => {
    if (stop.country) countries.add(stop.country);
    else everyStopHasCountry = false;
    if (stop.countrySource === "polygon" || stop.countrySource === "coast") anyDerived = true;
    if (stop.country === "United States" && stop.region) states.add(stop.region);
    return {
      countries: countries.size,
      states: states.size,
      everyStopHasCountry,
      anyDerived,
    };
  });
}

function updateStats(progress, index) {
  const at = statsPrefix[index];
  els.distanceStat.textContent = formatMiles(distanceAtProgress(progress));

  const hasCountryData = Boolean(at?.everyStopHasCountry);
  const countryCount = at?.countries ?? 0;
  els.countryStat.textContent = hasCountryData ? String(countryCount) : "—";
  els.countryStatLabel.textContent = hasCountryData
    ? countryCount === 1
      ? "country"
      : "countries"
    : "countries not in KML";

  if (journeyHasStates) {
    const stateCount = at?.states ?? 0;
    els.stateStat.textContent = String(stateCount);
    els.stateStatLabel.textContent = stateCount === 1 ? "state" : "states";
  }
  els.stateReadout.hidden = !journeyHasStates;
  els.countryStatCard.title =
    hasCountryData && at?.anyDerived
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

  bugPosition = position;
  bugMarkers.forEach((marker, index) => {
    marker.setLatLng([position[0], position[1] + worldOffsets[index]]);
  });
  showNearestBugCopy();
  updateCamera(segmentIndex, position);
}

function setProgress(value, options = {}) {
  if (!options.preserveLogWindow) {
    logWindowStart = null;
    cancelStopSelectionAnimation();
  }
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
    // `scroll: false` picks the pin over a full scroll rather than leaving the
    // scroller alone, so a caller that means to place the log itself opts out of
    // both. Two smooth scrolls issued back to back cancel each other and settle
    // between their targets, which is how opening a place landed its first cache
    // card under the sticky headers about half the time.
    if (options.scroll) scrollLogToStop(index);
    else if (options.pin !== false) pinLogToCurrentStop(index);
  }
}

// Duration grew linearly with stops but capped at a minute, so every journey over
// about fifty stops ran for exactly the same time — the 2,472-stop fixture raced
// past at 41 stops a second, which is why nothing on the map could settle. Square
// root keeps short journeys brisk while giving long ones room to be watched.
function playbackDuration() {
  return clamp(12000 + 2800 * Math.sqrt(journey.length), 12000, 150000);
}

// Playback renders every frame. A 30fps cap was tried on touch while the tap bug
// was still thought to be a performance problem; it was not, and the cap only
// cost smoothness. `pendingProgress` remains so that any future budget can be
// reintroduced without changing how progress accumulates.
const RENDER_INTERVAL_MS = 0;
let pendingProgress = null;
let lastRenderTime = 0;

function tick(time) {
  if (!state.playing) return;
  if (state.lastTime === null) state.lastTime = time;
  const delta = time - state.lastTime;
  state.lastTime = time;
  const unitsPerMillisecond = (maxProgress / playbackDuration()) * state.speed;
  const nextProgress = (pendingProgress ?? state.progress) + delta * unitsPerMillisecond;

  if (nextProgress >= maxProgress) {
    pendingProgress = null;
    setProgress(maxProgress, { force: true, scroll: true });
    pause();
    return;
  }

  if (time - lastRenderTime >= RENDER_INTERVAL_MS) {
    lastRenderTime = time;
    pendingProgress = null;
    setProgress(nextProgress);
  } else {
    pendingProgress = nextProgress;
  }
  state.frame = requestAnimationFrame(tick);
}

function play() {
  if (maxProgress <= 0) {
    showToast("This journey has only one mapped stop.");
    return;
  }
  if (state.progress >= maxProgress) setProgress(0, { force: true, pan: true });
  engageFollow({ snap: !followActive });
  returnLogHome();
  state.playing = true;
  syncSound();
  state.lastTime = null;
  pendingProgress = null;
  lastRenderTime = 0;
  els.playButton.classList.add("playing");
  els.mapStage.classList.add("playing");
  syncRoutePreview();
  els.playButton.setAttribute("aria-label", "Pause journey");
  // Playback drives the log, so the user does not also get to scroll it. An
  // attribute, never a node change — see the click-synthesis note in AGENTS.md.
  els.appShell.dataset.playing = "true";
  state.frame = requestAnimationFrame(tick);
}

function pause() {
  state.playing = false;
  pendingProgress = null;
  window.BugaboutBumblebee?.stop();
  state.lastTime = null;
  els.playButton.classList.remove("playing");
  els.mapStage.classList.remove("playing");
  syncRoutePreview();
  els.playButton.setAttribute("aria-label", "Play journey");
  delete els.appShell.dataset.playing;
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
  // Undated journeys get no end labels: "Start" and "Latest" only restated which
  // way a scrubber runs. Dated ones keep their years, which say something.
  els.timelineLabels.innerHTML = "";
}

// Clamped to two lines and opened in a dialog rather than expanded in place.
// Expanding inline pushed the map down the page, which is the space the
// fit-to-viewport layout exists to protect.
function renderDescription() {
  const full = (journeyMeta.description ?? "").replace(/\s+/g, " ").trim();
  els.journeyDescription.textContent = full;
  const wrap = els.descriptionWrap;
  // Measure without the button, which is absolutely positioned and so does not
  // contribute to scrollHeight, but does sit over the text it is testing.
  els.descriptionToggle.hidden = true;
  els.descriptionToggle.hidden = wrap.scrollHeight <= wrap.clientHeight + 2;
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
// Latitude converts to distance at a near-constant rate; longitude does not,
// which is why the tile headlines the north-south span rather than east-west.
const MILES_PER_LATITUDE_DEGREE = 69.09;
const FEET_PER_MILE = 5280;
// Deadpan units. No floor on either: a six-stop journey is still thousands of
// raccoons, which is the joke.
const RACCOON_FEET = 2.5;
// Jimothy is a real raccoon in Ballard, Seattle, with short spine syndrome: his
// limbs are ordinary but his spine is compressed, so he is round and neckless.
// No outlet has published a measurement, Wikipedia included, so 1.5 ft is an
// estimate — a touch over half a typical raccoon, which is what the condition
// looks like in photographs. Adjust freely; nothing else depends on it.
const JIMOTHY_FEET = 1.5;

function formatDegrees(value, positive, negative, decimals = 1) {
  return `${Math.abs(value).toFixed(decimals)}° ${value >= 0 ? positive : negative}`;
}

// One decimal collapses both ends of a short journey onto the same number:
// Brassica spans 0.003° and read "47.7° N" for its northernmost *and*
// southernmost stop.
function degreeDecimals(span) {
  return Math.abs(span) < 1 ? 3 : 1;
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

// The four extremes in N, S, E, W order, collapsed to one entry per country: a
// bug that stayed in one state is its own furthest point in every direction, and
// four identical flags read as a rendering fault.
function reachPlaces() {
  const far = journeyExtremes();
  const places = new Map();
  for (const index of [far.northAt, far.southAt, far.eastAt, far.westAt]) {
    const stop = journey[index];
    if (!stop) continue;
    const key = stop.country || stop.code;
    if (!places.has(key)) {
      places.set(key, {
        name: stop.country || "an unnamed place",
        flag: flagEmoji(stop.countryCode),
        states: [],
      });
    }
    // Grouped under the one flag rather than repeated per state: four extremes
    // in four states would otherwise print the US flag four times, which costs a
    // third of the row's height and reads worse than "US WA, CA, OR, ME".
    const place = places.get(key);
    if (stop.regionCode && !place.states.includes(stop.regionCode)) {
      place.states.push(stop.regionCode);
    }
  }
  // A single state distinguishes nothing — the flag already names the country
  // and the dialog gives the exact cache. Abbreviations earn their space only
  // when the extremes actually fall in different states.
  for (const place of places.values()) {
    if (place.states.length < 2) place.states = [];
    place.short = place.states.length ? `${place.states.join(", ")} (USA)` : place.name;
  }
  return [...places.values()];
}

// Falls back wholesale rather than per place, so the row never mixes a flag with
// a name when one country's code is missing.
const SEPARATOR = '<span class="reach-sep"> · </span>';

function reachValueHtml(places) {
  if (!places.length) return "";
  if (!flagsRender() || places.some((place) => !place.flag)) {
    return `<span class="reach-text">${escapeHtml(places.map((place) => place.short).join(" · "))}</span>`;
  }
  return places
    .map((place) => {
      const flag = `<span class="reach-flag" role="img" aria-label="${escapeHtml(place.name)}">${place.flag}</span>`;
      if (!place.states.length) return flag;
      return `${flag}<span class="reach-state">${escapeHtml(place.states.join(", "))}</span>`;
    })
    // Separators only once an entry carries state text, where the boundary
    // between "🇺🇸 WA, CA" and the next flag is otherwise ambiguous. In that
    // case they are free — the row is 95px either way — whereas a " · " chain
    // between bare flags wraps the common case from 87px to 95px for nothing.
    .join(places.some((place) => place.states.length) ? SEPARATOR : "");
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
  const reaches = reachPlaces();
  const comparisons = distanceComparisons(miles);
  const tiles = [
    {
      label: "Miles travelled",
      value: formatMiles(miles),
      // Short journeys clear no comparison floor, so there would be nothing to open.
      open: comparisons.length ? "distance" : null,
    },
    { label: "Countries", value: distinct(journey.map((stop) => stop.country)), open: "countries" },
    { label: "Continents", value: distinct(journey.map((stop) => stop.continent)), open: "continents" },
    {
      label: "Caches",
      value: uniqueCaches.toLocaleString("en-US"),
      // With no repeats the dialog would only restate the tile.
      open: revisits ? "caches" : null,
    },
    {
      label: "Longest hop",
      value: `${formatMiles(far.longest)} mi`,
      open: far.longestAt > 0 ? "hop" : null,
    },
    {
      label: "Typical hop",
      value: `${formatMiles(far.median)} mi`,
      open: journey.length > 2 ? "hops" : null,
    },
    {
      label: "Furthest reaches",
      value: reaches.map((place) => place.short).join(" · "),
      valueHtml: reachValueHtml(reaches),
      open: "reach",
    },
    {
      label: "Date line",
      value: far.dateLine,
      open: far.dateLine ? "dateline" : null,
    },
  ];
  if (states) tiles.splice(2, 0, { label: "US states", value: states, open: "states" });
  return tiles;
}

// Ways to feel a distance that a raw mileage figure does not convey. Each has a
// floor below which the comparison is more confusing than flattering.
function distanceComparisons(miles) {
  const laps = miles / EQUATOR_MILES;
  return [
    {
      name: "Around the world",
      value: laps >= 1 ? `${laps.toFixed(1)}×` : `${Math.round(laps * 100)}%`,
      sub: "the equator, 24,901 miles",
      min: MIN_LAP_NOTE_MILES,
    },
    {
      name: "Toward the Moon",
      value: `${(miles / MOON_MILES * 100).toFixed(0)}%`,
      sub: "of a one-way trip, 238,900 miles",
      min: MIN_MOON_MILES,
    },
    {
      name: "In marathons",
      value: Math.round(miles / MARATHON_MILES).toLocaleString("en-US"),
      sub: "26.2 miles each",
      min: MIN_MARATHON_MILES,
    },
    {
      name: "Coast to coast",
      value: `${(miles / COAST_TO_COAST_MILES).toFixed(0)}×`,
      sub: "Los Angeles to New York, 2,790 miles",
      min: COAST_TO_COAST_MILES,
    },
    {
      name: "In standard raccoons",
      value: Math.round((miles * FEET_PER_MILE) / RACCOON_FEET).toLocaleString("en-US"),
      sub: "laid nose to tail, two and a half feet apiece",
      min: 0,
    },
    {
      name: "In Jimothys",
      value: Math.round((miles * FEET_PER_MILE) / JIMOTHY_FEET).toLocaleString("en-US"),
      sub: "Seattle’s beloved short-spined raccoon, about a foot and a half",
      min: 0,
    },
  ].filter((row) => miles >= row.min);
}

function stopCodeHtml(stop) {
  return stop.cacheUrl
    ? `<a href="${escapeHtml(stop.cacheUrl)}" target="_blank" rel="noreferrer">${escapeHtml(stop.code)}</a>`
    : escapeHtml(stop.code);
}

function stopReferenceHtml(index) {
  const stop = journey[index];
  if (!stop) return "";
  const where = [stop.region, stop.country].filter(Boolean).join(", ");
  const code = stopCodeHtml(stop);
  if (!where) return code;
  // Skipped where flags do not render, since the country is already spelled out
  // beside it and the fallback would read "FI Finland".
  const flag = flagsRender() ? flagEmoji(stop.countryCode) : "";
  const mark = flag ? `<span class="place-flag" aria-hidden="true">${flag}</span>` : "";
  return `${code} · ${mark}${escapeHtml(where)}`;
}

function renderJourneyStats() {
  els.journeyStats.innerHTML = journeyTotals()
    .filter((tile) => tile.value !== 0 && tile.value !== "0")
    .map((tile) => {
      const detail = tile.note ? `<small>${escapeHtml(tile.note)}</small>` : "";
      const interactive = tile.open
        ? ` data-open="${tile.open}" role="button" tabindex="0"`
        : "";
      return `
        <div${interactive}>
          <dt>${escapeHtml(tile.label)}</dt>
          <dd>${tile.valueHtml ?? escapeHtml(String(tile.value))}${detail}</dd>
        </div>
      `;
    })
    .join("");
}

// A 1px tolerance: fractional scroll positions never settle exactly on the end.
function updateStatsScroll() {
  const row = els.journeyStats;
  const remaining = row.scrollWidth - row.clientWidth - row.scrollLeft;
  els.statsScroller.dataset.back = String(row.scrollLeft > 1);
  els.statsScroller.dataset.next = String(remaining > 1);
}

function nudgeStats(direction) {
  const row = els.journeyStats;
  row.scrollBy({
    left: direction * Math.max(140, Math.round(row.clientWidth * 0.8)),
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
  });
}

els.journeyStats.addEventListener("scroll", updateStatsScroll, { passive: true });
els.statsNudgeBack.addEventListener("click", () => nudgeStats(-1));
els.statsNudgeNext.addEventListener("click", () => nudgeStats(1));
// Catches width changes the window resize event does not, such as the sidebar
// column changing at a breakpoint.
new ResizeObserver(updateStatsScroll).observe(els.journeyStats);

function renderJourneyHeader() {
  // Imports are the only way to load a bug, so the pill would say nothing. The
  // sample is different: it is fictional and has to stay visibly labeled.
  els.statusPill.hidden = journeyMeta.source !== "sample";
  els.statusPill.innerHTML = "<i></i> Sample journey";
  els.statusPill.title = "Fictional demonstration data";
  els.journeyTitleText.textContent = journeyMeta.title;
  renderDescription();
  renderJourneyStats();
  els.journeyStats.scrollLeft = 0;
  updateStatsScroll();
  refreshShareLink();
  els.stopCount.textContent = `${journey.length.toLocaleString("en-US")} stops`;
}

// "another" once a bug is open: it is accurate, and it signals that opening a
// file replaces the journey on screen rather than adding to it.
const OPEN_KML_LABELS = {
  empty: "Open your bug\u2019s KML",
  journey: "Open another bug\u2019s KML",
};

// One set of buttons, relocated rather than duplicated, so their ids stay unique
// and every listener attached to them survives the move.
function setAppState(state) {
  // Whatever was inbound has landed — or failed and fallen back here.
  delete document.documentElement.dataset.booting;
  els.appShell.dataset.state = state;
  const slot = state === "empty" ? els.emptyActions : els.headerActions;
  if (els.introActions.parentElement !== slot) slot.append(els.introActions);
  const label = OPEN_KML_LABELS[state];
  els.openKmlLabel.textContent = label;
  // The label is display:none in the mobile header, so the accessible name has
  // to be kept in step separately.
  els.openKmlButton.setAttribute("aria-label", label);
}

// Swapping one journey for another rewrites the heading, stats, log and map in a
// single task, and the heading's height changes with the description — Brassica
// for Captain Cookie moves the map down 60px. Starting the card at zero opacity
// in that same task means the browser never paints the old content or the jump:
// the first frame drawn is the new journey, already settled, fading up.
function replayJourneyEntrance() {
  const card = els.journeyWorkspace;
  card.classList.remove("journey-entering");
  void card.offsetWidth;
  card.classList.add("journey-entering");
}

function loadJourneyData(data) {
  pause();
  servedBugSlug = "";
  cancelMapLayoutTransition();
  // Only for a swap. Arriving from the empty state already cross-fades.
  const replacingAJourney = els.appShell.dataset.state === "journey";
  journeyMeta = { ...data.meta };
  journey = data.stops.map(normalizeStop).filter((stop) =>
    Number.isFinite(stop.lat) && Number.isFinite(stop.lng),
  );
  if (!journey.length) throw new Error("No valid mapped stops were found.");

  setAppState("journey");
  if (replacingAJourney) replayJourneyEntrance();
  maxProgress = Math.max(0, (journey.length - 1) * 100);
  state.progress = 0;
  state.currentIndex = -1;
  state.activeBand = -1;
  journeyHasStates = journey.some((stop) => stop.country === "United States" && stop.region);
  buildStatsPrefix();
  buildPlaceTree();
  state.logSignature = "";
  logExpandBefore = 0;
  logExpandAfter = 0;
  logWindowStart = null;
  followActive = false;
  // Every journey starts in Follow bug; updateCameraControls turns it off again
  // for a route small enough to need no camera. Without this reset, loading a
  // small journey left followEnabled false and the next journey opened on Whole
  // route with no indication why.
  setFollowEnabled(true);
  camera = null;
  appliedCamera = null;
  cameraView = null;
  expandedCountry = null;
  expandedState = null;
  state.speed = 1;
  renderSpeedControl();
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
        // Natural Earth stores admin-1 as "US-WA"; the postal half is what a
        // 125px tile has room for.
        stop.regionCode = match.iso?.startsWith("US-") ? match.iso.slice(3) : "";
        return true;
      });
      if (resolved === null) return;
      statesChanged = resolved;
      if (statesChanged) journeyHasStates = true;
    }
  }

  if (!countriesChanged && !statesChanged) return;
  buildStatsPrefix();
  buildPlaceTree();
  renderStopCount();
  renderJourneyStats();
  buildStopList(state.currentIndex, true);
  setProgress(state.progress, {
    force: true,
    preserveLogWindow: logWindowStart !== null,
  });
}

// Places reached up to the current stop, in the order the bug first arrived —
// the same basis as the readout the list is opened from.
function visitedPlaces(kind, index, order = "count") {
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
      codes: new Set(),
    };
    entry.codes.add(stop.code);
    seen.set(name, entry);
  }
  // Distinct caches rather than stops: a cache visited three times is one cache,
  // a line the Caches dialog already draws between "Different caches" and
  // "Mapped stops".
  const places = [...seen.values()].map(({ name, flag, codes }) => ({
    name,
    flag,
    count: codes.size,
  }));
  // A Map keeps insertion order, and this walked the journey in order, so the
  // list is already chronological. Sorting is stable, so places tied on count
  // stay in the order the bug reached them.
  return order === "count" ? places.sort((a, b) => b.count - a.count) : places;
}

const PLACE_NOUNS = {
  countries: ["country", "countries"],
  states: ["state", "states"],
  continents: ["continent", "continents"],
};

// Rows carry either `sub` (plain text, escaped here) or `subHtml` (already-built
// markup such as a linked cache reference), never both.
// Prose rather than rows: same dialog, same scroller, same fades.
function openTextDetail(eyebrow, title, text) {
  els.placesEyebrow.textContent = eyebrow;
  els.placesTitle.textContent = title;
  els.placesList.innerHTML = "";
  els.placesList.hidden = true;
  els.placesText.hidden = false;
  els.placesText.textContent = text;
  els.placesText.scrollTop = 0;
  els.placesDialog.showModal();
  fitPlacesDialogBody();
  updatePlacesScroll();
}

function openDetail(eyebrow, title, rows, { emoji } = {}) {
  els.placesText.hidden = true;
  els.placesList.hidden = false;
  els.placesEyebrow.textContent = eyebrow;
  els.placesTitle.textContent = title;
  // Decorative, and hidden from screen readers: the title already names the
  // creature, so announcing it twice is noise. Built as a node rather than
  // markup, which keeps this off innerHTML entirely.
  if (emoji) {
    const mark = document.createElement("span");
    mark.className = "title-emoji";
    mark.setAttribute("aria-hidden", "true");
    mark.textContent = emoji;
    els.placesTitle.append(mark);
  }
  els.placesList.innerHTML = rows
    .map((row) => {
      const detail = row.subHtml ?? (row.sub ? escapeHtml(row.sub) : "");
      const flag = row.flag ? `<span class="place-flag" aria-hidden="true">${row.flag}</span>` : "";
      return `
        <li>
          <span class="places-name">${flag}${escapeHtml(row.name)}${detail ? `<small>${detail}</small>` : ""}</span>
          <span class="places-count">${row.valueHtml ?? escapeHtml(row.value)}</span>
        </li>
      `;
    })
    .join("");
  els.placesList.scrollTop = 0;
  els.placesDialog.showModal();
  // After showModal, not before: a closed dialog is display:none, so every
  // measurement reads 0 and the list looks like it does not scroll.
  fitPlacesDialogBody();
  updatePlacesScroll();
}

// The stats bar asks "where has this bug been the most", so it ranks by caches.
// The player card's readouts are a running tally of a journey in progress, so
// they read in the order the bug actually reached each place.
function openPlaces(kind, { index = state.currentIndex, order = "count" } = {}) {
  const places = visitedPlaces(kind, index, order);
  const [noun, plural] = PLACE_NOUNS[kind] ?? PLACE_NOUNS.countries;
  const whole = index >= journey.length - 1;
  openDetail(
    order === "count" ? "Most caches first" : "In the order reached",
    `${places.length.toLocaleString("en-US")} ${places.length === 1 ? noun : plural}${whole ? "" : " so far"}`,
    places.map((place) => ({
      name: place.name,
      flag: place.flag,
      value: place.count.toLocaleString("en-US"),
    })),
  );
}

function openDistance() {
  const miles = journeyMeta.totalMiles ?? (cumulativeMiles.at(-1) ?? 0) * distanceScale;
  const comparisons = distanceComparisons(miles);
  // A short journey can clear only one floor, so the count decides the wording.
  openDetail(
    comparisons.length === 1 ? "Another way to picture it" : "Other ways to picture it",
    `${formatMiles(miles)} miles`,
    comparisons,
  );
}

// The median hop characterises a bug better than the number does, and the bands
// are log-scaled on geography rather than on round numbers: a doorstep, a town,
// a region, a country, a continent. Real medians for scale — Brassica 0.17 mi,
// Captain Cookie 0.69 mi, Benny 555 mi — so the bottom band is where most bugs
// live, since a trackable is usually walked from one cache to the next.
const HOP_BANDS = [
  // Forages a mile or two from the hive and comes home every time.
  { name: "Hops like a honeybee", emoji: "🐝", fits: (median, mean) => mean < 5 },
  // Local almost always, with the occasional long migration.
  { name: "Hops like a ladybug", emoji: "🐞", fits: (median) => median < 10 },
  // Crosses a continent in stages, hundreds of miles at a time.
  { name: "Hops like a painted lady", emoji: "🦋", fits: (median) => median < 500 },
  // Canada to Mexico, up to 3,000 miles, in a single generation.
  { name: "Hops like a monarch", emoji: "🦋", fits: () => true },
];

// Both numbers, not just the median. The median alone is a poor discriminator —
// nearly every trackable is walked from one cache to the next, so almost all of
// them sit under a mile. What separates bugs is the gap between typical and
// average (Brassica 0.17/0.4, Captain Cookie 0.7/75, Benny 555/1,117), which is
// the same story the Average hop row already tells.
const hopBand = (median, mean) => HOP_BANDS.find((band) => band.fits(median, mean));

const HEMISPHERE_NAMES = { N: "northern", S: "southern", E: "eastern", W: "western" };

// Where it got is the answer; the reading and the cache are how you would check
// it. So the place takes the right-hand column and the degrees drop down beside
// the cache code, rather than a column of bare numbers with the names buried.
function reachRow(name, index, degrees) {
  const stop = journey[index];
  // "Washington, United States" is twice the length of the other three and this
  // column sizes to its longest row, so US stops take the postal abbreviation.
  // The cache link underneath still resolves the exact spot.
  const where = !stop
    ? ""
    : stop.regionCode
      ? `${stop.regionCode}, USA`
      : [stop.region, stop.country].filter(Boolean).join(", ");
  const flag = where && flagsRender() ? flagEmoji(stop.countryCode) : "";
  const mark = flag ? `<span class="place-flag" aria-hidden="true">${flag}</span>` : "";
  const reference = stop ? stopCodeHtml(stop) : "";
  return {
    name,
    // A stop with no country still has a reading to show, so it keeps the number.
    valueHtml: where ? `${mark}${escapeHtml(where)}` : escapeHtml(degrees),
    subHtml: where ? [reference, escapeHtml(degrees)].filter(Boolean).join(" · ") : reference,
  };
}

function openReach() {
  const far = journeyExtremes();
  const lat = degreeDecimals(far.north - far.south);
  const lng = degreeDecimals(far.east - far.west);
  const hemispheres = far.hemispheres;
  const rows = [
    reachRow("Furthest north", far.northAt, formatDegrees(far.north, "N", "S", lat)),
    reachRow("Furthest south", far.southAt, formatDegrees(far.south, "N", "S", lat)),
    reachRow("Furthest east", far.eastAt, formatDegrees(far.east, "E", "W", lng)),
    reachRow("Furthest west", far.westAt, formatDegrees(far.west, "E", "W", lng)),
  ];
  if (hemispheres.length) {
    rows.push({
      name: "Hemispheres reached",
      value: hemispheres.join(" · "),
      sub: `${listPhrase(hemispheres.map((letter) => HEMISPHERE_NAMES[letter]))}`,
    });
  }
  openDetail("How far it got in each direction", "Furthest reaches", rows);
}

function listPhrase(items) {
  if (items.length < 2) return items[0] ?? "";
  return `${items.slice(0, -1).join(", ")} and ${items.at(-1)}`;
}

function openHop() {
  const far = journeyExtremes();
  const to = far.longestAt;
  const stopLabel = (index) => `Stop ${(index + 1).toLocaleString("en-US")}`;
  openDetail("The longest single move", `${formatMiles(far.longest)} mi`, [
    { name: "From", value: stopLabel(to - 1), subHtml: stopReferenceHtml(to - 1) },
    { name: "To", value: stopLabel(to), subHtml: stopReferenceHtml(to) },
  ]);
}

// Sub-mile hops round to "0.0 mi", which reads as no distance at all.
function formatShortDistance(miles) {
  if (miles < 0.1) return `${Math.round(miles * 5280).toLocaleString("en-US")} ft`;
  return `${formatMiles(miles)} mi`;
}

function hopDistances() {
  const hops = [];
  for (let i = 1; i < journey.length; i += 1) {
    hops.push(haversineMiles(journey[i - 1], journey[i]) * distanceScale);
  }
  return hops;
}

function openCaches() {
  const counts = new Map();
  for (const stop of journey) counts.set(stop.code, (counts.get(stop.code) ?? 0) + 1);
  const repeats = [...counts.entries()].filter(([, times]) => times > 1).sort((a, b) => b[1] - a[1]);
  const returns = journey.length - counts.size;
  // No "different caches" row: that figure is already the dialog's title and the
  // tile that opened it. Return visits are not their own row either — they are
  // exactly stops minus caches, and they belong to the row they explain.
  const rows = [
    {
      name: "Mapped stops",
      value: journey.length.toLocaleString("en-US"),
      sub: "every visit, repeats included",
    },
    {
      name: "Caches with repeat visits",
      value: repeats.length.toLocaleString("en-US"),
      sub: `${returns.toLocaleString("en-US")} return ${returns === 1 ? "visit" : "visits"}${
        repeats.length > 1 ? " between them" : ""
      }`,
    },
  ];
  if (repeats.length) {
    const [code, times] = repeats[0];
    rows.push({
      name: "Most returned to",
      value: `${times} visits`,
      subHtml: stopReferenceHtml(journey.findIndex((stop) => stop.code === code)),
    });
  }
  openDetail("Where it was dropped", `${counts.size.toLocaleString("en-US")} caches`, rows);
}

function openHops() {
  const hops = hopDistances();
  if (!hops.length) return;
  const sorted = [...hops].sort((a, b) => a - b);
  const median = sorted[sorted.length >> 1];
  const mean = hops.reduce((total, hop) => total + hop, 0) / hops.length;
  const count = (test) => hops.filter(test).length;
  // Tracked by index rather than plucked from the sorted copy, so the row can
  // name the two caches it ran between. hops[k] is journey[k] → journey[k + 1].
  // Moves that begin and end at the same cache are skipped: the trackable was
  // logged there twice and the few feet between them are GPS drift, not travel.
  // The large fixture's true shortest was 42 ft of exactly that.
  let shortestAt = -1;
  hops.forEach((hop, k) => {
    if (hop <= 0 || journey[k].code === journey[k + 1].code) return;
    if (shortestAt === -1 || hop < hops[shortestAt]) shortestAt = k;
  });
  const rows = [
    { name: "Typical hop", value: `${formatMiles(median)} mi`, sub: "half of them were shorter" },
    {
      name: "Average hop",
      value: `${formatMiles(mean)} mi`,
      // The gap between the two is the story: local shuffling, rare long flights.
      // Needs an absolute floor as well as the ratio — Brassica's 0.3 mi average
      // is twice its median and involves no flight of any kind.
      sub: mean > median * 2 && mean > 25 ? "pulled up by a few long flights" : null,
    },
    {
      name: "Shortest hop",
      value: formatShortDistance(shortestAt === -1 ? 0 : hops[shortestAt]),
      subHtml:
        shortestAt === -1
          ? undefined
          : `${stopReferenceHtml(shortestAt)} → ${stopReferenceHtml(shortestAt + 1)}`,
    },
    { name: "Under a mile", value: count((hop) => hop < 1).toLocaleString("en-US") },
  ];
  for (const threshold of [100, 1000]) {
    const far = count((hop) => hop > threshold);
    if (far) {
      rows.push({
        name: `Over ${threshold.toLocaleString("en-US")} miles`,
        value: far.toLocaleString("en-US"),
      });
    }
  }
  const band = hopBand(median, mean);
  openDetail("Hop analysis", band.name, rows, { emoji: band.emoji });
}

function openDateLine() {
  const rows = [];
  for (let i = 1; i < journey.length; i += 1) {
    if (Math.abs(journey[i].lng - journey[i - 1].lng) <= 180) continue;
    rows.push({
      name: `Crossing ${rows.length + 1}`,
      value: `Stop ${(i + 1).toLocaleString("en-US")}`,
      subHtml: `${stopReferenceHtml(i - 1)} → ${stopReferenceHtml(i)}`,
    });
  }
  openDetail(
    "Where it crossed the antimeridian",
    `${rows.length} ${rows.length === 1 ? "crossing" : "crossings"}`,
    rows,
  );
}

function openStatDetail(kind) {
  if (kind === "distance") return openDistance();
  if (kind === "reach") return openReach();
  if (kind === "hop") return openHop();
  if (kind === "caches") return openCaches();
  if (kind === "hops") return openHops();
  if (kind === "dateline") return openDateLine();
  return openPlaces(kind, { index: journey.length - 1 });
}

let shareLink = null;
let shareBlockedReason = "";
let shareToken = 0;
// Set only while a dedicated bug page is showing its own bug. Opening any other
// KML on that page clears it, so the share button never hands out this URL for a
// journey it does not actually serve.
let servedBugSlug = "";

// The button stays clickable while sharing is unavailable: a `disabled` button
// fires no click at all, and the reason belongs in the toast rather than a hover
// tooltip that no touch user can reach.
function setShareState(link, reason) {
  shareLink = link;
  shareBlockedReason = reason;
  els.shareButton.setAttribute("aria-disabled", link ? "false" : "true");
  els.shareButton.setAttribute(
    "aria-label",
    link ? "Copy a link to this journey" : "This journey cannot be shared as a link",
  );
}

// Prepared when a journey loads, so the button can say up front whether sharing
// is possible instead of failing on click.
async function refreshShareLink() {
  const token = (shareToken += 1);
  setShareState(null, "This bug’s link is still being prepared. Try again in a moment.");

  // A bug served at its own URL is already the shareable thing. The page itself
  // is the link, so there is nothing to pack into a fragment — and for the bugs
  // big enough to deserve a page, nothing that would fit.
  if (servedBugSlug) {
    setShareState(`${location.origin}/${servedBugSlug}/`, "");
    return;
  }

  const link = await window.BugaboutLink?.encode(journey, journeyMeta);
  if (token !== shareToken) return;

  setShareState(
    link ?? null,
    `Sharing only works for bugs with up to about ${SHARE_STOP_GUIDE} stops. This bug has ${journey.length.toLocaleString("en-US")} stops.`,
  );
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
    loadJourneyData(parsed);
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
  setProgress(event.target.value, { force: true, pan: true });
  returnLogHome();
});

els.speedButton.addEventListener("click", () => {
  const speeds = [1, 2, 4];
  state.speed = speeds[(speeds.indexOf(state.speed) + 1) % speeds.length];
  renderSpeedControl();
  syncSound();
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
    const index = Number(stopItem.dataset.stop);
    const topBefore = stopItem.getBoundingClientRect().top;
    pause();
    engageFollow();
    pinCurrentLogWindow();
    prepareStopSelectionAnimation();
    setProgress(index * 100, {
      force: true,
      pan: true,
      preserveLogWindow: true,
      scroll: false,
    });
    animateStopSelection(index, topBefore);
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
      // scrollPlaceToRest below owns where the log lands.
      setProgress(indexes[0] * 100, { force: true, pan: true, scroll: false, pin: false });
    }
  }
  rebuildLogWithTransition(() => {}, { anchor: false });

  // Opening a place should leave you looking at it. Collapsing whatever was open
  // above can move it hundreds of pixels while the scroller stays where it was,
  // so clicking a sibling of a large open group landed you somewhere unrelated
  // to what you clicked. Re-found by name: the rebuild replaced the element.
  if (!wasOpen) {
    scrollPlaceToRest(
      [...els.stopList.querySelectorAll(".place-item")].find((item) =>
        isCountry ? item.dataset.country === name : item.dataset.state === name,
      ),
    );
  }
});

els.logByTime.addEventListener("click", () => setLogMode("time"));
els.logByPlace.addEventListener("click", () => setLogMode("place"));

els.fitButton.addEventListener("click", () => {
  // Re-fits even when already selected, since the map may have been panned since.
  // transitionMapLayout measures before and after, so a re-fit that changes no
  // geometry skips the animation and simply re-frames.
  transitionToWholeRoute();
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
  transitionToFollow();
});

els.descriptionToggle.addEventListener("click", () => {
  openTextDetail(
    "From the trackable page",
    journeyMeta.title,
    (journeyMeta.description ?? "").replace(/\s+/g, " ").trim(),
  );
});

els.openKmlButton.addEventListener("click", () => els.kmlInput.click());
els.kmlInput.addEventListener("change", (event) => importKmlFile(event.target.files?.[0]));

els.shareButton.addEventListener("click", async () => {
  const link = shareLink;
  if (!link) {
    showToast(shareBlockedReason, 5200);
    return;
  }

  // Put the link in the address bar too, so what was copied and what the user is
  // looking at are the same thing. A served bug page is already at that URL.
  if (!servedBugSlug) window.BugaboutLink.adopt(link);

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
    showToast(
      servedBugSlug
        ? `Link copied. It opens ${journeyMeta.title} right here.`
        : "Route link copied. Anyone with it can replay this journey.",
      4200,
    );
  } catch {
    showToast("Bugabout could not copy the link.");
  }
});

els.journeyStats.addEventListener("click", (event) => {
  const tile = event.target.closest("[data-open]");
  if (tile) openStatDetail(tile.dataset.open);
});

els.journeyStats.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  const tile = event.target.closest("[data-open]");
  if (!tile) return;
  event.preventDefault();
  openStatDetail(tile.dataset.open);
});

els.countryStatCard.addEventListener("click", () => openPlaces("countries", { order: "first" }));
els.stateReadout.addEventListener("click", () => openPlaces("states", { order: "first" }));
// A 1px tolerance: fractional scroll positions never settle exactly on an end.
function dialogBody() {
  return els.placesText.hidden ? els.placesList : els.placesText;
}

// A list that misses the CSS cap by only a few pixels creates a prominent
// scrollbar that barely moves. Absorb that tiny remainder when the modal has
// room, while leaving genuinely longer lists constrained and scrollable.
const PLACES_MICRO_OVERFLOW = 24;

function fitPlacesDialogBody() {
  els.placesList.style.removeProperty("max-height");
  els.placesText.style.removeProperty("max-height");

  const body = dialogBody();
  const overflow = body.scrollHeight - body.clientHeight;
  if (overflow <= 1 || overflow > PLACES_MICRO_OVERFLOW) return;

  const dialogHeight = els.placesDialog.getBoundingClientRect().height;
  const viewportRoom = window.innerHeight - dialogHeight - 34;
  if (viewportRoom < overflow + 1) return;

  body.style.maxHeight = `${Math.ceil(body.clientHeight + overflow + 1)}px`;
}

function updatePlacesScroll() {
  const body = dialogBody();
  const remaining = body.scrollHeight - body.clientHeight - body.scrollTop;
  els.placesScroller.dataset.top = String(body.scrollTop > 1);
  els.placesScroller.dataset.bottom = String(remaining > 1);
}

els.placesList.addEventListener("scroll", updatePlacesScroll, { passive: true });
els.placesText.addEventListener("scroll", updatePlacesScroll, { passive: true });

// The body's height is capped against the viewport, so anything that resizes the
// viewport changes whether there is more to scroll to. In an in-app browser that
// happens mid-read, when the chrome collapses — the fade would otherwise keep
// whatever answer was true at the moment the dialog opened.
window.addEventListener("resize", () => {
  if (els.placesDialog.open) updatePlacesScroll();
});
window.addEventListener(
  "resize",
  () => {
    if (!els.placesDialog.open) return;
    fitPlacesDialogBody();
    updatePlacesScroll();
  },
  { passive: true },
);
els.closePlacesButton.addEventListener("click", () => els.placesDialog.close());
els.placesDialog.addEventListener("click", (event) => {
  if (event.target === els.placesDialog) els.placesDialog.close();
});

els.aboutButton.addEventListener("click", () => els.aboutDialog.showModal());
els.closeAboutButton.addEventListener("click", () => els.aboutDialog.close());
els.aboutDialog.addEventListener("click", (event) => {
  if (event.target === els.aboutDialog) els.aboutDialog.close();
});

els.productAboutButton.addEventListener("click", () => els.productDialog.showModal());
els.closeProductDialogButton.addEventListener("click", () => els.productDialog.close());
els.productDialog.addEventListener("click", (event) => {
  if (event.target === els.productDialog) els.productDialog.close();
});
els.productKmlHelpButton.addEventListener("click", () => {
  els.productDialog.close();
  els.aboutDialog.showModal();
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

// TEMPORARY: design style picker. Remove with the theme blocks in styles.css.
const STYLE_KEY = "bugabout-style";

function applyStyle(name) {
  document.documentElement.dataset.style = name;
  els.stylePicker.value = name;
  try {
    window.localStorage.setItem(STYLE_KEY, name);
  } catch {
    /* private mode; the choice just will not survive a reload */
  }
  // The ramp lives in CSS, so re-read it and repaint the bands that used it.
  publishRouteRamp();
  if (journey.length) {
    buildMapJourney();
    setProgress(state.progress, { force: true });
  }
}

els.stylePicker.value = document.documentElement.dataset.style || "notebook";
els.stylePicker.addEventListener("change", (event) => applyStyle(event.target.value));

// TEMPORARY: build marker plus a tap counter, while By place playback is broken
// on iOS. The build is read from the asset URLs rather than hardcoded, so a
// stale cached index.html reports its own old numbers instead of claiming to be
// current. The counters answer the question a desktop cannot:
//
//   d: pointerdown   u: pointerup   c: click
//
// If d climbs while c does not, the click is being suppressed rather than the
// handler failing. The trailing history is per gesture on a control:
//   ✓ ended in a click   ✗ pointerup with no click   X cancelled
// with the page scroll during it, and ≠ when pointerup landed on a different
// element than pointerdown — which is the click-synthesis signature.
(function showBuildMarker() {
  const marker = document.querySelector("#buildMarker");
  if (!marker) return;
  const versionOf = (url) => new URL(url, location.href).searchParams.get("v") ?? "?";
  const script = [...document.scripts].find((tag) => tag.src.includes("app.js"));
  const sheet = [...document.styleSheets]
    .map((entry) => entry.href)
    .find((href) => href?.includes("styles.css"));
  const build = `${versionOf(script?.src ?? "")}.${versionOf(sheet ?? "")}`;

  const counts = { d: 0, u: 0, c: 0, x: 0 };
  let why = "";
  let down = null;

  let frames = 0;
  let fps = 0;
  let fpsSince = performance.now();
  const countFrame = (now) => {
    frames += 1;
    if (now - fpsSince >= 500) {
      fps = Math.round((frames * 1000) / (now - fpsSince));
      frames = 0;
      fpsSince = now;
    }
    requestAnimationFrame(countFrame);
  };
  requestAnimationFrame(countFrame);

  // Only gestures that began on a control can produce a click, so the aggregate
  // d/c ratio was diluted by every map drag. `ctrl` counts those alone.
  const ctrl = { ok: 0, no: 0 };
  const paint = () => {
    const off = document.documentElement.dataset.off;
    // Whether the current stop even has a row to pin — the failing condition
    // only exists when it does, which is why the bug must be inside the open
    // place when the screen is read.
    const pinned = els.stopList.querySelector(`[data-stop="${state.currentIndex}"]`)
      ? "in-list"
      : "no-row";
    marker.textContent =
      `${build} · ${fps}fps · ctrl ${ctrl.ok}✓ ${ctrl.no}✗ · ${logMode} ${pinned}` +
      `${state.playing ? " ▶" : ""}${off ? ` · off:${off.replace(/ /g, ",")}` : ""}` +
      `${why ? ` · ${why}` : ""}`;
  };

  const onAControl = (node) =>
    node instanceof Element && Boolean(node.closest("button, a, [data-open]"));

  const history = [];
  const remember = (token) => {
    history.push(token);
    if (history.length > 6) history.shift();
    why = history.join(" ");
  };

  // ✓/✗ then: L or n for whether the stop had a row, sN for log scroll under the
  // finger, pN for page scroll, ≠ for pointerup on a different element. Every
  // hypothesis left is about one of those, so each gesture answers for itself.
  const verdict = (ok, event) => {
    const logDy = Math.round(els.stopList.scrollTop - down.listTop);
    const pageDy = Math.round(window.scrollY - down.y);
    return (
      `${ok ? "✓" : "✗"}${down.inList ? "L" : "n"}` +
      `${logDy ? `s${logDy}` : ""}${pageDy ? `p${pageDy}` : ""}` +
      `${event && event.target !== down.target ? "≠" : ""}`
    );
  };

  window.addEventListener(
    "pointerdown",
    (event) => {
      counts.d += 1;
      // Recorded at the moment the finger lands, because the condition changes
      // under it: reading "in-list" off the marker afterwards said where the bug
      // was when the screen was photographed, not when the tap was made.
      down = {
        target: event.target,
        y: window.scrollY,
        listTop: els.stopList.scrollTop,
        inList: Boolean(els.stopList.querySelector(`[data-stop="${state.currentIndex}"]`)),
        onControl: onAControl(event.target),
      };
      paint();
    },
    { capture: true, passive: true },
  );

  window.addEventListener(
    "pointerup",
    (event) => {
      counts.u += 1;
      if (down?.onControl) {
        const token = verdict(false, event);
        // A click follows pointerup, so the verdict waits to see whether it does.
        down.settled = window.setTimeout(() => {
          ctrl.no += 1;
          remember(token);
          paint();
        }, 350);
      }
      paint();
    },
    { capture: true, passive: true },
  );

  window.addEventListener(
    "pointercancel",
    () => {
      counts.x += 1;
      if (down?.onControl) remember("X");
      paint();
    },
    { capture: true, passive: true },
  );

  window.addEventListener(
    "click",
    () => {
      counts.c += 1;
      if (down?.settled) {
        window.clearTimeout(down.settled);
        ctrl.ok += 1;
        remember(verdict(true, null));
      }
      paint();
    },
    { capture: true, passive: true },
  );

  paint();
  window.setInterval(paint, 500);
})();

publishRouteRamp();
initializeMap();

// The default journey is a real public trackable rather than the fictional
// sample, so a first visit shows what an actual bug's travels look like.
// Root-absolute, because the same script also runs from /<slug>/ where a "./"
// path would resolve inside that directory.
const DEFAULT_JOURNEY = { slug: "TBA5TD9" };

const fixtureFor = (slug) => ({ url: `/fixtures/${slug}.kml`, fileName: `${slug}.kml` });

async function loadFixtureJourney(slug) {
  try {
    const { url, fileName } = fixtureFor(slug);
    const response = await fetch(url);
    if (!response.ok) throw new Error(String(response.status));
    loadJourneyData(window.BugaboutKml.parse(await response.text(), { fileName }));
    return true;
  } catch {
    return false;
  }
}

async function loadDefaultJourney() {
  // Falls back to the fictional sample, which needs no network at all.
  if (!(await loadFixtureJourney(DEFAULT_JOURNEY.slug))) loadJourneyData(sampleData);
}

// Bugabout opens empty and waits for a file. Loading someone else's bug on
// arrival made the first screen look like the product was about that bug.
// Set false to boot straight into DEFAULT_JOURNEY instead, which is useful when
// working on the journey view itself.
const START_EMPTY = true;

async function bootstrap() {
  const shared = await window.BugaboutLink?.decode();
  if (shared) {
    try {
      loadJourneyData(shared);
      return;
    } catch {
      showToast("That shared link could not be opened.");
    }
  } else if (window.BugaboutLink?.hasFragment()) {
    showToast("That shared link could not be opened.");
  }
  // A dedicated bug page (/TBA5TD9/) sets this, and opens on that journey rather
  // than the empty state — the URL is the request, so there is nothing to ask.
  // Generated by tools/build-bug-pages.mjs; only ever a public TB reference.
  const page = typeof window.BUGABOUT_BUG === "string" ? window.BUGABOUT_BUG : "";
  if (/^TB[0-9A-Z]{1,12}$/.test(page) && (await loadFixtureJourney(page))) {
    // After the load, which clears it, and before the share link is rebuilt.
    servedBugSlug = page;
    refreshShareLink();
    return;
  }

  if (START_EMPTY) {
    setAppState("empty");
    return;
  }
  await loadDefaultJourney();
}

bootstrap();
