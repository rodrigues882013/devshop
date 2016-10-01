
//Creating service via factory
// I use services generally to make HTTP requests, sharing items for whole of application
angular
    .module('devshop')
    .factory('mainService', [
        '$http',
        '$log',
        'serviceConfig',
        function ($http, $log, serviceConfig) {
            var items = [];

            function addItemInCart(item){
                $log.info("Puting item on cart");
                items = restoreCartState();
                if (items == null) items = [];
                items.push(item);
                saveCartState();
                return true;
            }

            function getItemLen(){
                $log.info("Calculating the number of items in cart");
                items = restoreCartState();
                return items != null ? items.length : 0;
            }

            function getCart(){
                $log.info("Getting cart");
                items = restoreCartState();
                if (items == null) items = [];
                console.log(items);
                return items;
            }

            function saveCartState(){
                $log.info("Saving the cart on localStorage");
                localStorage.setItem("currentCart", JSON.stringify(items));
            }

            function restoreCartState(){
                $log.info("Restore cart if user leave and turn back to site");
                return JSON.parse(localStorage.getItem("currentCart"));
            }

            function clearCartState(){
                $log.info("Clear cart");
                localStorage.clear('currentCart');
                return true;
            }

            function updateCart(items){
                $log.info("Updating the cart, or items in the cart");
                localStorage.setItem("currentCart", JSON.stringify(items));
                return true;
            }

            return {

                //Expose functions
                addItemInCart: addItemInCart,
                getItemLen: getItemLen,
                getCart: getCart,
                saveCartState: saveCartState,
                restoreCartState: restoreCartState,
                clearCartState: clearCartState,
                updateCart:updateCart
            }
        }]);