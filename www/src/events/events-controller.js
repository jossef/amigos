(function () {
    'use strict';

    var app = angular.module('amigos');

    app.controller("EventsController", function ($scope, $ionicPopover, eventService, commonService) {
        var vm = this;

        // Popover ( a.k.a dropdown )
        // ----------------------------------

        $ionicPopover.fromTemplateUrl('src/events/events-dropdown-view.html', {
            scope: $scope
        }).then(function(popover) {
            vm.popover = popover;
        });

        // ----------------------------------

        eventService.getEvents()
            .success(function (events) {
                vm.events = events;
            });

        // TODO add this in logic
        vm.isEventAdmin = true;

        vm.createEvent = function(){
            commonService.redirect('events.create');
        };

    });

})();