

'use strict';

describe('CartControllerTest', function() {

   //Load module, before anything
    beforeEach(angular.mock.module('devshop'));
    beforeEach(angular.mock.module('devshop.cart'));

    //Some stuffs that we'll need
    var $controller;
    var $rootScope;
    var $scope;
    var cartService;
    var mainService;
    var controller;


    function createController(){
        controller = $controller('cartCtrl',
            {
                $scope: $scope,
                cartService: cartService,
                mainService: mainService
            });
    }



    //Inject some dependencies too.
    beforeEach(angular.mock.inject(function(_$controller_, _$rootScope_){
        $controller = _$controller_;
        $rootScope = _$rootScope_;

        //Creating a new scope, descendant of $rootScope
        $scope = $rootScope.$new();

    }));



    it('Testing if controller is valid', function(){

        createController();
        expect(controller).toBeDefined();
    });



});
