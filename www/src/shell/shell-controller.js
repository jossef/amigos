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


        amigosSocket.on('reload', function () {
            console.log('reloaded in shell');
            getNotifications();
        });


        // ....................................
        // Notifications

        interactiveService.setOnNotificationClicked(function (notification) {

            var eventId = notification.data && notification.data.event && notification.data.event.id;

            if (eventId) {
                commonService.changeState('event', {id: eventId});
            }
            else {
                // TODO support more states
                commonService.redirect('events');
            }
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