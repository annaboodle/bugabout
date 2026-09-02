(function exposeJourneyLink(global) {
  "use strict";

  // Everything a shared journey needs travels inside the URL fragment, so nothing
  // is stored anywhere and nothing reaches a server — the link is the data.
  const FRAGMENT_KEY = "j";
  const FORMAT_VERSION = 1;

  // Messaging apps, mail clients and QR codes start mangling links past roughly
  // this length, so a link we cannot keep under it is not worth handing over.
  const MAX_URL_LENGTH = 2000;

  // ~11 m. Finer precision costs bytes without changing a route anyone can see.
  const COORDINATE_SCALE = 1e4;

  const supported = () =>
    typeof CompressionStream === "function" && typeof DecompressionStream === "function";

  function writeVarint(bytes, value) {
    let zigzag = ((value << 1) ^ (value >> 31)) >>> 0;
    while (zigzag >= 0x80) {
      bytes.push((zigzag & 0x7f) | 0x80);
      zigzag >>>= 7;
    }
    bytes.push(zigzag);
  }

  function createReader(bytes) {
    let offset = 0;
    return {
      varint() {
        let result = 0;
        let shift = 0;
        for (;;) {
          if (offset >= bytes.length) throw new Error("truncated");
          const byte = bytes[offset++];
          result |= (byte & 0x7f) << shift;
          if ((byte & 0x80) === 0) break;
          shift += 7;
        }
        return (result >>> 1) ^ -(result & 1);
      },
      text() {
        const length = this.varint();
        if (length < 0 || offset + length > bytes.length) throw new Error("truncated");
        const slice = bytes.subarray(offset, offset + length);
        offset += length;
        return new TextDecoder().decode(slice);
      },
      get done() {
        return offset >= bytes.length;
      },
    };
  }

  function writeText(bytes, value) {
    const encoded = new TextEncoder().encode(value ?? "");
    writeVarint(bytes, encoded.length);
    for (const byte of encoded) bytes.push(byte);
  }

  async function deflate(bytes) {
    const stream = new Blob([bytes]).stream().pipeThrough(new CompressionStream("deflate-raw"));
    return new Uint8Array(await new Response(stream).arrayBuffer());
  }

  async function inflate(bytes) {
    const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
    return new Uint8Array(await new Response(stream).arrayBuffer());
  }

  function toBase64Url(bytes) {
    let binary = "";
    for (const byte of bytes) binary += String.fromCharCode(byte);
    return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/, "");
  }

  function fromBase64Url(text) {
    const binary = atob(text.replaceAll("-", "+").replaceAll("_", "/"));
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
    return bytes;
  }

  function buildPayload(journey, meta, includeDescription) {
    const bytes = [];
    writeVarint(bytes, FORMAT_VERSION);
    writeText(bytes, meta.title ?? "");
    writeText(bytes, includeDescription ? meta.description ?? "" : "");
    writeVarint(bytes, Math.round((meta.totalMiles ?? 0) * 100));
    writeText(bytes, journey.map((stop) => stop.code ?? "").join("\n"));
    writeVarint(bytes, journey.length);

    let previousLat = 0;
    let previousLng = 0;
    for (const stop of journey) {
      const lat = Math.round(stop.lat * COORDINATE_SCALE);
      const lng = Math.round(stop.lng * COORDINATE_SCALE);
      writeVarint(bytes, lat - previousLat);
      writeVarint(bytes, lng - previousLng);
      previousLat = lat;
      previousLng = lng;
    }
    return Uint8Array.from(bytes);
  }

  // Always the site root, never the current path. A fragment link built while a
  // dedicated bug page was open would otherwise read as that bug's URL while
  // carrying a different journey inside it.
  function linkFor(fragment) {
    return `${window.location.origin}/#${FRAGMENT_KEY}=${fragment}`;
  }

  // Resolves to a shareable URL, or null when the journey cannot be made to fit.
  async function encode(journey, meta) {
    if (!supported() || !journey.length) return null;

    // The description is the first thing sacrificed: it is by far the most
    // expensive field, and the route is the point of the link.
    for (const includeDescription of [true, false]) {
      const fragment = toBase64Url(await deflate(buildPayload(journey, meta, includeDescription)));
      const link = linkFor(fragment);
      if (link.length <= MAX_URL_LENGTH) return link;
    }
    return null;
  }

  function readFragment() {
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return null;
    return new URLSearchParams(hash).get(FRAGMENT_KEY);
  }

  // Resolves to normalized journey data, or null when there is nothing usable.
  async function decode() {
    const fragment = readFragment();
    if (!fragment || !supported()) return null;

    try {
      const reader = createReader(await inflate(fromBase64Url(fragment)));
      if (reader.varint() !== FORMAT_VERSION) return null;

      const title = reader.text();
      const description = reader.text();
      const totalMiles = reader.varint() / 100;
      const codes = reader.text().split("\n");
      const count = reader.varint();
      if (!Number.isInteger(count) || count < 1 || count > 20000) return null;

      const stops = [];
      let lat = 0;
      let lng = 0;
      for (let index = 0; index < count; index += 1) {
        lat += reader.varint();
        lng += reader.varint();
        const code = codes[index] || `Stop ${index + 1}`;
        stops.push({
          id: `${code}-${index + 1}`,
          code,
          cache: code,
          cacheUrl: /^GC[A-Z0-9]+$/i.test(code) ? `https://coord.info/${code}` : null,
          place: code,
          region: "",
          country: "",
          date: null,
          kicker: "",
          story: "",
          lat: lat / COORDINATE_SCALE,
          lng: lng / COORDINATE_SCALE,
        });
      }

      // Links made before this field was dropped carry a trailing public code.
      // Nothing reads it; the remaining bytes are simply left unread.
      return {
        meta: {
          source: "shared",
          fileName: null,
          title: title || "A shared bugabout",
          description,
          totalMiles: totalMiles > 0 ? totalMiles : null,
          uniqueCacheCodes: new Set(stops.map((stop) => stop.code)).size,
          hasDates: false,
          hasStories: false,
        },
        stops,
      };
    } catch {
      return null;
    }
  }

  const hasFragment = () => Boolean(readFragment());

  const clear = () =>
    window.history.replaceState(null, "", window.location.pathname + window.location.search);

  const adopt = (link) => window.history.replaceState(null, "", link);

  global.BugaboutLink = Object.freeze({ encode, decode, hasFragment, clear, adopt, supported });
})(window);
