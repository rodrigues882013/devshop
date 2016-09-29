
angular
    .module('devshop.cart')
    .controller('CartController', [
        '$scope',
        'mainService',
        'cartService',
        'notify',
        function ($scope, mainService, cartService, notify) {
            var cartCtrl = this;
            
            cartCtrl.developers = [];
            cartCtrl.cart = {};
            cartCtrl.price = {};
            cartCtrl.total = 0;

            cartCtrl.workedHour = {};
            cartCtrl.workedHour.value = 0;

            cartCtrl.getCurrentCart = function () {
                cartCtrl.developers = mainService.getCart();

                
            };

            cartCtrl.makeOrder = function () {

                cartCtrl.cart = {
                    developers: cartCtrl.developers,
                    total: cartCtrl.total
                };

                cartService.makeOrder(cartCtrl.cart).then(function (response) {
                    console.log(response);
                    notify({
                        message: 'Pedido realizado com sucesso',
                        classes: 'alert-success',
                        templateUrl: cartCtrl.notifyTemplate
                    });

                    if (mainService.clearCartState())
                        cartCtrl.getCurrentCart();

                }, function (response) {
                    console.error(response);
                    notify({
                        message: 'Pedido não feito.',
                        classes: 'alert-error',
                        templateUrl: cartCtrl.notifyTemplate
                    });
                })
            };

            cartCtrl.clearCart = function () {
                mainService.clearCartState();
                cartCtrl.getCurrentCart();
            };

            $scope.$watch('cartCtrl.developers', function(devs){
                cartCtrl.total = 0
                angular.forEach(devs, function(elem){
                    cartCtrl.total += elem.price*elem.workedHour;    
                });
                mainService.updateCart(devs);
            }, true);
            
            cartCtrl.getCurrentCart();
        }
    ]);