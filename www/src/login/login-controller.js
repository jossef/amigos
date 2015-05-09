(function () {
    'use strict';

    var app = angular.module('amigos');

    app.controller("LoginController", function ($scope, loginService, commonService, interactiveService) {
        var vm = this;

        vm.phone = '';
        vm.password = '';
        vm.gender = 'male';
        vm.isKosher = false;
        vm.isVegetarian = false;
        vm.isVegan = false;

        vm.login = function (isValid) {

            if (!isValid) {
                interactiveService.showMessage("You need to correct the given information");
                return;
            }

            loginService
                .login(vm.phone, vm.password)
                .success(function (user) {
                    interactiveService.showMessage("Logged in successfully");
                    commonService.refreshInfo().success(function () {
                        commonService.redirect('home');
                    });
                })
                .error(commonService.errorHandler);
        };

        vm.register = function (isValid) {

            if (!isValid) {
                interactiveService.showMessage("You need to correct the given information");
                return;
            }

            var user = {
                phone: vm.phone,
                nickname: vm.nickname,
                password: vm.password,
                isKosher: vm.isKosher,
                isVegetarian: vm.isVegetarian,
                isVegan: vm.isVegan,
                gender: vm.gender
            };

            loginService
                .register(user)
                .success(function (user) {
                    interactiveService.showMessage("Welcome!");
                    commonService.refreshInfo().success(function () {
                        commonService.redirect('home');
                    });
                })
                .error(commonService.errorHandler);
        };

    });

})();