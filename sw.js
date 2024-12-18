const CACHE_NAME = "offline-cache-v1";
const OFFLINE_URLS = [
    "./index.html",
    "./icons/plane.png",
    "./icons/cellular.png",
    "./icons/wifi.png",
    "./icons/bluetooth.png",
    "./icons/brightness.png",
    "./icons/volume.png",
    "./icons/mirroring.png",
    "./icons/rotation.png",
    "./icons/music.png"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(OFFLINE_URLS);
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

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
