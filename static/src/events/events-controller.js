(function () {
    'use strict';

    var app = angular.module('amigos');

    app.controller("EventsController", function ($scope, eventService) {
        var vm = $scope;

        eventService.getEvents()
            .success(function (events) {
                vm.events = events;
            });

    });

})();