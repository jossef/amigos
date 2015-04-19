(function () {
    'use strict';

    var app = angular.module('amigos');

    app.controller("LoginController", function ($scope, loginService, commonService, $cordovaLocalNotification) {
        var vm = this;

        vm.email = '';
        vm.password = '';

        vm.login = function () {
            loginService
                .login(vm.email, vm.password)
                .success(function (user) {
                    commonService.showMessage("Logged in successfully");
                    commonService.loggedInUser = user;
                    commonService.redirect('home');
                })
                .error(commonService.errorHandler);
        };

        vm.register = function () {
            loginService
                .register(vm.email, vm.password)
                .success(function (user) {
                    commonService.showMessage("Welcome!");
                    commonService.loggedInUser = user;
                    commonService.redirect('home');
                })
                .error(commonService.errorHandler);
        };

        vm.notify = function(){
            var alarmTime = new Date();
            $cordovaLocalNotification.add({
                id: "1234",
                date: alarmTime,
                message: "Hello sir!",
                title: "מה שלומך חבר?"
            }).then(function () {
                console.log("The notification has been set");
            });
        }

    });

})();