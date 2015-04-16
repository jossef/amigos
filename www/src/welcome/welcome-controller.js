(function () {
    'use strict';

    var app = angular.module('amigos');

    app.controller("WelcomeController", function ($scope, commonService) {
        var vm = $scope;

        vm.skip = function () {
            commonService.setFirstTime(true);
            commonService.redirect('home');
        };

    });


})();