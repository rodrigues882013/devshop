

'use strict';

describe('CartControllerTest', function() {

   //Load module, before anything
    beforeEach(angular.mock.module('devshop'));
    beforeEach(angular.mock.module('devshop.order'));

    //Some stuffs that we'll need
    var $controller;
    var $rootScope;
    var $scope;
    var orderService;
    var mainService;
    var controller;    


    //Inject some dependencies too.
    beforeEach(angular.mock.inject(function(_$controller_, _$rootScope_){
        $controller = _$controller_;
        $rootScope = _$rootScope_;

        //Creating a new scope, descendant of $rootScope
        $scope = $rootScope.$new();

    }));



    function createController(){
        controller = $controller('orderCtrl',
            {
                $scope: $scope,
                orderService: orderService,
                mainService: mainService
            });
    }


    it('Testing if controller is valid', function(){

        createController();
        expect(controller).toBeDefined();
    });



});
