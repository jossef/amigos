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

            var data = notification.id && notification.id.data;

            if (data) {

                // Data retrieved as json string
                data = JSON.parse(data);

                var type = data.type;

                if (type == 'chat') {
                    commonService.changeState('event', {id: data.event.id});
                    return;
                }

                if (type == 'new-event') {
                    commonService.redirect('events');
                    return;
                }

            }

            // If we got to this line, something broke down. let's show a debug message
            interactiveService.showAlert(JSON.stringify(notification));

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