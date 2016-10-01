
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
        .state('developer', {
            abstract: true,
            url: "/developer",
            templateUrl: "app/shared/main/views/content.html"
        })
        .state('developer.list', {
            url: "/list",
            templateUrl: "app/components/developer/views/list.html",
            data: { pageTitle: 'Desenvolvedores' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'cgNotify',
                            files: ['assets/css/plugins/angular-notify/angular-notify.min.css', 'assets/libs/angular-notify/angular-notify.min.js']
                        }

                    ])
                }
            }
        })
        .state('cart', {
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
        .state('order',{
            abstract: true,
            url: "/order",
            templateUrl: "app/shared/main/views/content.html"
        })
        .state('order.list', {
            url: "/list",
            templateUrl: "app/components/order/views/list.html",
            data: {pageTitle: 'Pedidos'},
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([])
                }
            },
        })
        .state('order.detail', {
            url: "/detail?id",
            templateUrl: "app/components/order/views/details.html",
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
        base: 'http://localhost:8000/'
    })
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    });
