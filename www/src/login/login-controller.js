(function () {
    'use strict';

    var app = angular.module('amigos');

    app.controller("LoginController", function ($scope, loginService, commonService) {
        var vm = this;

        vm.phone = '';
        vm.password = '';

        vm.login = function (isValid) {

            if (!isValid) {
                commonService.showAlert('Hey!', "You need to correct the given information");
                return;
            }

            loginService
                .login(vm.phone, vm.password)
                .success(function (user) {
                    commonService.showMessage("Logged in successfully");
                    commonService.refreshInfo().success(function () {
                        commonService.redirect('home');
                    });
                })
                .error(commonService.errorHandler);
        };

        vm.register = function (isValid) {

            if (!isValid) {
                commonService.showAlert('Hey!', "You need to correct the given information");
                return;
            }

            loginService
                .register(vm.phone, vm.nickname, vm.password)
                .success(function (user) {
                    commonService.showMessage("Welcome!");
                    commonService.refreshInfo().success(function () {
                        commonService.redirect('home');
                    });
                })
                .error(commonService.errorHandler);
        };

    });

})();