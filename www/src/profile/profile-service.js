(function () {
    'use strict';

    angular.module('amigos')
        .service('profileService', ProfileService);

    function ProfileService($http, commonService) {

        return {
            getProfile: getProfile
        };

        // ............

        function getProfile() {

            // TODO get user from ?
            return $http.get(commonService.baseApi + '/api/profile/');
        }
    }

})();
