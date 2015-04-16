(function () {
    'use strict';

    var app = angular.module('amigos');

    app.service('commonService', CommonService);

    var baseApi = '';

    function CommonService($location, $ionicPopup, $window, routingService) {

        return {
            showMessage: showMessage,
            showAlert: showAlert,

            isFirstTime: isFirstTime,
            setFirstTime: setFirstTime,

            errorHandler: errorHandler,
            redirect: redirect,
            baseApi: baseApi,

            clearStorage: clearStorage,
            storageGet: storageGet,
            storageSet: storageSet

        };

        function showAlert(title, content) {
            return $ionicPopup.alert({
                title: title,
                template: content
            });
        }

        function showMessage(text) {
            // TODO use toast

            showAlert('Hey', text);
        }

        function errorHandler(error) {
            // TODO perhaps show error messages for each case;
            //      e.g. internet connectivity error

            var message = (error && error.userMessage) || 'Oops! that operation just failed :(';
            showAlert("Failed", message);
        }

        function redirect(name) {
            var route = routingService.routes[name];
            $location.path(route.path);
        }

        function clearStorage() {
            $window.localStorage.clear();
            console.log('local storage cleared');
        }

        function storageSet(key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        }

        function storageGet(key, defaultValue) {
            var value = $window.localStorage[key] || defaultValue;
            if (value == undefined)
            {
                return null;
            }

            return JSON.parse(value);
        }

        function isFirstTime() {
            var firstTime = storageGet('user:first-time');
            return !firstTime;
        }

        function setFirstTime(value) {
            storageSet('user:first-time', value);
        }

    }

})();
