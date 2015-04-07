(function () {
    'use strict';

    var app = angular.module('amigos');

    app.controller("ShellController", function ($http, $location, $mdSidenav, $mdBottomSheet, $log, $q) {
        var vm = this;

        vm.messages = [];

        vm.toggleSideMenu = toggleSideMenu;

        function toggleSideMenu() {
            var pending = $mdBottomSheet.hide() || $q.when(true);

            pending.then(function () {
                $mdSidenav('left').toggle();
            });
        }

        function login() {
            $location.path('/login');
        }

    });

})();