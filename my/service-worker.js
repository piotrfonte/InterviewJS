"use strict";var precacheConfig=[["/my/index.html","80d8247d1ccb8f4d92dd9c1ef110f304"],["/my/static/css/main.4bfc6513.css","57f644c553c420b6849c7bfce5e6c35d"],["/my/static/js/main.8af4c948.js","c8a837f60e59c98fc511b421ee5f4d63"],["/my/static/media/ShapeAttachedLeft.3e6a1d35.svg","3e6a1d350360ef521e2adfd25b67497c"],["/my/static/media/ShapeAttachedRight.2e234a75.svg","2e234a75c8cf7591d2af1b0ea3fd9db7"],["/my/static/media/ava.b1c05c82.png","b1c05c8251766f8f6ec0d7ff443e3404"],["/my/static/media/chandran.3621629e.png","3621629e6833ca306162274d6b552ea3"],["/my/static/media/hyland.0005619b.png","0005619b30a86291d97dab60a9eda767"],["/my/static/media/icomoon.44d66165.woff","44d66165d2e8af79de0ac0b7c1046e2c"],["/my/static/media/icomoon.5cc9fdd7.eot","5cc9fdd78636f9bfb54413ab84b77046"],["/my/static/media/icomoon.7a3bff45.ttf","7a3bff45f0bfa12557fbde981c31e929"],["/my/static/media/icomoon.8773cb9c.svg","8773cb9c7ef316cd73396b14b6a6f6b7"],["/my/static/media/logo.8fb96054.png","8fb9605468ebd00252d678af8eaf91b8"],["/my/static/media/obama.7e3f94e2.png","7e3f94e2c39026829e0f4dd29d6c84d7"],["/my/static/media/trump.007a82cd.png","007a82cd04dbe9566f5ad5d47bb2e658"],["/my/static/media/welcome-image.8b6c5213.png","8b6c521353b2d0087030ff62d59d2ea8"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var n=new URL(e);return"/"===n.pathname.slice(-1)&&(n.pathname+=t),n.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,t,n,a){var r=new URL(e);return a&&r.pathname.match(a)||(r.search+=(r.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(n)),r.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var n=new URL(t).pathname;return e.some(function(e){return n.match(e)})},stripIgnoredUrlParameters=function(e,t){var n=new URL(e);return n.hash="",n.search=n.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),n.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],n=e[1],a=new URL(t,self.location),r=createCacheKey(a,hashParamName,n,/\.\w{8}\./);return[a.toString(),r]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(n){if(!t.has(n)){var a=new Request(n,{credentials:"same-origin"});return fetch(a).then(function(t){if(!t.ok)throw new Error("Request for "+n+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(n,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(n){return Promise.all(n.map(function(n){if(!t.has(n.url))return e.delete(n)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,n=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching),a="index.html";(t=urlsToCacheKeys.has(n))||(n=addDirectoryIndex(n,a),t=urlsToCacheKeys.has(n));var r="/my/index.html";!t&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(n=new URL(r,self.location).toString(),t=urlsToCacheKeys.has(n)),t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(n)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});