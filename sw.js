/* Iligan Explorer service worker
   Place this file next to index.html (same folder). Bump VERSION whenever you
   change any page, assets/app.js, assets/style.css, images or the cached libraries so visitors get the update. */
var VERSION = "v3";
var SHELL = "ilg-shell-" + VERSION;
var TILES = "ilg-tiles-" + VERSION;
var MAX_TILES = 250;

var CORE = [
  "./",
  "index.html",
  "destinations.html",
  "waterfall-trail.html",
  "map.html",
  "plan.html",
  "my-trip.html",
  "visitor-info.html",
  "safety.html",
  "local.html",
  "assets/style.css",
  "assets/logo.svg",
  "assets/app.js",
  "assets/img/tinago.webp",
  "assets/img/mariacristina.webp",
  "assets/img/mimbalot.webp",
  "assets/img/limunsudan.webp",
  "assets/img/dodiongan.webp",
  "assets/img/pagangon.webp",
  "assets/img/timoga.webp",
  "assets/img/hindang.webp",
  "assets/img/buhanginan.webp",
  "assets/img/cathedral.webp",
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css",
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js"
];

/* Hosts whose files (scripts, styles, fonts) are safe to cache as they are used. */
var STATIC_HOSTS = ["cdnjs.cloudflare.com", "cdn.tailwindcss.com", "cdn.jsdelivr.net", "fonts.googleapis.com", "fonts.gstatic.com"];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(SHELL).then(function (c) {
      /* Cache each item on its own so one failed file does not block install. */
      return Promise.all(CORE.map(function (u) {
        return c.add(u).catch(function () {});
      }));
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) {
        return k.indexOf("ilg-") === 0 && k !== SHELL && k !== TILES;
      }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

function cacheable(res) { return res && (res.ok || res.type === "opaque"); }

function trim(name, max) {
  return caches.open(name).then(function (c) {
    return c.keys().then(function (keys) {
      if (keys.length <= max) return;
      return c.delete(keys[0]).then(function () { return trim(name, max); });
    });
  });
}

/* Network first, fall back to cache. Used for pages and live status. */
function networkFirst(req, key, cacheName) {
  return fetch(req).then(function (res) {
    if (cacheable(res)) {
      var copy = res.clone();
      caches.open(cacheName).then(function (c) { c.put(key, copy); });
    }
    return res;
  }).catch(function () {
    return caches.match(key, { ignoreSearch: true });
  });
}

/* Serve from cache at once, refresh in the background. */
function staleWhileRevalidate(req, cacheName, limit) {
  return caches.open(cacheName).then(function (c) {
    return c.match(req).then(function (hit) {
      var net = fetch(req).then(function (res) {
        if (cacheable(res)) {
          c.put(req, res.clone());
          if (limit) trim(cacheName, limit);
        }
        return res;
      }).catch(function () { return hit; });
      return hit || net;
    });
  });
}

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;
  var url = new URL(req.url);

  /* 1. Page loads: newest copy when online, that page's saved copy when offline.
        Each page is cached under its own URL (query string ignored, so
        ?trip= share links still work offline). */
  if (req.mode === "navigate") {
    var pageKey = new Request(url.origin + url.pathname);
    e.respondWith(
      fetch(req).then(function (res) {
        if (cacheable(res)) {
          var copy = res.clone();
          caches.open(SHELL).then(function (c) { c.put(pageKey, copy); });
        }
        return res;
      }).catch(function () {
        return caches.match(pageKey).then(function (hit) {
          return hit || caches.match("index.html") || caches.match("./");
        });
      })
    );
    return;
  }

  /* 2. Live status file: always try the network first so closures show up. */
  if (url.origin === location.origin && /\/status\.json$/.test(url.pathname)) {
    var key = new Request(url.origin + url.pathname);
    e.respondWith(networkFirst(req, key, SHELL).then(function (res) {
      return res || new Response("{}", { headers: { "Content-Type": "application/json" } });
    }));
    return;
  }

  /* 3. Map tiles: show saved tiles instantly, keep the most recent ones. */
  if (/(^|\.)tile\.openstreetmap\.org$/.test(url.hostname)) {
    e.respondWith(staleWhileRevalidate(req, TILES, MAX_TILES));
    return;
  }

  /* 4. Own files and trusted library hosts. */
  if (url.origin === location.origin || STATIC_HOSTS.indexOf(url.hostname) > -1) {
    e.respondWith(staleWhileRevalidate(req, SHELL));
  }
});
