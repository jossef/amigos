(function () {
    'use strict';

    var app = angular.module('amigos');

    app.controller("CreateEventController", function ($scope, eventService, commonService) {
        var vm = $scope;

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

    });

})();