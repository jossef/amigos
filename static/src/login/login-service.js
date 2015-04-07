(function () {
    'use strict';

    angular.module('amigos')
        .service('loginService', LoginService);

    function LoginService($http) {

        return {
            login: login
        };

        // ............


        function login(email,password) {
            var data = {
                email: email,
                password: password
            };

            var json = angular.toJson(data);
            return $http.post('/api/login/', json);
        }
    }

})();
