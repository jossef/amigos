(function () {
    'use strict';

    var app = angular.module('amigos');

    app.controller("EventController", function ($scope, $timeout, $ionicTabsDelegate, $stateParams, eventService, geoNavigationService, commonService, $ionicScrollDelegate, amigosSocket, calendarService, contactsService) {
        var vm = this;
        var eventId = $stateParams.id;

        eventService.getEvent(eventId)
            .success(function (event) {
                vm.event = event;

                if (!event) {
                    return;
                }

                if (event.location && event.location.latitude && event.location.longitude) {
                    setLocation(event.location.longitude, event.location.latitude)
                }

                getEventMessages();
            });

        function getEventMessages() {

            eventService.getEventMessages(eventId)
                .success(function (messages) {
                    vm.messages = messages;
                    scrollToBottom();
                });
        }

        // ..............................
        // Map

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

        function setLocation(longitude, latitude) {
            vm.mapCenter.latitude = latitude;
            vm.mapCenter.longitude = longitude;

            vm.mapMarker.location.latitude = latitude;
            vm.mapMarker.location.longitude = longitude;
        }

        vm.navigate = function () {
            if ((!vm.event.location.latitude) && (!vm.event.location.longitude)) {
                return;
            }

            geoNavigationService.navigateToLocation(vm.event.location.longitude, vm.event.location.latitude);
        };

        // ..............................
        // Chat

        $scope.$watch(commonService.getUser, function (user) {
            vm.user = user;
        });

        vm.sendMessage = function (message) {
            eventService.addEventMessage(eventId, {
                message: message,
                type: 'text'
            }).success(vm.onChatSelected);
        };

        var scrollToBottom = function () {
            $ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(true);
        };

        vm.onChatSelected = function () {
            $timeout(scrollToBottom);
        };

        amigosSocket.on('reload', function () {
            console.log('reloaded in event ', eventId);
            getEventMessages();
        });

        vm.showOnCalendar = function (date) {
            calendarService.openCurrentDateInCalendar(date);
        };

        // ..............................
        // Participants

        vm.pickFriend = function () {
            contactsService.pickContact()
                .success(function (contact) {

                    if (!contact || !contact.phone || !contact.name) {
                        commonService.alert('no contact selected');
                    }

                    //TODO: SAVE TO DB WITH JOSSEF'S FUNCTION

                    /*vm.friends[contact.phone] = {
                        name: contact.name,
                        phone: contact.phone
                    };*/

                });
        };

        // ..............................
        // Other

        vm.switchTab = function (index) {
            $ionicTabsDelegate.select(index);
        };

        // For more info: https://github.com/driftyco/ionic/issues/2320
        vm.scrollWorkaround = function () {
            $ionicScrollDelegate.resize();
        }
    });

})();