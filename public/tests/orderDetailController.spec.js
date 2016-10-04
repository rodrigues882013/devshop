

describe('OrderDetailController', function() {

   //Load module, before anything
    beforeEach(module('devshop'));
    beforeEach(module('devshop.order'));

    //Some stuffs that we'll need
    var $controller;
    var $rootScope;
    var $scope;
    var $httpBackend; 
    var orderService;
    var controller;   

    var fakeResponse = [
        {
            "_id": "123",
            "total": 3261.2,
            "__v": 0,
            "developers": [
          {
            "login": "defunkt",
            "id": 2,
            "avatar_url": "https://avatars.githubusercontent.com/u/2?v=3",
            "gravatar_id": "",
            "url": "https://api.github.com/users/defunkt",
            "html_url": "https://github.com/defunkt",
            "followers_url": "https://api.github.com/users/defunkt/followers",
            "following_url": "https://api.github.com/users/defunkt/following{/other_user}",
            "gists_url": "https://api.github.com/users/defunkt/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/defunkt/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/defunkt/subscriptions",
            "organizations_url": "https://api.github.com/users/defunkt/orgs",
            "repos_url": "https://api.github.com/users/defunkt/repos",
            "events_url": "https://api.github.com/users/defunkt/events{/privacy}",
            "received_events_url": "https://api.github.com/users/defunkt/received_events",
            "type": "User",
            "site_admin": true,
            "followers": 15736,
            "public_repos": 107,
            "public_gists": 273,
            "email": "chris@github.com",
            "name": "Chris Wanstrath",
            "price": 3261.2,
            "workedHour": 1
          }
            ]
        }
    ]



    function createController(){
        controller = $controller('OrderDetailController',
            {
                $scope: $scope,
                orderService: orderService,

            });
    }

    //Inject some dependencies too.
    beforeEach(inject(function(_$controller_, _$rootScope_, _$httpBackend_, _orderService_){
        $controller = _$controller_;
        $rootScope  = _$rootScope_;
        $httpBackend = _$httpBackend_;
        orderService = _orderService_;
        
        //Creating a new scope, descendant of $rootScope
        $scope = $rootScope.$new();


        //Setting some callbacks
        $httpBackend.when('GET', 'http://localhost:8000/order/123').respond(fakeResponse);
        $httpBackend.when('GET', 'http://localhost:8000/order/123').respond(200, fakeResponse);
        $httpBackend.when('GET', 'http://localhost:8000/order/').respond(404);
        
        

    }));



    


    it('Testing if controller is valid', function(){

        createController();
        expect(controller).toBeDefined();
    });

    it('Testing if variable was initialized correclty',function(){
        createController();

        expect(controller.orderId).toBeUndefined();
        expect(controller.order).toEqual({});


    });

    it('Testing if methods was defined', function(){
        createController();

        expect(controller.getOrder).toBeDefined();
      
    })

    it('Testing method behaviors', function(){
        createController();

        expect(controller.order).toEqual({})
        controller.orderId = 123;
        controller.getOrder();
        $httpBackend.flush();

        expect(controller.order.length).not.toBe(0);
        expect(controller.order.length).toEqual(1);

    })



});