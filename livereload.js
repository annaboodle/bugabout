(function liveReload(global) {
  "use strict";

  // Development convenience only. There is no build step to hook into, so this
  // asks the static server whether any authored file has changed and reloads if
  // one has. Guarded to local hosts so it never runs anywhere real.
  const LOCAL_HOSTS = ["localhost", "127.0.0.1", "[::1]", ""];
  if (!LOCAL_HOSTS.includes(global.location.hostname)) return;

  const WATCHED = [
    "./",
    "./app.js",
    "./styles.css",
    "./country-lookup.js",
    "./journey-link.js",
    "./kml-importer.js",
    "./bumblebee.js",
  ];
  const INTERVAL_MS = 900;

  const stamps = new Map();
  let stopped = false;

  async function stampOf(path) {
    // HEAD keeps this cheap, and no-store stops the browser answering from cache
    // with the very copy we are trying to detect a change against.
    const response = await fetch(path, { method: "HEAD", cache: "no-store" });
    if (!response.ok) return null;
    return response.headers.get("last-modified") ?? response.headers.get("etag");
  }

  async function check() {
    if (stopped) return;
    for (const path of WATCHED) {
      let stamp = null;
      try {
        stamp = await stampOf(path);
      } catch {
        continue; // server restarting, most likely; try again next tick
      }
      if (!stamp) continue;

      const previous = stamps.get(path);
      stamps.set(path, stamp);
      if (previous && previous !== stamp) {
        stopped = true;
        global.location.reload();
        return;
      }
    }
  }

  check();
  global.setInterval(check, INTERVAL_MS);
})(window);
