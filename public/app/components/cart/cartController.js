
angular
    .module('devshop.cart')
    .controller('CartController', [
        '$scope',
        'mainService',
        'cartService',
        'notify',
        function ($scope, mainService, cartService, notify) {
            
            //Controller As Syntax
            var cartCtrl = this;
            
            // Setting up some stuffs
            cartCtrl.developers = [];
            cartCtrl.cart = {};
            cartCtrl.price = {};
            cartCtrl.total = 0;
            cartCtrl.workedHour = {};
            cartCtrl.workedHour.value = 0;

            //Retrieving cart
            cartCtrl.getCurrentCart = function () {
                console.info("Retrieving cart")
                cartCtrl.developers = mainService.getCart();
            };

            //Making a order (purchase)
            cartCtrl.makeOrder = function () {
                console.info("Making a order");
                cartCtrl.cart = {
                    developers: cartCtrl.developers,
                    total: cartCtrl.total
                };

                cartService.makeOrder(cartCtrl.cart).then(function (response) {
                    console.info("Order made with success.");

                    notify({
                        message: 'Pedido realizado com sucesso',
                        classes: 'alert-success',
                        templateUrl: cartCtrl.notifyTemplate
                    });

                    //In this case, there was success, then the cart is clear
                    if (mainService.clearCartState())
                        cartCtrl.getCurrentCart();

                }, function (response) {
                    console.error("Error in made the purchase");
                    notify({
                        message: 'Pedido não feito.',
                        classes: 'alert-error',
                        templateUrl: cartCtrl.notifyTemplate
                    });
                })
            };

            //Clear cart
            cartCtrl.clearCart = function () {
                console.info("Clearing cart")
                mainService.clearCartState();
                cartCtrl.getCurrentCart();
            };

            //This watcher is necessary to keep total of price updating
            $scope.$watch('cartCtrl.developers', function(devs){

                console.info("Updating total of price")
                cartCtrl.total = 0
                angular.forEach(devs, function(elem){
                    cartCtrl.total += elem.price*elem.workedHour;    
                });
                mainService.updateCart(devs);
            }, true);
            
            cartCtrl.getCurrentCart();
        }
    ]);