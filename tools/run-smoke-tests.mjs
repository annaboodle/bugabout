// Runs tests/smoke.html in a real browser without adding a package dependency.
// The suite needs DOMParser, CompressionStream, and other browser APIs that Node
// deliberately does not emulate.

import { spawn } from "node:child_process";

function checkBugPages() {
  return new Promise((resolve, reject) => {
    const check = spawn(process.execPath, ["tools/build-bug-pages.mjs", "--check"], {
      stdio: "inherit",
    });
    check.once("exit", (code) =>
      code === 0 ? resolve() : reject(new Error("Bug pages are out of date.")),
    );
  });
}
import { createServer } from "node:http";
import { existsSync, mkdtempSync, readFileSync, rmSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, extname, join, resolve, sep } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const CONTENT_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".kml": "application/vnd.google-earth.kml+xml; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
};

function browserPath() {
  const candidates = [
    process.env.BUGABOUT_CHROME,
    process.env.CHROME_BIN,
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
  ].filter(Boolean);
  return candidates.find(existsSync) ?? null;
}

function serveProject() {
  return createServer((request, response) => {
    try {
      const url = new URL(request.url ?? "/", "http://127.0.0.1");
      const requested = decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname);
      const file = resolve(projectRoot, `.${requested}`);
      if (file !== projectRoot && !file.startsWith(`${projectRoot}${sep}`)) {
        response.writeHead(403).end("Forbidden");
        return;
      }
      if (!statSync(file).isFile()) throw new Error("not a file");
      response.writeHead(200, {
        "Cache-Control": "no-store",
        "Content-Type": CONTENT_TYPES[extname(file)] ?? "application/octet-stream",
      });
      response.end(readFileSync(file));
    } catch {
      response.writeHead(404).end("Not found");
    }
  });
}

async function listen(server) {
  await new Promise((resolveListen, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolveListen);
  });
  return server.address().port;
}

async function close(server) {
  await new Promise((resolveClose) => server.close(resolveClose));
}

function startBrowser(browser, profile, url) {
  return spawn(
    browser,
    [
      "--headless=new",
      "--disable-background-networking",
      "--disable-component-update",
      "--disable-default-apps",
      "--disable-extensions",
      "--disable-sync",
      "--metrics-recording-only",
      "--no-default-browser-check",
      "--no-first-run",
      "--remote-debugging-port=0",
      `--user-data-dir=${profile}`,
      url,
    ],
    { stdio: ["ignore", "ignore", "pipe"] },
  );
}

function debuggerUrl(child) {
  return new Promise((resolveUrl, reject) => {
    let output = "";
    const timer = setTimeout(() => reject(new Error("Chrome did not open its test connection.")), 10000);
    child.stderr.setEncoding("utf8");
    child.stderr.on("data", (chunk) => {
      output = `${output}${chunk}`.slice(-12000);
      const match = output.match(/DevTools listening on (ws:\/\/[^\s]+)/);
      if (!match) return;
      clearTimeout(timer);
      resolveUrl(match[1]);
    });
    child.once("error", (error) => {
      clearTimeout(timer);
      reject(error);
    });
    child.once("exit", (code) => {
      clearTimeout(timer);
      reject(new Error(`Chrome exited before the tests opened (${code ?? "unknown"}).`));
    });
  });
}

async function targetUrl(browserDebuggerUrl, pageUrl) {
  const endpoint = new URL(browserDebuggerUrl);
  const listUrl = `http://127.0.0.1:${endpoint.port}/json/list`;
  const deadline = Date.now() + 10000;
  while (Date.now() < deadline) {
    try {
      const targets = await fetch(listUrl).then((response) => response.json());
      const target = targets.find((entry) => entry.type === "page" && entry.url === pageUrl);
      if (target?.webSocketDebuggerUrl) return target.webSocketDebuggerUrl;
    } catch {
      // Chrome may announce its debugger just before the HTTP endpoint is ready.
    }
    await delay(50);
  }
  throw new Error("Chrome opened, but the smoke-test page did not.");
}

async function connect(debuggerWebSocketUrl) {
  const socket = new WebSocket(debuggerWebSocketUrl);
  await new Promise((resolveOpen, reject) => {
    socket.addEventListener("open", resolveOpen, { once: true });
    socket.addEventListener("error", () => reject(new Error("Could not connect to the smoke-test page.")), {
      once: true,
    });
  });

  let nextId = 0;
  const pending = new Map();
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(String(event.data));
    if (!message.id || !pending.has(message.id)) return;
    const { resolveCall, rejectCall } = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) rejectCall(new Error(message.error.message));
    else resolveCall(message.result);
  });

  return {
    call(method, params = {}) {
      const id = (nextId += 1);
      return new Promise((resolveCall, rejectCall) => {
        pending.set(id, { resolveCall, rejectCall });
        socket.send(JSON.stringify({ id, method, params }));
      });
    },
    close() {
      socket.close();
    },
  };
}

async function evaluate(client, expression) {
  const response = await client.call("Runtime.evaluate", {
    expression,
    returnByValue: true,
  });
  return response.result.value;
}

async function awaitResult(client) {
  const deadline = Date.now() + 30000;
  while (Date.now() < deadline) {
    const status = await evaluate(client, "document.documentElement.dataset.status");
    if (status === "passed") return;
    if (status === "failed") {
      const detail = await evaluate(
        client,
        "document.querySelector('#details')?.textContent || document.querySelector('#summary')?.textContent",
      );
      throw new Error(detail || "Browser smoke tests failed.");
    }
    await delay(50);
  }
  throw new Error("Browser smoke tests did not finish within 30 seconds.");
}

async function stopBrowser(child) {
  if (child.exitCode !== null) return;
  child.kill("SIGTERM");
  await Promise.race([
    new Promise((resolveExit) => child.once("exit", resolveExit)),
    delay(3000),
  ]);
  if (child.exitCode === null) child.kill("SIGKILL");
}

const browser = browserPath();
if (!browser) {
  console.error("No Chromium-based browser found. Set BUGABOUT_CHROME to its executable path.");
  process.exitCode = 1;
} else {
  const server = serveProject();
  const profile = mkdtempSync(join(tmpdir(), "bugabout-smoke-"));
  let child = null;
  let client = null;
  try {
    const port = await listen(server);
    const url = `http://127.0.0.1:${port}/tests/smoke.html`;
    child = startBrowser(browser, profile, url);
    const browserDebuggerUrl = await debuggerUrl(child);
    client = await connect(await targetUrl(browserDebuggerUrl, url));
    await client.call("Runtime.enable");
    await awaitResult(client);
    // Read the count off the page rather than hardcoding it, which reported
    // "7 passed" no matter how many tests had actually run.
    const summary = await evaluate(
      client,
      "document.querySelector('#summary')?.textContent || 'browser smoke tests passed'",
    );
    console.log(`Bugabout: ${summary}.`);
    // The generated bug pages are committed, so a change to index.html that is
    // not regenerated would ship a stale copy of the app at /<slug>/.
    await checkBugPages();
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  } finally {
    client?.close();
    if (child) await stopBrowser(child);
    await close(server);
    rmSync(profile, { recursive: true, force: true });
  }
}
