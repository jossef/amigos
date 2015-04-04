(function () {
    'use strict';

    angular.module('amigos')
        .service('loginService', LoginService);

    function LoginService($http) {

        return {
            login: login
        };

        // ............


        function login(username,password) {
            var data = {
                username: username,
                password: password
            };

            var json = angular.toJson(data);
            return $http.post('/api/login/', json);
        }
    }

})();
