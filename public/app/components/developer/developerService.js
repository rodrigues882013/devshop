
angular
    .module('devshop.developer')
    .factory('developerService', [
        '$http',
        '$log',
        'serviceConfig',
        function ($http, $log) {
            function getGitHubUsers(id){
                $log.info("Getting users")
                return $http({
                    method: 'GET',
                    url: "https://api.github.com/users",
                    params: {per_page: 100, since: id},

                })
            }

            
            function getMoreDataAboutUser(user){

                
                return $http({
                    method: 'GET',
                    url: "https://api.github.com/users/" + user,
                })
            }

            return {
                getGitHubUsers: getGitHubUsers,
                getMoreDataAboutUser: getMoreDataAboutUser
            }
        }]);