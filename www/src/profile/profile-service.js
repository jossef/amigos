(function () {
    'use strict';

    angular.module('amigos')
        .service('profileService', ProfileService);

    function ProfileService($http, commonService) {

        return {
            getProfile: getProfile,
            updateProfile: updateProfile
        };

        // ............

        function getProfile() {
            return $http.get(commonService.baseApi + '/api/profile/');
        }

        function updateProfile(data) {
            var json = angular.toJson(data);
            return $http.post(commonService.baseApi + '/api/profile/', json);
        }

    }

})();
