const CACHE_NAME = "salehub-cache-v1";
const urlsToCache = ["/", "/index.html", "/static/css/main.css", "/static/js/main.js"]; // Agrega las rutas y archivos que deseas cachear

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
