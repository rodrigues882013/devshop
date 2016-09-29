/**
 * Created by felipe on 09/01/16.
 */

angular
    .module('devshop.order')
    .factory('orderService', [
        '$http',
        'serviceConfig',
        function ($http, serviceConfig) {
            function getOrders(id_order){
                console.log(id_order);
                var id = angular.isDefined(id_order) ? id_order : '';
                var options = {
                    method: 'GET',
                    url: serviceConfig.base + 'orders/' + id
                };

                return $http(options);
            }

            return {
                getOrders: getOrders
            }
        }]);