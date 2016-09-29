
angular
    .module('devshop')
    .factory('mainService', [
        '$http',
        'serviceConfig',
        function ($http, serviceConfig) {
            var items = [];

            function addItemInCart(item){
                items = restoreCartState();
                if (items == null) items = [];
                items.push(item);
                saveCartState();
                return true;
            }

            function getItemLen(){
                items = restoreCartState();
                return items.length
            }

            function getCart(){
                items = restoreCartState();
                if (items == null) items = [];
                console.log(items);
                return items;
            }

            function saveCartState(){
                localStorage.setItem("currentCart", JSON.stringify(items));
            }

            function restoreCartState(){
                return JSON.parse(localStorage.getItem("currentCart"));
            }

            function clearCartState(){
                localStorage.clear('currentCart');
                return true;
            }

            function updateCart(items){
                localStorage.setItem("currentCart", JSON.stringify(items));
                return true;
            }

            return {
                addItemInCart: addItemInCart,
                getItemLen: getItemLen,
                getCart: getCart,
                saveCartState: saveCartState,
                restoreCartState: restoreCartState,
                clearCartState: clearCartState,
                updateCart:updateCart
            }
        }]);