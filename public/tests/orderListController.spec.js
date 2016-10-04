

'use strict';

describe('OrderControllerTest', function() {

   //Load module, before anything
    beforeEach(module('devshop'));
    beforeEach(module('devshop.order'));

    //Some stuffs that we'll need
    var $controller;
    var $rootScope;
    var $scope;
    var $httpBackend; 
    var orderService;
    var mainService;
    var controller;   

    var fakeResponse = [
      {
        "_id": "57f00de51dfd656143000001",
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
      },
      {
        "_id": "57f0624c2fd12db46d000001",
        "total": 1649.5,
        "__v": 0,
        "developers": [
          {
            "login": "pjhyett",
            "id": 3,
            "avatar_url": "https://avatars.githubusercontent.com/u/3?v=3",
            "gravatar_id": "",
            "url": "https://api.github.com/users/pjhyett",
            "html_url": "https://github.com/pjhyett",
            "followers_url": "https://api.github.com/users/pjhyett/followers",
            "following_url": "https://api.github.com/users/pjhyett/following{/other_user}",
            "gists_url": "https://api.github.com/users/pjhyett/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/pjhyett/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/pjhyett/subscriptions",
            "organizations_url": "https://api.github.com/users/pjhyett/orgs",
            "repos_url": "https://api.github.com/users/pjhyett/repos",
            "events_url": "https://api.github.com/users/pjhyett/events{/privacy}",
            "received_events_url": "https://api.github.com/users/pjhyett/received_events",
            "type": "User",
            "site_admin": true,
            "followers": 8204,
            "public_repos": 8,
            "public_gists": 21,
            "email": "pj@hyett.com",
            "name": "PJ Hyett",
            "price": 1649.5,
            "workedHour": 1
          }
        ]
      },
      {
        "_id": "57f062c665b87f236e000001",
        "total": 1649.5,
        "__v": 0,
        "developers": [
          {
            "login": "pjhyett",
            "id": 3,
            "avatar_url": "https://avatars.githubusercontent.com/u/3?v=3",
            "gravatar_id": "",
            "url": "https://api.github.com/users/pjhyett",
            "html_url": "https://github.com/pjhyett",
            "followers_url": "https://api.github.com/users/pjhyett/followers",
            "following_url": "https://api.github.com/users/pjhyett/following{/other_user}",
            "gists_url": "https://api.github.com/users/pjhyett/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/pjhyett/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/pjhyett/subscriptions",
            "organizations_url": "https://api.github.com/users/pjhyett/orgs",
            "repos_url": "https://api.github.com/users/pjhyett/repos",
            "events_url": "https://api.github.com/users/pjhyett/events{/privacy}",
            "received_events_url": "https://api.github.com/users/pjhyett/received_events",
            "type": "User",
            "site_admin": true,
            "followers": 8204,
            "public_repos": 8,
            "public_gists": 21,
            "email": "pj@hyett.com",
            "name": "PJ Hyett",
            "price": 1649.5,
            "workedHour": 1
          }
        ]
      }
    ]



    function createController(){
        controller = $controller('OrderController',
            {
                $scope: $scope,
                orderService: orderService,
                mainService: mainService,

            });
    }

    //Inject some dependencies too.
    beforeEach(inject(function(_$controller_, _$rootScope_, _$httpBackend_, _mainService_, _orderService_){
        $controller = _$controller_;
        $rootScope  = _$rootScope_;
        $httpBackend = _$httpBackend_;
        mainService = _mainService_;
        orderService = _orderService_;
        
        //Creating a new scope, descendant of $rootScope
        $scope = $rootScope.$new();


        //Setting some callbacks
        $httpBackend.when('GET', 'http://localhost:8000/orders/').respond(fakeResponse);
        $httpBackend.when('GET', 'http://localhost:8000/orders/').respond(200, fakeResponse);
        
        

    }));



    


    it('Testing if controller is valid', function(){

        createController();
        expect(controller).toBeDefined();
    });

    it('Testing if variable was initialized correclty',function(){
        createController();

        expect(controller.orders).toEqual([]);

    });

    it('Testing if methods was defined', function(){
        createController();

        expect(controller.getOrders).toBeDefined();
        expect(controller.detail).toBeDefined();
      
    })

    it('Testing method behaviors', function(){
        createController();

        expect(controller.orders).toEqual([])
        controller.getOrders();
        $httpBackend.flush();

        expect(controller.orders.length).not.toBe(0);
        expect(controller.orders.length).toEqual(3);
        
        

    })



});


