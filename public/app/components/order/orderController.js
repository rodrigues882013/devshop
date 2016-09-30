
angular
    .module('devshop.order')
    .controller('OrderController', [
        '$scope',
        '$state',
        'orderService',
        function($scope, $state, orderService){
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

            //Gonna to order detail page
            orderCtrl.detail = function(orderId){
                $state.go('order.detail', {id: orderId});
            }


            orderCtrl.getOrders();    
        }]);


    angular
    .module('devshop.order')
    .controller('OrderDetailController', [
        '$scope',
        '$state',
        'orderService',
        function($scope, $state, orderService){
            //Controller As syntax in use
            var orderDetailCtrl = this;

            //Retrieving id or order, passed to params
            orderDetailCtrl.orderId = $state.params.id;
            
            //Setting up some stufs
            orderDetailCtrl.order = {};

            //Getting order
            orderDetailCtrl.getOrder = function(){
                orderService.getOrders(orderDetailCtrl.orderId).then(function(response){
                    console.info("Retrieving order");
                    console.debug("Response Data: %s", response.data);
                    orderDetailCtrl.order = response.data[0];

                }, function(err, response){
                    console.error("Error in fecth data");
                    console.error(err);
                });
            };

            orderDetailCtrl.getOrder();    
        }]);