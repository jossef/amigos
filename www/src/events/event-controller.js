(function () {
    'use strict';

    var app = angular.module('amigos');

    app.controller("EventController", function ($scope, $stateParams, eventService, geoNavigationService, commonService, $ionicScrollDelegate) {
        var vm = this;

        vm.mapMarker = {
            location: {
                latitude: 0,
                longitude: 0
            }
        };

        vm.mapOptions = {
            draggable: true
        };

        // Default location - Tel Aviv
        vm.mapCenter = {latitude: 34.77056443691254, longitude: 32.08776046606412};
        vm.mapZoom = 15;

        eventService.getEvent($stateParams.id)
            .success(function (event) {
                vm.event = event;

                if (!event) {
                    return;
                }

                if (event.location && event.location.latitude && event.location.longitude) {
                    setLocation(event.location.longitude, event.location.latitude)
                }

            });

        function setLocation(longitude, latitude) {
            vm.mapCenter.latitude = latitude;
            vm.mapCenter.longitude = longitude;

            vm.mapMarker.location.latitude = latitude;
            vm.mapMarker.location.longitude = longitude;
        }

        vm.navigate = function () {
            if (!vm.event) {
                return;
            }

            geoNavigationService.navigateToLocation(vm.event.location.longitude, vm.event.location.latitude);
        };

        vm.messages = [];

        vm.sendMessage = function (message) {
            var d = new Date();
            d = d.toLocaleTimeString().replace(/:\d+ /, ' ');

            // TODO use watch
            var user = commonService.getUser();
            vm.user = user;

            vm.messages.push({
                phone: user.phone + (vm.messages.length % 2 == 0 ? '' : '2'),
                text: message,
                time: d
            });

            $ionicScrollDelegate.scrollBottom(true);
        };


    });

})();