
angular
    .module('devshop.order')
    .factory('orderService', [
        '$http',
        'serviceConfig',
        function ($http, serviceConfig) {

            //Getting orders
            function getOrders(id_order){
                console.info("Fetching data of api");
                console.debug("Retrieving order_id: %s", id_order)
                var id = angular.isDefined(id_order) ? id_order : '';

                //Setting up some option to request
                var options = {
                    method: 'GET',
                    url: serviceConfig.base + 'orders/' + id
                };

                //Return a promise
                return $http(options);
            }

            return {
                //Exposing methods of service
                getOrders: getOrders
            }
        }]);