(function () {
    'use strict';

    var app = angular.module('amigos');

    app.controller("EventsController", function ($scope, eventService, commonService) {
        var vm = $scope;

        eventService.getEvents()
            .success(function (events) {
                vm.events = events;
            });


        vm.createEvent = function(){
            commonService.redirect('create-event');
        };

    });

})();