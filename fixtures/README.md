# KML test fixtures

These are official **View in Google Earth** exports from public Geocaching trackable pages, saved under public `TB...` reference names only.

`TBAR286.kml` (Benny the Burger) is the sparse counterpart: **18 stops across 18,972 miles**, spanning 166° of longitude from Hawaii to Germany. It exists because journey *shape* matters as much as journey size — the follow camera's fixed 45-stop lookahead covered Benny's entire route at every index, so the map never moved. Neither of the other two catches that: one is dense, the other is confined to a single neighbourhood.

Geocaching itself names the download with a GUID, such as `57c0a7d5-e0b2-4f87-84ab-3e334b1d2db7.kml`. The renaming here is ours, for legibility. Remember it when reasoning about what an import can know: the TB reference appears nowhere in the file contents, so a genuine upload carries no trackable code at all.

- `TBBDVQG.kml`: 6 mapped stops, 1.7 official miles
- `TBA5TD9.kml`: 2,472 mapped stops, 176,530 official miles

Use both after importer or renderer changes. The small fixture makes correctness easy to inspect; the large fixture covers list virtualization, marker sampling, duplicate cache visits, and antimeridian crossings.

Never add a trackable's private tracking number to a fixture name, file, log, screenshot, or test output.
