
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
            cartCtrl.total = 0;
            cartCtrl.coupon = undefined;
            cartCtrl.isValid = undefined;
            cartCtrl.portionDiscounted = 0
            var SHIPIT = "SHIPIT"

            //Retrieving number of item in cart
            $rootScope.items = mainService.getItemLen();

            //Validating cupon
            cartCtrl.validateCoupon = () => {


                $log.debug("Coupom CODE: %s", cartCtrl.coupon.toString())

                // Check coupon explicity SHIPIT
                if (cartCtrl.coupon == SHIPIT) {
                    // 10% is a reasonable discount
                    cartCtrl.isValid = true;
                    cartCtrl.portionDiscounted = cartCtrl.total*0.1
                    cartCtrl.total -= (cartCtrl.total*0.1)  

                } else{

                    if (!cartCtrl.isValid){
                        cartCtrl.isValid = false;
                         notify({
                            message: 'O cupom digitado não é valido ou expirou, tente novamente',
                            classes: 'alert-warning',
                            templateUrl: cartCtrl.notifyTemplate
                        });    
                    }

                }
                
            }

            cartCtrl.removeCoupon = () => {
                cartCtrl.coupon = undefined;
                cartCtrl.isValid = undefined;
                cartCtrl.total += cartCtrl.portionDiscounted;

            }

            //Retrieving cart
            cartCtrl.getCurrentCart = () => {
                $log.info("Retrieving cart")
                cartCtrl.developers = mainService.getCart();
            };

            //Making a order (purchase)
            cartCtrl.makeOrder = () => {
                $log.info("Making a order");
                cartCtrl.cart = {
                    developers: cartCtrl.developers,
                    total: cartCtrl.total
                };

                cartService.makeOrder(cartCtrl.cart).then((response) => {
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

                }, (response) => {
                    $log.error("Error in made the purchase");
                    notify({
                        message: 'Pedido não feito.',
                        classes: 'alert-error',
                        templateUrl: cartCtrl.notifyTemplate
                    });
                })
            };

            //Drop item cart
            cartCtrl.removeDeveloper = (dev) => {
                var i = 0;
                angular.forEach(cartCtrl.developers, function(item){
                    if (dev.id == item.id)
                       cartCtrl.developers.splice(i, 1);
                    i++;
                })
                $rootScope.items = mainService.getItemLen();

            }

            //Clear cart
            cartCtrl.clearCart =  () => {
                $log.info("Clearing cart")
                mainService.clearCartState();
                cartCtrl.getCurrentCart();
                $rootScope.items = mainService.getItemLen();
            };

            //This watcher is necessary to keep total of price updating
            $scope.$watch('cartCtrl.developers', (devs) => {

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