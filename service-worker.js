// ===============================
// PWA キャッシュ設定
// ===============================
const CACHE_NAME = "unit-converter-cache-v2";

// キャッシュするファイル一覧
const urlsToCache = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.json",
  "./images/192-icon.png",
  "./images/512-icon.png"
];

// ===============================
// インストール（初回キャッシュ）
// ===============================
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting(); // 即時反映
});

// ===============================
// Activate（古いキャッシュ削除）
/* =============================== */
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
  self.clients.claim(); // すぐに新SWを有効化
});

// ===============================
// Fetch（オフライン対応）
// ===============================
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // キャッシュがあればそれを返す
      if (response) {
        return response;
      }

      // ネットワークから取得
      return fetch(event.request).catch(() => {
        // オフライン時のフォールバック
        if (event.request.destination === "document") {
          return caches.match("./index.html");
        }
      });
    })
  );
});
