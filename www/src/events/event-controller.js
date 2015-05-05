(function () {
    'use strict';

    var app = angular.module('amigos');

    app.controller("EventController", function ($scope, $timeout, $ionicTabsDelegate, $stateParams, eventService, geoNavigationService, commonService, $ionicScrollDelegate, amigosSocket) {
        var vm = this;
        var eventId = $stateParams.id;


        vm.switchTab = function (index) {
            $ionicTabsDelegate.select(index);
        };

        $timeout(function(){
            vm.switchTab(1);
        });

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

        eventService.getEvent(eventId)
            .success(function (event) {
                vm.event = event;

                if (!event) {
                    return;
                }

                if (event.location && event.location.latitude && event.location.longitude) {
                    setLocation(event.location.longitude, event.location.latitude)
                }

                scrollToBottom();

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

        // ..............................

        $scope.$watch(commonService.getUser, function (user) {
            vm.user = user;
        });

        vm.sendMessage = function (message) {
            eventService.addEventMessage(eventId, {
                message: message,
                type: 'text'
            });
        };

        var scrollToBottom = function(){
            $ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(true);
        };

        vm.onChatSelected = function(){
            $timeout(scrollToBottom);
        };

        amigosSocket.on('reload', function () {
            console.log('reloaded');
            eventService.getEventMessages(eventId)
                .success(function (messages) {
                    vm.event.messages = messages;
                    scrollToBottom();
                });
        });


    });

})();