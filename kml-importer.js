(function exposeKmlImporter(global) {
  "use strict";

  const XML_ERROR_SELECTOR = "parsererror";

  function directChild(element, localName) {
    return [...element.children].find((child) => child.localName === localName) ?? null;
  }

  function directChildText(element, localName) {
    return directChild(element, localName)?.textContent?.trim() ?? "";
  }

  function decodeHtml(value) {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = value;
    const once = textarea.value;
    textarea.innerHTML = once;
    return textarea.value;
  }

  function htmlToText(value) {
    const template = document.createElement("template");
    template.innerHTML = decodeHtml(value);
    return (template.content.textContent ?? "")
      .replace(/\u00a0/g, " ")
      .replace(/\r/g, "")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  }

  function normalizeLongitude(value) {
    return ((((value + 180) % 360) + 360) % 360) - 180;
  }

  function parseCoordinate(value) {
    const [rawLng, rawLat, rawAltitude] = value.trim().split(",");
    const lng = Number(rawLng);
    const lat = Number(rawLat);
    const altitude = Number(rawAltitude);
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
    if (lat < -90 || lat > 90) return null;
    return {
      lat,
      lng: normalizeLongitude(lng),
      altitude: Number.isFinite(altitude) ? altitude : null,
    };
  }

  function parsePublicCode(fileName) {
    return fileName.toUpperCase().match(/\bTB[A-Z0-9]+\b/)?.[0] ?? null;
  }

  function parseMiles(documentElement, description) {
    const folderNames = [...documentElement.getElementsByTagNameNS("*", "Folder")].map((folder) =>
      directChildText(folder, "name"),
    );
    const source = [...folderNames, description].find((value) => /Travel Bug Stops \(/i.test(value)) ?? description;
    const match = source.match(/(?:Travel Bug Stops \(|traveled\s+)([\d,.]+)\s+mile/i);
    if (!match) return null;
    const miles = Number(match[1].replaceAll(",", ""));
    return Number.isFinite(miles) ? miles : null;
  }

  function cleanDescription(description) {
    return htmlToText(description)
      .replace(/\n?[^\n]+ has traveled [\d,.]+ miles?\.?\s*$/i, "")
      .trim();
  }

  function parseKml(kmlText, options = {}) {
    if (typeof kmlText !== "string" || !kmlText.trim()) {
      throw new Error("This KML file is empty.");
    }

    const xml = new DOMParser().parseFromString(kmlText, "application/xml");
    if (xml.querySelector(XML_ERROR_SELECTOR)) {
      throw new Error("This file is not valid KML/XML.");
    }

    const documentElement = xml.getElementsByTagNameNS("*", "Document")[0];
    if (!documentElement) {
      throw new Error("No KML document was found in this file.");
    }

    const rawDescription = directChildText(documentElement, "description");
    const title = htmlToText(directChildText(documentElement, "name")) || "Imported bugabout";
    const description = cleanDescription(rawDescription);
    const totalMiles = parseMiles(documentElement, htmlToText(rawDescription));
    const placemarks = [...documentElement.getElementsByTagNameNS("*", "Placemark")];
    const stops = [];

    placemarks.forEach((placemark, index) => {
      const point = directChild(placemark, "Point");
      if (!point) return;
      const coordinateText = point.getElementsByTagNameNS("*", "coordinates")[0]?.textContent ?? "";
      const coordinate = parseCoordinate(coordinateText);
      if (!coordinate) return;
      const code = htmlToText(directChildText(placemark, "name")) || `Stop ${stops.length + 1}`;
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
        ...coordinate,
      });
    });

    if (!stops.length) {
      throw new Error("This KML file does not contain any mapped trackable stops.");
    }

    let antimeridianCrossings = 0;
    for (let index = 1; index < stops.length; index += 1) {
      if (Math.abs(stops[index].lng - stops[index - 1].lng) > 180) antimeridianCrossings += 1;
    }

    const uniqueCacheCodes = new Set(stops.map((stop) => stop.code)).size;
    const fileName = options.fileName ?? "journey.kml";

    return {
      meta: {
        source: "kml",
        fileName,
        publicCode: parsePublicCode(fileName),
        title,
        description,
        totalMiles,
        uniqueCacheCodes,
        antimeridianCrossings,
        hasDates: false,
        hasStories: false,
      },
      stops,
    };
  }

  global.BugaboutKml = Object.freeze({ parse: parseKml });
})(window);
