

'use strict';

describe('CartControllerTest', function() {

   //Load module, before anything
    beforeEach(module('devshop'));
    beforeEach(module('devshop.cart'));
    beforeEach(module('cgNotify'));





    // Some stuffs that we'll need
    var $controller;
    var $rootScope;
    var $scope;
    var cartService;
    var mainService;
    var controller;
    var notify;

    function createController(){
        controller = $controller('CartController',
            {
                $scope: $scope,
                cartService: cartService,
                mainService: mainService,
                notify: notify

            });
    }

    

    //Inject some dependencies too.
    beforeEach(inject(function(_$controller_, _$rootScope_, _mainService_, _cartService_, $injector){
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        cartService = _cartService_;
        mainService = _mainService_;
        notify = $injector.get('notify');
        

        //Creating a new scope, descendant of $rootScope
        $scope = $rootScope.$new();

    }));



    it('Testing if controller is valid', function(){
        createController();
        expect(controller).toBeDefined();
    });

    it('Testing variable are initialized correctly', function(){
        createController();

        expect(controller.developers).toEqual([])
        expect(controller.cart).toEqual({})
        expect(controller.total).toEqual(0);
        expect(controller.coupon).toBeUndefined();
        expect(controller.isValid).toBeUndefined();
        expect(controller.portionDiscounted).toEqual(0);
    })

    it('Testing if methods was defined', function(){
        createController();

        expect(controller.validateCoupon).toBeDefined();
        expect(controller.removeCoupon).toBeDefined();
        expect(controller.getCurrentCart).toBeDefined();
        expect(controller.makeOrder).toBeDefined();
        expect(controller.removeDeveloper).toBeDefined();
        expect(controller.clearCart).toBeDefined();
      
    })

    it('Testing method behaviors', function(){

    })



});
