(function () {
    'use strict';

    var app = angular.module('amigos');

    app.controller("CreateEventController", function ($scope, $timeout, $state, $ionicTabsDelegate, eventService, contactsService, commonService) {
        var vm = this;

        vm.newEvent = {};

        vm.switchTab = function (index) {
            $ionicTabsDelegate.select(index);
        };

        $timeout(function () {
            $ionicTabsDelegate.select(3);
        });


        vm.previewsStep = function () {
        };

        vm.friends = {};

        vm.eventTypes = eventService.eventTypes;

        vm.isActive = function (name) {
            return $state.includes(name)
        };

        vm.currentDate = new Date();
        vm.dates = {};

        vm.pickFriend = function () {
            contactsService.pickContact()
                .success(function(contact){

                    if (!contact || !contact.phone || !contact.name)
                    {
                        commonService.alert('no contact selected');
                    }

                    vm.friends[contact.phone] = {
                        name : contact.name,
                        phone : contact.phone
                    };

                });
        };

        vm.hasFriends = function () {
            return Object.keys(vm.friends).length != 0;
        };

        vm.removeFriend = function (key) {
            delete vm.friends[key];
        };


        vm.addDate = function (date) {
            vm.dates[date.getTime()] = date;
        };

        vm.hasDates = function () {
            return Object.keys(vm.dates).length != 0;
        };

        vm.removeDate = function (key) {
            delete vm.dates[key];
        };


        vm.event = {};

        vm.isComplete = function (name) {
            return !!vm.selectedEventType;
        }
    });

})();