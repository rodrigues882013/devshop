
angular
    .module('devshop.developer')
    .controller('DeveloperController', [
        '$rootScope',
        '$scope',
        '$timeout',
        '$log',
        'mainService',
        'developerService',
        'notify',
        function ($rootScope, $scope, $timeout, $log, mainService, developerService, notify){

            //Controller As syntax
            var developerCtrl = this;
            
            // Setting up some stuffs
            developerCtrl.itemArray = [];
            developerCtrl.elementsAutoComplete = [];
            developerCtrl.selectedElement = undefined;
            developerCtrl.selectedItem= developerCtrl.itemArray;
            developerCtrl.developer = {};
            developerCtrl.developer.workedHour = '';
            developerCtrl.developer.developerPrice = '';
            developerCtrl.workedHour = {};
            developerCtrl.workedHour.value = ''
            developerCtrl.developers = [];
            developerCtrl.developersIndexed = [];
            developerCtrl.developersOnScreen = []
            developerCtrl.page = 0;
            developerCtrl.since = 0;
            developerCtrl.maxSize = 5;
            developerCtrl.bigTotalItems = 175;
            developerCtrl.bigCurrentPage = 1;
            developerCtrl.totalItems = 0;
            developerCtrl.currentPage = 1;
            developerCtrl.isLoad = true;
            
            //Retrieving number of item in cart
            $rootScope.items = mainService.getItemLen();

            developerCtrl.setPage = function (pageNo) {
                developerCtrl.currentPage = pageNo;
            };

            developerCtrl.pageChanged = function() {
                developerCtrl.developersOnScreen = []
                developerCtrl.developersOnScreen = developerCtrl.developersIndexed[developerCtrl.currentPage-1]
                $log.info('Page changed to: ' + developerCtrl.currentPage);
            };


            developerCtrl.userWasSelect = function(selected){
                $log.info("Developer was selected.");
                developerCtrl.selectedElement = selected;
            };

            developerCtrl.addCart = function(developer){
                
                $log.info("Adding developer in cart");
                $log.info("Developer: %s", developer);

                //Check if at least one hour was typed
                if ( developer.workedHour == '' || angular.isUndefined(developer.workedHour)){
                    notify({
                        message: 'Digite a quantidade de horas trabalhada.',
                        classes: 'alert-danger',
                        templateUrl: developerCtrl.notifyTemplate
                    })
                } else {

                    var test = undefined;
                    var currentCart = mainService.getCart();

                    angular.forEach(currentCart, function(elem){
                        if(developer.id == elem.id){
                            elem.workedHour += developer.workedHour;
                            test = true;
                        }
                    })
                    
                    //Check if cart already exist, in affirmative case, cart is retrieved and updated
                    if (angular.isDefined(test)){
                        if (mainService.updateCart(currentCart)){
                            notify({
                                message: 'Carrinho atualizado.',
                                classes: 'alert-success',
                                templateUrl: developerCtrl.notifyTemplate
                            })
                        }
                    } else {

                        //In this case, cart is new
                        if (mainService.addItemInCart(developer)){
                            notify({
                                message: 'Desenvolvedor adicionado ao carrinho.',
                                classes: 'alert-success',
                                templateUrl: developerCtrl.notifyTemplate
                            })
                        }
                    }
                    $rootScope.items = mainService.getItemLen();
                }
            };

            developerCtrl.calculatePrice = function(followers, public_repos, public_gists, following){
                $log.info("Calculating price of developer.");

                //Weight averagewas used to calcaulate a price of one developer
                var weight_follower = followers*2
                var weight_following = following*2
                var weight_public_repos = public_repos*3
                var weight_public_gists = public_gists*3
                return ((weight_follower + weight_public_repos + weight_public_gists) / 10);
            }

            developerCtrl.load = function(){
                developerService.getGitHubUsers(developerCtrl.page)
                    .then(function (response) {
                        $log.info("Getting developer")
                        angular.forEach(response['data'], function(elem){

                            developerService.getFellowers(elem['login'])
                                .then(function(response2){
                                    

                                    // Adding more data on developer resource, in this case 
                                    // specifically to calculate price

                                    elem['followers'] = response2.data['followers'];
                                    elem['public_repos'] = response2.data['public_repos'];
                                    elem['public_gists'] = response2.data['public_gists'];
                                    elem['email'] = response2.data['email'];
                                    elem['name'] = response2.data['name'];
                                    elem['price'] = developerCtrl.calculatePrice(response2.data['followers'],
                                                                                 response2.data['public_repos'],
                                                                                 response2.data['public_gists'],
                                                                                 response2.data['following'])
                                    developerCtrl.developers.push(elem);
                                }, function(){
                                    $log.error("Error in load developer from GitHub");
                                })
                            
                        })

                        
                        // Setting up a little tim out to waiting all data 
                        $timeout(function(){
                            // Update the since parameter with last resource (id) fetched and in the next 
                            // to fetch another 100 user on github api
                            developerCtrl.page = response['data'][response['data'].length-1].id;
                            developerCtrl.since++;

                            //Setting total of pages
                            developerCtrl.totalItems = developerCtrl.developers.length
                            

                            /* Indexing item on page
                               The pages follow scheme below 
                               {
                                  page 0 => [0,   1,  2,  3],
                                  page 1 => [4,   5,  6,  7],
                                  page 2 => [8,   9, 10, 11],
                                  page 3 => [12, 13, 14, 15],
                                        .
                                        .
                                        .
                                  page n =>  [n*4, (n*4)+1, (n*4)+2, (n*4)+3]
                                }
                             */

                             // Setting first page
                            for (var i=0; i<4; i++){
                                if (i==0) {
                                    developerCtrl.developersIndexed[0] = []
                                }
                                developerCtrl.developersIndexed[0].push(developerCtrl.developers[i]);
                            }

                            // Setting nexts pages
                            for (var i=1, j=4, k=0; j<developerCtrl.totalItems; j++){
                                if (k==0)
                                    developerCtrl.developersIndexed[i] = [];
                                
                                developerCtrl.developersIndexed[i].push(developerCtrl.developers[j]);
                                
                                if (k == 3){
                                    i++;
                                    k=0;

                                } else{
                                    k++;
                                } 
                                
                            }

                            //Load first page
                            developerCtrl.pageChanged();
                            developerCtrl.isLoad = false;
        
                        }, 3000)
                        
                        
                    }, function(){

                    })
            };

            developerCtrl.load();

        }]);