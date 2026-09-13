/**
 * Seduction Codex - Service Worker
 * Stratégie Offline-First (Stale-While-Revalidate & Cache-First)
 */

const CACHE_NAME = "seduction-codex-v1.1.0";

const STATIC_ASSETS = [
  "./",
  "./index.html",
  "./styles/main.css",
  "./src/app.js",
  "./src/data/books.js",
  "./src/data/quizData.js",
  "./src/data/stagesData.js",
  "./src/components/Icons.js",
  "./src/components/Toast.js",
  "./src/components/QuoteWidget.js",
  "./src/components/StagesView.js",
  "./src/components/BookCard.js",
  "./src/components/BookDetailModal.js",
  "./src/components/QuizModal.js",
  "./src/components/PwaInstallBanner.js",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/favicon.svg"
];

// Install: pre-cache all core static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[SW] Pre-caching static assets for offline access");
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn("[SW] Pre-caching partial warning:", err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate: clean up outdated caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log("[SW] Deleting old cache:", name);
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Stale-While-Revalidate strategy for local app assets, Cache-First for fonts/CDNs
self.addEventListener("fetch", (event) => {
  const request = event.request;

  // Ignore non-GET requests
  if (request.method !== "GET") return;

  // For CDN / External assets (Tailwind, Google Fonts)
  if (request.url.includes("fonts.googleapis.com") || 
      request.url.includes("fonts.gstatic.com") || 
      request.url.includes("cdn.tailwindcss.com")) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse;

          return fetch(request).then((networkResponse) => {
            if (networkResponse.status === 200) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          }).catch(() => {
            return cachedResponse || new Response("", { status: 408 });
          });
        });
      })
    );
    return;
  }

  // For Local Assets: Stale-While-Revalidate
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(request).then((cachedResponse) => {
        const fetchPromise = fetch(request).then((networkResponse) => {
          if (networkResponse.status === 200) {
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        }).catch((err) => {
          // If offline and not in cache, fallback to index.html for navigation requests
          if (request.mode === "navigate") {
            return cache.match("./index.html");
          }
          return cachedResponse;
        });

        return cachedResponse || fetchPromise;
      });
    })
  );
});
