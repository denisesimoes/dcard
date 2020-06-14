var CACHE_NAME = 'denisesimoes-dcard-offline-01';
var urlsToCache = [
	'/dcard/',
	'/dcard/index.html',
	'/dcard/app.html',
	'/dcard/offline.html',
	'/dcard/404.html',
	'/dcard/favicon/android-chrome-512x512.png',
	'/dcard/css/all.css',
	'/dcard/webfonts/fa-brands-400.eot',
	'/dcard/webfonts/fa-brands-400.svg',
	'/dcard/webfonts/fa-brands-400.ttf',
	'/dcard/webfonts/fa-brands-400.woff',
	'/dcard/webfonts/fa-brands-400.woff2',
	'/dcard/webfonts/fa-regular-400.eot',
	'/dcard/webfonts/fa-regular-400.svg',
	'/dcard/webfonts/fa-regular-400.ttf',
	'/dcard/webfonts/fa-regular-400.woff',
	'/dcard/webfonts/fa-regular-400.woff2',
	'/dcard/webfonts/fa-solid-900.eot',
	'/dcard/webfonts/fa-solid-900.svg',
	'/dcard/webfonts/fa-solid-900.ttf',
	'/dcard/webfonts/fa-solid-900.woff',
	'/dcard/webfonts/fa-solid-900.woff2',
	'https://1.bp.blogspot.com/-Nz8RYkhtrus/XjCsU5OAb4I/AAAAAAAAAmE/rIzAmt9EUa40azNI6OEIzv6QUx9KBjLXwCLcBGAsYHQ/s1600/denise-simoes-logo-bkg-07.png',
	'https://1.bp.blogspot.com/-C-dpUy2FyfU/XdmHbX8YwzI/AAAAAAAAAYc/o0fEjzfr-T8pknhymeLaEMxJ5shuLzZ8ACK4BGAYYCw/s1600/denise-simoes-terapeuta-ocupacional-logo-web.png',
	'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js',
	'https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css',
	'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
	'/dcard/imgs/denise-simoes-bkg.png',
	'/dcard/imgs/denise-simoes-sobre-mobile.png',
	'/dcard/imgs/header-bkg-01.png',
	'/dcard/imgs/logo-bkg-03-mobile-transparente.png',
	'/dcard/imgs/logo-modelo-01-fundo-transparente-1024x878.png',
	'/dcard/imgs/logo-modelo-01-horizontal-01-TO-crefito-fundo-transparente.png'
];
self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(CACHE_NAME)
		.then(function(cache) {
			return cache.addAll(urlsToCache);
		})
	);
});
self.addEventListener('activate', function(event) {
	event.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(
				cacheNames.filter(function(cacheName) {
					// Return true if you want to remove this cache,
					// but remember that caches are shared across
					// the whole origin
				}).map(function(cacheName) {
					return caches.delete(cacheName);
				})
			);
		})
	);
});
/* FETCH */
self.addEventListener('fetch', function(event) {
	event.respondWith(
	// Try the cache
		caches.match(event.request).then(function(response) {
			//console.log('response 01 = ' + response);
			if (response) {
				return response;
			}
			return fetch(event.request).then(function(response) {
				//console.log('response.status = ' + response.status);
				if (response.status === 404) {
					return caches.match('/dcard/404.html');
				}
				//console.log('response 02 = ' + response);
				return response
			});
		}).catch(function() {
			// If both fail, show a generic fallback:
			//console.log('offline event = ' + event);
			return caches.match('/dcard/offline.html');
		})
	);
});