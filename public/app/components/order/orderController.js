
angular
    .module('devshop.order')
    .controller('OrderController', [
        '$rootScope',
        '$scope',
        '$state',
        '$log',
        'orderService',
        'mainService',
        function($rootScope, $scope, $state, $log, orderService, mainService){
            //Controller As syntax in use
            var orderCtrl = this;
            
            //Setting up some stufs
            orderCtrl.orders = [];

            //Retrieving number of item in cart
            $rootScope.items = mainService.getItemLen();

            //Getting orders
            orderCtrl.getOrders = () => {
                orderService.getOrders().then(function(response){
                    $log.info("Retrieving orders");
                    $log.debug("Response Data: %s", response.data);
                    orderCtrl.orders = response.data

                    angular.forEach(orderCtrl.orders, function(elem){
                        $log.info(elem['orderDate'])

                        if (elem.hasOwnProperty('orderDate') &&
                            angular.isDefined(elem.orderDate) && 
                            elem.orderDate != ''){

                            elem['orderDate'] = new Date(elem['orderDate'])
                                                    .toISOString()
                                                    .replace(/T/, ' ')
                                                    .replace(/\..+/, '')
                        }
                    })

                }, function(err, response){
                    $log.error("Error in fecth data");
                    $log.error(err);
                });
            };

            //Gonna to order detail page
            orderCtrl.detail = (orderId) => {
                $state.go('order.detail', {id: orderId});
            }


            orderCtrl.getOrders();    
        }]);


    angular
    .module('devshop.order')
    .controller('OrderDetailController', [
        '$scope',
        '$state',
        '$log',
        'orderService',
        function($scope, $state, $log, orderService){
            //Controller As syntax in use
            var orderDetailCtrl = this;

            //Retrieving id or order, passed to params
            orderDetailCtrl.orderId = $state.params.id;
            
            //Setting up some stufs
            orderDetailCtrl.order = {};

            //Getting order
            orderDetailCtrl.getOrder = () => {
                orderService.getOrder(orderDetailCtrl.orderId).then(function(response){
                    $log.info("Retrieving order");
                    $log.debug("Response Data: %s", response.data);
                    orderDetailCtrl.order = response.data[0];

                }, function(err, response){
                    $log.error("Error in fecth data");
                    $log.error(err);
                });
            };

            orderDetailCtrl.getOrder();    
        }]);