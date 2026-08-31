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
- Journey story cards and stop-by-stop navigation
- A journey log readable by time or by place, grouping caches under the countries and US states they sit in
- Local KML import through **Open KML** or drag and drop, explained step by step in **How it works**
- Shareable links that replay a specific bug's route, encoded entirely in the URL — nothing is stored and nothing is uploaded
- Large-journey rendering tuned for thousands of mapped stops
- Countries derived from stop coordinates, plus US states where the bug travelled in the States
- A clearly labeled fictional sample journey

## Import a real trackable

1. Sign in at [geocaching.com](https://www.geocaching.com). The trackable page is public, but its map download comes back empty when you are signed out.
2. Open the trackable's page — the one whose web address contains its public `TB` code.
3. Choose **View in Google Earth** to download its `.kml` file.
4. In Bugabout, choose **Open KML** and select the download, or drag the file onto the page.

The file is parsed locally in the browser and is not uploaded anywhere. Geocaching's KML includes an ordered list of mapped cache codes and coordinates, the trackable description, and total mileage. It does not include visit dates, log text, cache titles, photos, countries, or regions, so Bugabout omits those fields instead of inventing data.

Country and, within the United States, state are the fields Bugabout fills in itself, because a stop's coordinates already determine them. Each stop is matched against vendored Natural Earth boundaries. The countries readout explains that provenance in its tooltip and the **How it works** dialog. Shoreline caches that fall just outside a coastline are snapped to the nearest country within 25 km. Non-US administrative regions remain unavailable.

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
