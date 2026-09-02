// Writes a dedicated page per bug, e.g. /TBA5TD9/, so a journey can be linked
// directly. The alternative was a redirect to a query string, which would have
// worked but thrown the pretty URL away in the address bar and in link previews.
//
// The page is generated from index.html rather than copied by hand, because a
// second copy of the app's markup would drift the first time index.html
// changed. `node tools/build-bug-pages.mjs --check` fails when the committed
// page no longer matches, and the smoke tests run it.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// Only public `TB…` references belong here — never the tracking code printed on
// the item itself. See "Trackable data safety" in AGENTS.md.
const PAGES = [{ slug: "TBA5TD9" }, { slug: "TBAR286" }];

const decodeEntities = (value) =>
  value
    .replace(/&#0*39;|&apos;/g, "’")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");

const escapeHtml = (value) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// The KML is the source of truth for the bug's name, so the page title cannot
// drift from what the app itself renders. Entities are decoded twice: the export
// writes `&amp;#39;`, an escaped entity inside an escaped document.
async function readBugName(slug) {
  const kml = await readFile(join(root, "fixtures", `${slug}.kml`), "utf8");
  const match = kml.match(/<name>([^<]*)<\/name>/);
  if (!match) throw new Error(`No <name> in fixtures/${slug}.kml`);
  return decodeEntities(decodeEntities(match[1])).trim();
}

async function buildPage(slug) {
  const shell = await readFile(join(root, "index.html"), "utf8");
  const name = await readBugName(slug);

  return (
    shell
      // Every asset in index.html is referenced as "./…", which would resolve
      // inside /<slug>/ instead of the site root.
      .replaceAll('"./', '"/')
      .replace(
        /<title>[^<]*<\/title>/,
        `<title>${escapeHtml(name)} — Bugabout</title>`,
      )
      .replace(
        /(name="description"\s*\n\s*content=")[^"]*(")/,
        `$1${escapeHtml(`Follow ${name} about — an animated map of everywhere this geocaching trackable has been.`)}$2`,
      )
      // Read by bootstrap() in app.js, which loads this bug instead of the empty
      // state. A generated constant, not a query string, so the URL stays clean.
      .replace(
        "<script>",
        `<script>window.BUGABOUT_BUG = ${JSON.stringify(slug)};</script>\n    <script>`,
      )
  );
}

const check = process.argv.includes("--check");
let stale = 0;

for (const { slug } of PAGES) {
  const html = await buildPage(slug);
  const target = join(root, slug, "index.html");
  const current = await readFile(target, "utf8").catch(() => null);

  if (check) {
    if (current !== html) {
      stale += 1;
      console.error(`${slug}/index.html is out of date — run: node tools/build-bug-pages.mjs`);
    }
    continue;
  }

  if (current === html) {
    console.log(`${slug}/index.html already current`);
    continue;
  }
  await mkdir(join(root, slug), { recursive: true });
  await writeFile(target, html);
  console.log(`wrote ${slug}/index.html`);
}

if (stale) process.exit(1);
if (check) console.log(`Bugabout: ${PAGES.length} bug page(s) up to date.`);
