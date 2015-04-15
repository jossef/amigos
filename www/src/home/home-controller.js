(function () {
    'use strict';

    var app = angular.module('amigos');

    app.controller("HomeController", function ($scope, commonService) {
        var vm = $scope;

        commonService.redirect('events');
    });


})();