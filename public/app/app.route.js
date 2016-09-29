
function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    $urlRouterProvider.otherwise("/index");

    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: false
    });

    $stateProvider

        .state('index', {
            abstract: true,
            url: "/index",
            templateUrl: "app/shared/main/views/content.html"
        })
        .state('index.main', {
            url: "/main",
            templateUrl: "app/shared/main/views/main.html",
            data: { pageTitle: 'Example view' }
        })
        .state('index.developer', {
            url: "/developer",
            templateUrl: "app/components/developer/views/developers.html",
            data: { pageTitle: 'Desenvolvedores' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'ui.select',
                            files: ['assets/css/plugins/ui-select/select.min.css', 'assets/libs/ui-select/select.min.js']
                        },
                        {
                            name: 'cgNotify',
                            files: ['assets/css/plugins/angular-notify/angular-notify.min.css', 'assets/libs/angular-notify/angular-notify.min.js']
                        }

                    ])
                }
            }
        })
        .state('index.cart', {
            url: "/cart",
            templateUrl: "app/components/cart/views/cart.html",
            data: { pageTitle: 'Carrinho' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'cgNotify',
                            files: ['assets/css/plugins/angular-notify/angular-notify.min.css', 'assets/libs/angular-notify/angular-notify.min.js']
                        }
                    ])
                }
            },

        })
        .state('index.order', {
            url: "/order",
            templateUrl: "app/components/order/views/order.html",
            data: {pageTitle: 'Pedidos'},
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([])
                }
            },
        })
}

angular
    .module('devshop')
    .config(config)
    .constant('serviceConfig', {
        base: 'http://localhost:6000/'
    })
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    });
