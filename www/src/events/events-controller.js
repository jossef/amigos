(function () {
    'use strict';

    var app = angular.module('amigos');

    app.controller("EventsController", function ($scope, $ionicPopover, eventService, amigosSocket, commonService) {
        var vm = this;

        // Popover ( a.k.a dropdown )
        // ----------------------------------

        $ionicPopover.fromTemplateUrl('src/events/events-dropdown-view.html', {
            scope: $scope
        }).then(function (popover) {
            vm.popover = popover;
        });

        // ----------------------------------

        vm.getEvents = function () {
            eventService.getEvents()
                .success(function (events) {
                    vm.events = events;
                })
                .finally(function () {
                    // Stop the ion-refresher from spinning
                    $scope.$broadcast('scroll.refreshComplete');
                });
        };

        vm.getEvents();

        vm.createEvent = function () {
            commonService.redirect('events.create');
        };

        amigosSocket.on('reload', function () {
            console.log('reloaded in events ');
            vm.getEvents();
        });


    });

})();