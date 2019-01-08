"use strict";
var precacheConfig = [
    ["index.html", "fc92d6f25d013163751ecbf361b16bb7"],
    ["service-worker.js", "ecc007eaba17dc9168ecd9438b30fced"],
    ["static/css/app.bdf1346b4665cb07d468b3938aa63ded.css", "14e85b1938fe5a66d43ada8f6990153c"],
    ["static/js/app.c7fafd5eb86db2b7c59b.js", "1de055efe7cee90766fa23c1f288d7e2"],
    ["static/js/manifest.2ae2e69a05c33dfc65f8.js", "2f4fd3b092ed7f7e76dbb3976729742e"],
    ["static/js/vendor.aec4ef2869ade7fd3eb3.js", "89183b633ab70accb10e15e82b0fd611"]
  ],
  cacheName = "sw-precache-v3-lets-hang-" + (self.registration ? self.registration.scope : ""),
  ignoreUrlParametersMatching = [/^utm_/],
  addDirectoryIndex = function (e, t) {
    var n = new URL(e);
    return "/" === n.pathname.slice(-1) && (n.pathname += t), n.toString()
  },
  cleanResponse = function (e) {
    return e.redirected ? ("body" in e ? Promise.resolve(e.body) : e.blob()).then(function (t) {
      return new Response(t, {
        headers: e.headers,
        status: e.status,
        statusText: e.statusText
      })
    }) : Promise.resolve(e)
  },
  createCacheKey = function (e, t, n, r) {
    var a = new URL(e);
    return r && a.pathname.match(r) || (a.search += (a.search ? "&" : "") + encodeURIComponent(t) + "=" + encodeURIComponent(n)), a.toString()
  },
  isPathWhitelisted = function (e, t) {
    if (0 === e.length) return !0;
    var n = new URL(t).pathname;
    return e.some(function (e) {
      return n.match(e)
    })
  },
  stripIgnoredUrlParameters = function (e, t) {
    var n = new URL(e);
    return n.hash = "", n.search = n.search.slice(1).split("&").map(function (e) {
      return e.split("=")
    }).filter(function (e) {
      return t.every(function (t) {
        return !t.test(e[0])
      })
    }).map(function (e) {
      return e.join("=")
    }).join("&"), n.toString()
  },
  hashParamName = "_sw-precache",
  urlsToCacheKeys = new Map(precacheConfig.map(function (e) {
    var t = e[0],
      n = e[1],
      r = new URL(t, self.location),
      a = createCacheKey(r, hashParamName, n, !1);
    return [r.toString(), a]
  }));

  function setOfCachedUrls(e) {
    return e.keys().then(function (e) {
      return e.map(function (e) {
        return e.url
      })
    }).then(function (e) {
      return new Set(e)
    })
  }
  
  self.addEventListener("install", function (e) {
    e.waitUntil(caches.open(cacheName).then(function (e) {
      return setOfCachedUrls(e).then(function (t) {
        return Promise.all(Array.from(urlsToCacheKeys.values()).map(function (n) {
          if (!t.has(n)) {
            var r = new Request(n, {
              credentials: "same-origin"
            });
            return fetch(r).then(function (t) {
              if (!t.ok) throw new Error("Request for " + n + " returned a response with status " + t.status);
              return cleanResponse(t).then(function (t) {
                return e.put(n, t)
              })
            })
          }
        }))
      })
    }).then(function () {
      return self.skipWaiting()
    }))
  })