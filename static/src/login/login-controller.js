(function () {
    'use strict';

    var app = angular.module('amigos');

    app.controller("LoginController", function ($scope, $mdDialog, $mdToast, loginService) {
        var vm = $scope;

        vm.login = function () {
            loginService.login(vm.username, vm.password)
                .success(function () {

                    $mdToast.show(
                        $mdToast.simple()
                            .content('logged in successfully')
                            .position('bottom')
                            .hideDelay(3000)
                    );

                });


        };

        vm.showAlert = function (ev) {
            // Appending dialog to document.body to cover sidenav in docs app
            // Modal dialogs should fully cover application
            // to prevent interaction outside of dialog
            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.body))
                    .title('This is an alert title')
                    .content('You can specify some description text in here.')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('Got it!')
                    .targetEvent(ev)
            );
        };

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