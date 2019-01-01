
(function() {

  'use strict';

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors.
  var isLocalhost = Boolean(window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
    );

  window.addEventListener('load', function() {

    function absolute(href) {
      let link = document.createElement("a")
      link.href = href
      return (link.protocol+'//'+link.host+link.pathname+link.search+link.hash)
    }
    
    // const serviceWorkerURL = '/service-worker.js'
    const serviceWorkerURL = 'src/library/defaultEvent.js'
    const scope = './'

    // Trouble shooting logs
    this.console.log('service-worker-prod.js window.addEventListener running the load function')
    this.console.log(`*** Document URL:   ${document.location.href} ***`)
    this.console.log(`*** Current path:   ${window.location.pathname} ***`)
    this.console.log(`*** Service worker: ${absolute(serviceWorkerURL)} ***`)
    
    // The service worker registration
    if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || isLocalhost)) {

      // Another touble shooting log
      this.console.log('service-worker-prod.js window.addEventListener register serverWorker')

      navigator.serviceWorker.register(serviceWorkerURL, {scope: scope})
        .then(function(registration) {
          // updatefound is fired if service-worker.js changes.
          registration.onupdatefound = function() {
            // updatefound is also fired the very first time the SW is installed,
            // and there's no need to prompt for a reload at that point.
            // So check here to see if the page is already controlled,
            // i.e. whether there's an existing service worker.
            if (navigator.serviceWorker.controller) {
             // The updatefound event implies that registration.installing is set
              var installingWorker = registration.installing;

              installingWorker.onstatechange = function() {
                switch (installingWorker.state) {
                  // At this point, the old content will have been purged and the
                  // fresh content will have been added to the cache.
                  // It's the perfect time to display a "New content is
                  // available; please refresh." message in the page's interface.
                  case 'installed': break;
                  case 'redundant': throw new Error('The installing service worker became redundant.');
                  default: break;
                }
              };

            }
          };
        }).catch(function(e) {
          console.error(`*** Error during service worker registration with scope as ${scope} ***`)
          console.error(`*** Error Name is ${e.name} ***`)
          console.error(`*** Error Message is ${e.message} ***`)
        });
    }
  });
 })();
