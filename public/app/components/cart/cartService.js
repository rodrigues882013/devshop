
angular
    .module('devshop.cart')
    .factory('cartService', [
        '$http',
        '$log',
        'mainService',
        'serviceConfig',
        ($http, $log, mainService, serviceConfig) => {

            function makeOrder(data){

                //Register date of order
                data['orderDate'] = new Date().getTime();
                $log.info("Making an order");

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

            
            return {
                makeOrder: makeOrder,
                getOrder: getCart,
            }
        }]);