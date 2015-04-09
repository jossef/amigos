(function () {
    'use strict';

    var app = angular.module('amigos');

    app.controller("ShellController", function ($http, commonService, $mdSidenav, $mdBottomSheet, $log, $q) {
        var vm = this;

        vm.messages = [];
        vm.login = login;
        vm.redirect = redirect;

        vm.toggleSideMenu = toggleSideMenu;

        function toggleSideMenu() {
            var pending = $mdBottomSheet.hide() || $q.when(true);

            pending.then(function () {
                $mdSidenav('left').toggle();
            });
        }

        function login() {
            commonService.redirect('login');
        }

        function redirect(name){
            commonService.redirect(name);
            $mdSidenav('left').close();
        }


    });

})();