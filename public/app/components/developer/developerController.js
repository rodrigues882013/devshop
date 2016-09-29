



angular
    .module('devshop.developer')
    .controller('DeveloperController', [
        '$scope',
        'mainService',
        'developerService',
        'notify',
        function ($scope, mainService, developerService, notify){
            var developerCtrl = this;
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

            developerCtrl.getGitHubUser = function(query){
                if (query != '') {
                    developerService.getGitHubUsers(query, developerCtrl.page)
                        .success(function (data) {
                            console.log(data);
                            developerCtrl.elementsAutoComplete = data.items;
                        });
                }
            };

            developerCtrl.loadDevelopersList = function(){
                developerService.getGitHubUsers('', developerCtrl.page)
                    .success(function (data) {
                        developerCtrl.developers = data.items;
                    });    
            };

            developerCtrl.userWasSelect = function(selected){
                console.log(selected);
                developerCtrl.selectedElement = selected;
            };

            developerCtrl.addCart = function(developer){
            
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
                    
                    if (angular.isDefined(test)){
                        if (mainService.updateCart(currentCart)){
                            notify({
                                message: 'Carrinho atualizado.',
                                classes: 'alert-success',
                                templateUrl: developerCtrl.notifyTemplate
                            })
                        }
                    } else {
                        if (mainService.addItemInCart(developer)){
                            notify({
                                message: 'Desenvolverdor adicionado ao carrinho.',
                                classes: 'alert-success',
                                templateUrl: developerCtrl.notifyTemplate
                            })
                        }
                    }
                }
            };

            developerCtrl.calculatePrice = function(followers, public_repos, public_gists, following){

                var weight_follower = followers*2
                var weight_following = following*2
                var weight_public_repos = public_repos*3
                var weight_public_gists = public_gists*3
                return ((weight_follower + weight_public_repos + weight_public_gists) / 10);
            }

            developerCtrl.load = function(){
                developerService.getGitHubUsers(developerCtrl.page)
                    .then(function (response) {
                        console.log(response)
                        angular.forEach(response['data'], function(elem){

                            developerService.getFellowers(elem['login'])
                            .then(function(response2){
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
                            }, function(){})
                            
                        })

                        developerCtrl.page = response['data'][response['data'].length-1].id;
                        developerCtrl.since++;
                        
                    }, function(){

                    })
                    
                
            };



            //developerCtrl.loadDevelopersList('');

            developerCtrl.load();

        }]);