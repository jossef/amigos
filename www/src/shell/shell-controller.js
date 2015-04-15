(function () {
    'use strict';

    var app = angular.module('amigos');

    app.controller("ShellController", function ($scope, commonService) {
        var vm = this;

        vm.messages = [];
        vm.login = login;
        vm.redirect = redirect;

        $scope.$watch(commonService.getTheme, function (theme) {
            vm.theme = theme;
        });

        function login() {
            commonService.redirect('login');
        }

        function redirect(name) {
            commonService.redirect(name);
        }
    });

})();