(function () {
    'use strict';

    var app = angular.module('amigos');

    app.controller("ShellController", function ($scope, commonService) {
        var vm = this;
        vm.redirect = commonService.redirect;
        vm.clearStorage = commonService.clearStorage;
    });

})();