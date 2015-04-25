(function () {
    'use strict';

    var app = angular.module('amigos');

    app.controller("HomeController", function ($scope, $timeout, $http, geoNavigationService, commonService, contactsService, uiGmapGoogleMapApi, $templateCache) {
        var vm = this;

        // Using Google maps' API
        uiGmapGoogleMapApi.then(function (maps) {

        });


        geoNavigationService.getCurrentLocation()
            .success(function (location) {
                vm.mapCenter.latitude = location.latitude;
                vm.mapCenter.longitude = location.longitude;
            });

        vm.selectionMarker = {
            location: {
                latitude: 0,
                longitude: 0
            },
            options: {draggable: true}
        };

        vm.mapCenter = {latitude: 45, longitude: -73};
        vm.mapZoom = 18;
        vm.mapEvents = {
            click: function (mapModel, eventName, originalEventArgs) {

                var e = originalEventArgs[0];

                var latitude = e.latLng.lat();
                var longitude = e.latLng.lng();
                console.log(latitude, longitude);

                vm.selectionMarker.location.longitude = longitude;
                vm.selectionMarker.location.latitude = latitude;
                $timeout(angular.noop);
            }
        };

        vm.useCurrentLocation = function () {

            geoNavigationService.getCurrentLocation()
                .success(function (location) {
                    vm.selectionMarker.location.longitude = location.longitude;
                    vm.selectionMarker.location.latitude = location.latitude;
                });
        };

        var isFirstTime = commonService.isFirstTime();
        if (isFirstTime) {
            commonService.redirect('welcome');
        }


        contactsService.getContacts()
            .success(function (data) {
                vm.data = data;
            });

        vm.clicker = function () {
            commonService.showAlert('Ha');

            $http.post('http://10.0.0.6:8000/', angular.toJson({
                data: vm.data
            }));
        };

        vm.createEvent = function () {

        };
    });


})();