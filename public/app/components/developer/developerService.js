
angular
    .module('devshop.developer')
    .factory('developerService', [
        '$http',
        'serviceConfig',
        function ($http) {
            function getGitHubUsers(id){
                return $http({
                    method: 'GET',
                    url: "https://api.github.com/users",
                    //params: {per_page: 4, since: id},
                    params: {per_page: 100, since: id},

                })
            }

            function getFellowers(user){
                return $http({
                    method: 'GET',
                    url: "https://api.github.com/users/" + user,
                })
            }

            return {
                getGitHubUsers: getGitHubUsers,
                getFellowers: getFellowers
            }
        }]);