/**
 * Created by felipe on 09/01/16.
 */

angular
    .module('devshop.cart')
    .factory('cartService', [
        '$http',
        'mainService',
        'serviceConfig',
        function ($http, mainService, serviceConfig) {
            function makeOrder(data){
                console.log(data);
                var options = {
                    method: 'POST',
                    url: serviceConfig.base + 'orders/',
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
                getOrder: getCart
            }
        }]);