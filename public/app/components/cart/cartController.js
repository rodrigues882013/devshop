
angular
    .module('devshop.cart')
    .controller('CartController', [
        '$rootScope',
        '$scope',
        '$log',
        'mainService',
        'cartService',
        'notify',
        function ($rootScope, $scope, $log, mainService, cartService, notify) {
            
            //Controller As Syntax
            var cartCtrl = this;
            
            // Setting up some stuffs
            cartCtrl.developers = [];
            cartCtrl.cart = {};
            cartCtrl.price = {};
            cartCtrl.total = 0;
            cartCtrl.workedHour = {};
            cartCtrl.workedHour.value = 0;

            //Retrieving number of item in cart
            $rootScope.items = mainService.getItemLen();

            //Retrieving cart
            cartCtrl.getCurrentCart = function () {
                $log.info("Retrieving cart")
                cartCtrl.developers = mainService.getCart();
            };

            //Making a order (purchase)
            cartCtrl.makeOrder = function () {
                $log.info("Making a order");
                cartCtrl.cart = {
                    developers: cartCtrl.developers,
                    total: cartCtrl.total
                };

                cartService.makeOrder(cartCtrl.cart).then(function (response) {
                    $log.info("Order made with success.");
                    $rootScope.items = mainService.getItemLen();

                    notify({
                        message: 'Pedido realizado com sucesso',
                        classes: 'alert-success',
                        templateUrl: cartCtrl.notifyTemplate
                    });

                    //In this case, there was success, then the cart is clear
                    if (mainService.clearCartState())
                        cartCtrl.getCurrentCart();

                    $rootScope.items = mainService.getItemLen();

                }, function (response) {
                    $log.error("Error in made the purchase");
                    notify({
                        message: 'Pedido não feito.',
                        classes: 'alert-error',
                        templateUrl: cartCtrl.notifyTemplate
                    });
                })
            };

            //Drop item cart
            cartCtrl.removeDeveloper = function(dev){
                var i = 0;
                angular.forEach(cartCtrl.developers, function(item){
                    if (dev.id == item.id)
                       cartCtrl.developers.splice(i, 1);
                    i++;
                })
                $rootScope.items = mainService.getItemLen();

            }

            //Clear cart
            cartCtrl.clearCart = function () {
                $log.info("Clearing cart")
                mainService.clearCartState();
                cartCtrl.getCurrentCart();
                $rootScope.items = mainService.getItemLen();
            };

            //This watcher is necessary to keep total of price updating
            $scope.$watch('cartCtrl.developers', function(devs){

                $log.info("Updating total of price")
                cartCtrl.total = 0
                angular.forEach(devs, function(elem){
                    cartCtrl.total += elem.price*elem.workedHour;    
                });
                mainService.updateCart(devs);
            }, true);
            
            cartCtrl.getCurrentCart();
        }
    ]);