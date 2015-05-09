(function () {
    'use strict';

    var app = angular.module('amigos');

    var showingAlert = false;

    var _onNotificationClicked;

    app.service('interactiveService', InteractiveService);
    function InteractiveService($q, $ionicPopup, $rootScope, $cordovaLocalNotification, lifecycleService) {


        $rootScope.$on("$cordovaLocalNotification:clicked", function (e, notification) {
            if (!_onNotificationClicked) {
                return;
            }

            _onNotificationClicked(notification);

        });

        return {
            showMessage: showMessage,
            showNotification: showNotification,
            setOnNotificationClicked: setOnNotificationClicked,
            showAlert: showAlert
        };

        // .................

        function showToast(message, duration, position) {
            var def = $q.defer();

            if (!duration) {
                duration = 'short';
            }

            if (!position) {
                position = 'bottom';
            }

            window.plugins.toast.show(message, duration, position, def.resolve, def.reject);

            return def.promise;
        }


        function setOnNotificationClicked(callback) {
            _onNotificationClicked = callback;
        }

        function showMessage(message) {

            if (lifecycleService.isNative()) {
                showToast(message, 'short', 'center');
            }
            else {
                showAlert('Hey', message);
            }
        }


        function showAlert(title, content) {

            if (showingAlert) {
                return;
            }

            showingAlert = true;

            return $ionicPopup.alert({
                title: title,
                template: content
            }).then(function () {
                showingAlert = false;
            });
        }


        function showNotification(notification) {

            if (lifecycleService.isNative()) {
                $cordovaLocalNotification.add({
                    id: notification.id,
                    title: notification.event.name,
                    text: notification.content.message,
                    date: new Date(notification.timestamp),
                    data: notification
                });
            }
            else {
                console.log("notification", notification);
            }
        }
    }

})();
