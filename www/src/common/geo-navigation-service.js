(function () {
    'use strict';

    var app = angular.module('amigos');

    app.service('geoNavigationService', GeoNavigationService);


    function GeoNavigationService($q, commonService, geolocation) {

        return {
            getCurrentLocation: getCurrentLocation
        };

        // ........

        function getCurrentLocation() {
            var def = $q.defer();

            geolocation.getLocation()
                .then(function (data) {
                    def.resolve({latitude: data.coords.latitude, longitude: data.coords.longitude});
                }, def.reject);

            return def.promise;
        }
    }

})();
