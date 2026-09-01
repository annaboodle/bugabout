# Bugabout

**Follow your bug about.**

Bugabout turns a geocaching trackable history into an animated journey. It opens on a real trackable's travels and can import the official KML file downloaded from any Geocaching trackable page.

## Run locally

No build step or package installation is required.

```sh
python3 -m http.server 4173
```

Then open [http://localhost:4173](http://localhost:4173).

Leaflet is vendored locally; the interactive basemap uses OpenStreetMap tiles loaded from the web.

## Current prototype

- Responsive animated route map, with the route colored oldest to newest so a long journey reads as a chronology
- A camera that follows the bug during playback, zooming in for local wandering and out for ocean crossings
- Play, pause, scrub, playback speed, and fit-route controls
- Live miles and countries readouts in the player, beside the timeline that drives them
- A full-width journey heading — title, description, and totals — above the map and log at every screen size
- Journey story cards and stop-by-stop navigation
- A journey log readable by time or by place, grouping caches under the countries and US states they sit in
- Local KML import through **Open your bug's KML** or drag and drop, explained step by step in **Where's my KML?**
- Shareable links that replay a specific bug's route, encoded entirely in the URL — nothing is stored and nothing is uploaded
- Large-journey rendering tuned for thousands of mapped stops
- Countries derived from stop coordinates, plus US states where the bug travelled in the States
- A clearly labeled fictional sample journey

## Import a real trackable

1. Go to a trackable page on [geocaching.com](https://www.geocaching.com). Use the browser, not the app, and make sure you are logged in — the page is public, but its map download comes back empty when you are signed out.
2. Choose **View in Google Earth** on that page. It saves a `.kml` file to your downloads.
3. In Bugabout, choose **Open your bug's KML** and pick that file, or drag it anywhere onto the page.
4. Press play.

Geocaching names that download with a GUID, such as `57c0a7d5-e0b2-4f87-84ab-3e334b1d2db7.kml`, and the trackable's `TB` reference appears nowhere in the file, so an import cannot know which trackable it came from. The fixtures in [`fixtures/`](./fixtures/) are renamed to their TB codes for legibility; that is this project's convention, not Geocaching's.

The file is parsed locally in the browser and is not uploaded anywhere. Geocaching's KML includes an ordered list of mapped cache codes and coordinates, the trackable description, and total mileage. It does not include visit dates, log text, cache titles, photos, countries, or regions, so Bugabout omits those fields instead of inventing data.

Country and, within the United States, state are the fields Bugabout fills in itself, because a stop's coordinates already determine them. Each stop is matched against vendored Natural Earth boundaries. The countries readout explains that provenance in its tooltip and the **How to import** dialog. Shoreline caches that fall just outside a coastline are snapped to the nearest country within 25 km. Non-US administrative regions remain unavailable.

Two real public-reference fixtures are available for repeatable testing in [`fixtures/`](./fixtures/): a six-stop journey and a 2,472-stop journey.

## Test

Run the dependency-free browser smoke suite with:

```sh
node tools/run-smoke-tests.mjs
```

It launches an installed Chromium-based browser in headless mode and exercises KML parsing, country/state lookup, antimeridian data, and journey-link round trips against both real fixtures. The manual map and interaction checks remain in [`AGENTS.md`](./AGENTS.md).

## Next milestone

Apply for Geocaching Authorized Developer access, then add a **Connect Geocaching** OAuth flow so a public TB code can resolve directly through the approved API. The current static app cannot fetch the authenticated KML endpoint or read another site's download on the user's behalf, and Bugabout will not use page scraping or collect Geocaching passwords as a workaround.

An approved integration could also enrich KML journeys with dates, cache names, regions, and public log stories, and would supply countries directly instead of deriving them. GPX can be added as a second explicit file format if it contributes useful trackable-history data.
