

angular
    .module('devshop')
    .controller('MainCtrl', [
        '$scope',
        '$state',
        'mainService',
        function($scope, $state, mainService){
            $scope.notifyTemplate = 'app/shared/main/views/notify.html';
                    

            $scope.cartIsEmpty = function(){
                return mainService.getItemLen() == 0;
            };

            $scope.getLenCart = function(){
                return mainService.getItemLen();
            };

            
            $state.go("developer.list");
        }
    ]);