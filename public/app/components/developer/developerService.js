
angular
    .module('devshop.developer')
    .factory('developerService', [
    '$http',
    'serviceConfig',
    function ($http) {
        function getGitHubUsers(i){
            return $http({
                method: 'GET',
                url: "https://api.github.com/users",
                params: {per_page: 4, since: i},


            })
            //return $http.get("https://api.github.com/search/users?q=" + query);
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