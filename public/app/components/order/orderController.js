
angular
    .module('devshop.order')
    .controller('OrderController', [
        '$scope',
        'orderService',
        function($scope, orderService){
            //Controller As syntax in use
            var orderCtrl = this;
            
            //Setting up some stufs
            orderCtrl.orders = [];

            //Getting orders
            orderCtrl.getOrders = function(){
                orderService.getOrders().then(function(response){
                    console.info("Retrieving orders");
                    console.debug("Response Data: %s", response.data);
                    orderCtrl.orders = response.data

                }, function(err, response){
                    console.error("Error in fecth data");
                    console.error(err);
                });
            };

            orderCtrl.getOrders();    
        }]);