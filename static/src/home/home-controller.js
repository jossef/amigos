(function () {
    'use strict';

    var app = angular.module('amigos');

    app.controller("HomeController", function ($scope, $mdDialog) {
        var vm = $scope;

        vm.alert = '';
        vm.showAlert = function (ev) {
            // Appending dialog to document.body to cover sidenav in docs app
            // Modal dialogs should fully cover application
            // to prevent interaction outside of dialog

            var alert = $mdDialog.alert();
            alert = alert.parent(angular.element(document.body));
            alert = alert.title('This is an alert title');
            alert = alert.content('You can specify some description text in here.');
            alert = alert.ariaLabel('Alert Dialog Demo');
            alert = alert.ok('Got it!');
            alert = alert.targetEvent(ev);

            $mdDialog.show(alert);
        };
    });


})();