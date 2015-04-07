(function () {
    'use strict';

    var app = angular.module('amigos');

    app.controller("LoginController", function ($scope, loginService, commonService) {
        var vm = $scope;

        vm.email = '';
        vm.password = '';

        vm.login = function () {
            loginService
                .login(vm.email, vm.password)
                .success(function (user) {
                    commonService.showMessage("Logged in successfully");
                    commonService.redirect('home');
                })
                .error(function(error){
                    commonService.showAlert("login failed", error.userMessage);
                });
        };

    });

})();