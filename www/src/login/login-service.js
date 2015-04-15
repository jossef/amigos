(function () {
    'use strict';

    angular.module('amigos')
        .service('loginService', LoginService);

    function LoginService($http, commonService) {

        return {
            login: login,
            register: register
        };

        // ............


        function login(email,password) {
            var data = {
                email: email,
                password: password
            };

            var json = angular.toJson(data);
            return $http.post(commonService.baseApi + '/api/login/', json);
        }

        function register(email,password) {
            var data = {
                email: email,
                password: password
            };

            var json = angular.toJson(data);
            return $http.post(commonService.baseApi + '/api/register/', json);
        }
    }

})();
