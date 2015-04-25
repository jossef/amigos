(function () {
    'use strict';

    var app = angular.module('amigos');

    app.controller("EventController", function ($scope, $stateParams, eventService, commonService) {
        var vm = this;

        eventService.getEvent($stateParams.id)
            .success(function(event){
                vm.event = event;
            });
    });

})();