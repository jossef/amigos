(function () {
    'use strict';

    var app = angular.module('amigos');

    app.controller("ShellController", function ($scope, $timeout, loginService, commonService, interactiveService, amigosSocket) {
        var vm = this;
        vm.redirect = commonService.redirect;
        vm.clearStorage = commonService.clearStorage;

        vm.logout = function () {
            loginService.logout()
                .success(function () {
                    commonService.refreshInfo()
                        .success(function () {
                            commonService.clearHistory();
                            commonService.redirect('login');
                        });
                });
        };

        commonService.refreshInfo();

        vm.toggleMenu = function () {
            vm.sideMenuController.toggleLeft();
        };

        $scope.$watch(commonService.getInfo, function (info) {
            if (info && !info.user) {
                // Not logged in!
                console.log('Not logged in', info);
                commonService.redirect('login');
            }

            // TODO display not connected message / loading page / initializing

            vm.info = info;
        });


        $scope.$on('$routeChangeError', function (current, previous, rejection) {
            console.log("routeChangeError", currrent, previous, rejection);
        });

        $scope.$on('$routeChangeStart', function (next, current) {
            console.log("routeChangeStart");
            console.dir(next);
            console.dir(current);
        });

        $scope.$on('$routeChangeSuccess', function (current, previous) {
            console.log("routeChangeSuccess");
            console.dir(current);
            console.dir(previous);
        });

        $scope.$on('$routeUpdate', function (rootScope) {
            console.log("routeUpdate", rootScope);
        });


        amigosSocket.on('reload', function () {
            console.log('reloaded in shell');
            getNotifications();
        });


        // ....................................
        // Polling for notifications

        interactiveService.setOnNotificationClicked(function (notification) {
            interactiveService.showMessage(JSON.stringify(notification));
        });

        var getNotifications = function () {
            commonService.getNotifications()
                .success(function (notifications) {
                    notifications.forEach(function (notification) {
                        interactiveService.showNotification(notification);
                    });
                })
                .finally(getNotificationsTrigger);
        };

        var getNotificationsTrigger = function () {
            $timeout(getNotifications, 10 * 1000);
        };

        getNotifications();

    });

})();