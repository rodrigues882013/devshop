

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
    var $httpBackend;
    var fakeResponse = {isValid: false};

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
    beforeEach(inject(function(_$controller_, _$rootScope_, _$httpBackend_, _mainService_, _cartService_, $injector){
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;
        cartService = _cartService_;
        mainService = _mainService_;

        notify = $injector.get('notify');
        

        //Creating a new scope, descendant of $rootScope
        $scope = $rootScope.$new();

        //Setting some callbacks
        $httpBackend.when('POST', 'http://localhost:8000/order').respond(200);

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
        controller.coupon = '44444';
        controller.validateCoupon()
        expect(controller.isValid).toBe(false)

        controller.coupon = 'SHIPIT';
        controller.validateCoupon()
        expect(controller.isValid).toBe(true)

        controller.coupon = 'SHIPIT';
        controller.validateCoupon()
        expect(controller.isValid).toBe(true)
        controller.removeCoupon()
        expect(controller.isValid).toBeUndefined()

        expect(controller.developers.length).toBe(0)
        controller.getCurrentCart()
        expect(controller.developers.length).toBe(0)

        controller.developers = []
        controller.total = 5222
        controller.cart = {
            developers: controller.developers,
            total: controller.total
        }
        controller.makeOrder();
        $httpBackend.flush();
        expect(controller.cart).toEqual({})
        

    })



});
