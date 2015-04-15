(function () {
    'use strict';

    var app = angular.module('amigos');

    app.controller("LoginController", function ($scope, loginService, commonService) {
        var vm = this;

        vm.email = '';
        vm.password = '';

        vm.login = function () {
            loginService
                .login(vm.email, vm.password)
                .success(function (user) {
                    commonService.showMessage("Logged in successfully");
                    commonService.redirect('home');
                })
                .error(commonService.errorHandler);
        };

        vm.register = function () {
            loginService
                .register(vm.email, vm.password)
                .success(function (user) {
                    commonService.showMessage("Welcome!");
                    commonService.redirect('home');
                })
                .error(commonService.errorHandler);
        };

    });

})();