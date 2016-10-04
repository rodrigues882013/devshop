

'use strict';

describe('DeveloperControllerTest', function() {

   //Load module, before anything
    beforeEach(module('devshop'));
    beforeEach(module('devshop.developer'));
    beforeEach(module('cgNotify'));

    //Some stuffs that we'll need
    var $controller;
    var $rootScope;
    var $scope;
    var developerService;
    var mainService;
    var controller;
    var notify;


    function createController(){
        controller = $controller('DeveloperController',
            {
                $scope: $scope,
                developerService: developerService,
                mainService: mainService,
                notify: notify
            });
    }



    //Inject some dependencies too.
    beforeEach(inject(function(_$controller_, _$rootScope_, $injector, _mainService_, _developerService_){
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        mainService = _mainService_;
        developerService= _developerService_;
        notify = $injector.get('notify');

        //Creating a new scope, descendant of $rootScope
        $scope = $rootScope.$new();

    }));



    it('Testing if controller is valid', function(){

        createController();
        expect(controller).toBeDefined();
    });

    it('Testing if variable was initialized correclty',function(){
        createController();

        expect(controller.itemArray).toEqual([]);
        expect(controller.elementsAutoComplete).toEqual([]);
        expect(controller.selectedElement).toBeUndefined();
        expect(controller.selectedItem).toEqual([]);
        expect(controller.developer).toEqual({workedHour: '', developerPrice: ''});
        expect(controller.developers).toEqual([]);
        expect(controller.developersIndexed).toEqual([]);
        expect(controller.developersOnScreen).toEqual([]);
        expect(controller.page).toEqual(0);
        expect(controller.since).toEqual(0);
        expect(controller.maxSize).toEqual(5);
        expect(controller.bigTotalItems).toEqual(175);
        expect(controller.bigCurrentPage).toEqual(1);
        expect(controller.totalItems).toEqual(0);
        expect(controller.currentPage).toEqual(1);
        expect(controller.isLoad).toBe(true);
        expect(controller.query).toEqual('');
    });

    it('Testing if methods was defined', function(){
        createController();

        expect(controller.setPage).toBeDefined();
        expect(controller.pageChanged).toBeDefined();
        expect(controller.addCart).toBeDefined();
        expect(controller.calculatePrice).toBeDefined();
        expect(controller.load).toBeDefined();
       
      
    })

    it('Testing method behaviors', function(){
        createController();

        controller.setPage(2);
        expect(controller.currentPage).toBe(2);

        // Test page changed
        controller.currentPage = 2;
        controller.developersIndexed = [1,2,3,4,5,6,7,8,9];
        controller.pageChanged();
        expect(controller.developersOnScreen.length).toBe(4)

    })



}); 