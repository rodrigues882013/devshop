
angular
    .module('devshop.cart')
    .factory('cartService', [
        '$http',
        '$log',
        'mainService',
        'serviceConfig',
        function ($http, $log, mainService, serviceConfig) {
            function makeOrder(data){

                //Register date of order
                data['orderDate'] = new Date().getTime();
                $log.info("Making an order");

                console.log(data)
                var options = {
                    method: 'POST',
                    url: '/order/',
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
                    url: '/coupon/' + code
                }

                return $http(options)
            }



            return {
                makeOrder: makeOrder,
                getOrder: getCart,
                validateCoupon: validateCoupon
            }
        }]);