/// <reference lib="webworker" />

const CACHE_NAME = "app-cache-v1";
const OFFLINE_URL = "/offline.html"; // подложка, если нет данных

const STATIC_ASSETS = [
  "/",
  "/index.html",
  OFFLINE_URL,
  "/styles.css",
  "/main.js",
  "/logo.png",
];

// Установка (кэширование базовых файлов)
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
});

// Активация (очистка старых кэшей)
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
  );
  self.clients.claim();
});

// Перехват запросов (fetch proxy)
self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") return;

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;

      return fetch(request)
        .then((response) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, response.clone());
            return response;
          });
        })
        .catch(() => caches.match(OFFLINE_URL));
    })
  );
});

// Слушаем сообщения с фронта
self.addEventListener("message", (event) => {
  console.log("SW получил сообщение:", event.data);
  // Например: обновление кэша по команде
});

// Push-нотификации
self.addEventListener("push", (event) => {
  const data = event.data?.json() || {};
  self.registration.showNotification(data.title || "Новое уведомление", {
    body: data.body || "У вас есть новое сообщение.",
    icon: "/logo.png",
  });
});
