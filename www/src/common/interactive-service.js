(function () {
    'use strict';

    var app = angular.module('amigos');

    var showingAlert = false;

    app.service('interactiveService', InteractiveService);
    function InteractiveService($q, $ionicPopup, lifecycleService) {

        return {
            showToast: showToast,
            showMessage: showMessage,
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

    }

})();
