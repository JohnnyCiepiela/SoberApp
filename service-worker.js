var cacheName = "afterschoolsclasses-v1";
var cacheFiles = [
    "index.html",
];


self.addEventListener("install", function (e) {
    console.log("[Service Workder] Install");
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log("[Service Worker] Caching all the files");
            return cache.addAll(cacheFiles);
        })
    );
});

self.addEventListener("fetch", function (e) {
    e.respondwith(
        caches.match(e.request).then(function (cachedFile) {
            if (cachedFile) {
                console.log(" [Service Worker] Resource fetched from the cache for: " + e.request.url);

                return cachedFile;

            } else {
                return fetch(e.request).then(function (response) {
                    return caches.open(cacheName).then(function (cache) {
                        cache.put(e.request, response.clone());
                        console.log("[Service Worker] Resource fetched and saved in the cache for:" + e.request.url);

                        return response;
                    });
                });
            }
        })
    );
});