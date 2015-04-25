(function () {
    'use strict';

    var app = angular.module('amigos');

    app.controller("CreateEventController", function ($scope, $state, $ionicTabsDelegate, eventService, commonService) {
        var vm = this;

        vm.newEvent = {};

        vm.switchTab = function(index){
            $ionicTabsDelegate.select(index);
        };

        vm.previewsStep = function(){
        };

        vm.friends = [
            {
                name: 'Osnat'
            },

            {
                name: 'Naama'
            },

            {
                name: 'Jossef'
            }
        ];

        vm.eventTypes = eventService.eventTypes;

        vm.isActive = function(name){
            return $state.includes(name)
        };

        vm.event = {};

        vm.isComplete = function(name)
        {
            return !!vm.selectedEventType;
        }
    });

})();