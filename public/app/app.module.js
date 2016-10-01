

(function () {
    angular.module('devshop.cart', []);
    angular.module('devshop.developer', []);
    angular.module('devshop.order', []);



    angular.module('devshop', [
        'devshop.cart',
        'devshop.developer',
        'devshop.order',
        'ngRoute',
        'ngResource',
        'ui.router',                    // Routing
        'oc.lazyLoad',                  // ocLazyLoad
        'ui.bootstrap',
        'ui.bootstrap.typeahead',
    ]);
})();