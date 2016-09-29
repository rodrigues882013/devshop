angular
    .module('devshop.order')
    .controller('OrderController', [
        '$scope',
        'orderService',
        function($scope, orderService){
            var orderCtrl = this;
            orderCtrl.orders = [];

            orderCtrl.getOrders = function(){
                orderService.getOrders().then(function(response){
                    console.info("Response Data: %s", response.data);
                    orderCtrl.orders = response.data
                }, function(err, response){

                });
            };

            orderCtrl.getOrders();    
        }]);