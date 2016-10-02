
angular
    .module('devshop.cart')
    .factory('cartService', [
        '$http',
        '$log',
        'mainService',
        'serviceConfig',
        function ($http, $log, mainService, serviceConfig) {
            function makeOrder(data){
                $log.info("Making an order");
                var options = {
                    method: 'POST',
                    url: serviceConfig.base + 'order/',
                    data: data,
                    headers: {'Content-Type': 'application/json'}
                };
                return $http(options)
            }

            function getCart(){
                return mainService.getCart();
            }

            function validateCoupon(code){
                $log.debug("Coupom CODE: %s", code.toString())

                var options = {
                    method: 'GET',
                    url: serviceConfig.base + 'coupon/' + code
                }

                return $http(options)
            }



            return {
                makeOrder: makeOrder,
                getOrder: getCart,
                validateCoupon: validateCoupon
            }
        }]);