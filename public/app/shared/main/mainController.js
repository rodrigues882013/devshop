function MainCtrl($scope, mainService){
    $scope.notifyTemplate = 'app/shared/main/views/notify.html';

    $scope.cartIsEmpty = function(){
        return mainService.getItemLen() == 0;
    };

    $scope.getLenCart = function(){
        return mainService.getItemLen();
    };




}

angular
    .module('devshop')
    .controller('MainCtrl', [
        '$scope',
        'mainService',
        MainCtrl]);