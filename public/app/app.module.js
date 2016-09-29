/**
 * Created by felipe on 09/01/16.
 */

(function () {
    angular.module('devshop.cart', []);
    angular.module('devshop.developer', []);
    angular.module('devshop.order', []);



    angular.module('devshop', [
        'devshop.cart',
        'devshop.developer',
        'devshop.order',
        'ui.router',                    // Routing
        'oc.lazyLoad',                  // ocLazyLoad
        'ui.bootstrap',
        'ui.bootstrap.typeahead',
    ]);
})();