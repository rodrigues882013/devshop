
angular
    .module('devshop.developer')
    .controller('DeveloperController', [
        '$scope',
        'mainService',
        'developerService',
        'notify',
        function ($scope, mainService, developerService, notify){

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
            developerCtrl.page = 0;
            developerCtrl.since = 0;


            developerCtrl.userWasSelect = function(selected){
                console.info("Developer was selected.");
                developerCtrl.selectedElement = selected;
            };

            developerCtrl.addCart = function(developer){
                
                console.info("Adding developer in cart");
                console.info("Developer: %s", developer);

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
                }
            };

            developerCtrl.calculatePrice = function(followers, public_repos, public_gists, following){
                console.info("Calculating price of developer.");

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
                        console.info("Developers load with successful")
                        angular.forEach(response['data'], function(elem){

                            developerService.getFellowers(elem['login'])
                                .then(function(response2){
                                    console.info("Getting more data about developer")

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
                                    console.error("Error in load developer from GitHub");
                                })
                            
                        })

                        // Update the since parameter with last resource (id) fetched and in the next 
                        // call to api, use it like limit (floor) to query   
                        developerCtrl.page = response['data'][response['data'].length-1].id;
                        developerCtrl.since++;
                        
                    }, function(){

                    })
                    
                
            };

            developerCtrl.load();

        }]);