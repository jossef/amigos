(function () {
    'use strict';

    angular.module('amigos')
        .service('loginService', LoginService);

    function LoginService($http, commonService) {

        return {
            login: login,
            logout: logout,
            register: register,
            validatePhone: validatePhone
        };

        // ............


        function validatePhone(phone) {
            var data = {
                phone: phone
            };

            var json = angular.toJson(data);
            return $http.post(commonService.baseApi + '/api/validate/phone', json);
        }

        function login(phone, password) {
            var data = {
                phone: phone,
                password: password
            };

            var json = angular.toJson(data);
            return $http.post(commonService.baseApi + '/api/login/', json);
        }


        function logout() {
            return $http.get(commonService.baseApi + '/api/logout');
        }

        function register(user) {
            var json = angular.toJson(user);
            return $http.post(commonService.baseApi + '/api/register/', json);
        }
    }

})();
