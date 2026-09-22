const CACHE_NAME = "escape-matematico-v1";

const ARQUIVOS_OFFLINE = [
    "./",
    "./index.html",
    "./style.css",
    "./jogo.js",
    "./dados.js",
    "./banco-desafios.js",
    "./laboratorio.png",
    "./laboratorio-ambiente.mp3",
    "./manifest.json"
];

self.addEventListener("install", function (event) {

    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(ARQUIVOS_OFFLINE);
        })
    );

});

self.addEventListener("fetch", function (event) {

    event.respondWith(
        caches.match(event.request).then(function (resposta) {

            if (resposta) {
                return resposta;
            }

            return fetch(event.request);
        })
    );

});