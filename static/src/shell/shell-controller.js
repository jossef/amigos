(function () {
    'use strict';

    var app = angular.module('amigos');

    app.controller("ShellController", function ($scope, $http, commonService, $mdSidenav, $mdBottomSheet, $log, $q) {
        var vm = this;

        vm.messages = [];
        vm.login = login;
        vm.redirect = redirect;

        $scope.$watch(commonService.getTheme, function (theme) {
            vm.theme = theme;
        });

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

        function redirect(name) {
            commonService.redirect(name);
            $mdSidenav('left').close();
        }


        $scope.toppings = [
            {name: 'Pepperoni', wanted: true},
            {name: 'Sausage', wanted: false},
            {name: 'Black Olives', wanted: true},
            {name: 'Green Peppers', wanted: false}
        ];
        $scope.settings = [
            {name: 'Wi-Fi', extraScreen: 'Wi-fi menu', icon: 'device:network-wifi', enabled: true},
            {name: 'Bluetooth', extraScreen: 'Bluetooth menu', icon: 'device:bluetooth', enabled: false},
        ];
        $scope.messages = [
            {id: 1, title: "Message A", selected: false},
            {id: 2, title: "Message B", selected: true},
            {id: 3, title: "Message C", selected: true},
        ];
        $scope.people = [
            {name: 'Janet Perkins', newMessage: true},
            {name: 'Mary Johnson', newMessage: false},
            {name: 'Peter Carlsson', newMessage: false}
        ];
        $scope.goToPerson = function (person) {
            alert('Inspect ' + person);
        };
        $scope.navigateTo = function (to) {
            alert('Imagine being taken to ' + to);
        };
        $scope.doSecondaryAction = function () {
            alert('Seconday action clicked');
        };


    });

})();