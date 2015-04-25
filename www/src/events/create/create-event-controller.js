(function () {
    'use strict';

    var app = angular.module('amigos');

    app.controller("CreateEventController", function ($scope, $state, eventService, commonService) {
        var vm = this;

        vm.newEvent = {};
        vm.step = 0;

        vm.nextStep = function(){
            vm.step += 1;
        };

        vm.previewsStep = function(){
            vm.step -= 1;
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

        vm.isActive = function(name){
            return $state.includes(name)
        }

    });

})();