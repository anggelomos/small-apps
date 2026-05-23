const CACHE_VERSION = "small-apps-v1";
const APP_SHELL = [
  "/",
  "/index.html",
  "/rice-cook/",
  "/rice-cook/index.html",
  "/meal-prep/",
  "/meal-prep/index.html",
  "/manifest.webmanifest",
  "/assets/app-icon.svg",
  "/assets/apple-touch-icon.png",
  "/assets/icon-192.png",
  "/assets/icon-maskable-192.png",
  "/assets/icon-512.png",
  "/assets/icon-maskable-512.png",
  "/assets/shortcut-rice.png",
  "/assets/shortcut-meal-prep.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys
        .filter((key) => key !== CACHE_VERSION)
        .map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((cached) => cached || fetch(event.request)
        .then((response) => {
          if (!response || response.status !== 200 || response.type !== "basic") {
            return response;
          }

          const responseClone = response.clone();
          caches.open(CACHE_VERSION)
            .then((cache) => cache.put(event.request, responseClone));
          return response;
        })
        .catch(() => {
          if (event.request.mode === "navigate") {
            return caches.match("/");
          }

          return new Response("", { status: 408, statusText: "Offline" });
        }))
  );
});
