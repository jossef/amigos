(function () {
    'use strict';

    var app = angular.module('amigos');

    app.service('commonService', CommonService);

    var baseApi = '';
    var showingAlert = false;
    var _info;

    function CommonService($location, $http, $timeout, $ionicHistory, $ionicPopup, $window, routingService, errorHandlingService, $cordovaLocalNotification) {

        errorHandlingService.setCommunicationErrorHandler(handleCommunicationError);

        return {
            showMessage: showMessage,
            showAlert: showAlert,
            setNotification: setNotification,

            isFirstTime: isFirstTime,
            setFirstTime: setFirstTime,

            errorHandler: errorHandler,
            redirect: redirect,
            baseApi: baseApi,

            clearStorage: clearStorage,
            storageGet: storageGet,
            storageSet: storageSet,

            goBack: goBack,
            clearHistory: clearHistory,

            isNative: isNative,

            getInfo: getInfo,
            refreshInfo: refreshInfo
        };

        // .................

        function goBack(){
            $ionicHistory.goBack();
        }

        function clearHistory(){
            $ionicHistory.clearHistory();
        }

        function setNotification(id, title, message) {

            var alarmTime = new Date();
            $cordovaLocalNotification.add({
                id: id,
                date: alarmTime,
                message: title,
                title: message
            }).then(function () {
                console.log("The notification has been set");
            });

        }

        function handleCommunicationError() {
            showAlert('No internet connection','please check your internet connection and try again');
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

        function getInfo() {
            return _info;
        }

        function refreshInfo() {
            return $http.get(baseApi + '/api/info')
                .success(function (info) {
                    _info = info;
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
            $timeout(function () {
                var route = routingService.routes[name];
                $location.path(route.path);
            });
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
            if (value == undefined) {
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

        function isNative() {
            // TOOD hack this around when more platform are relevant
            var isAndroid = ionic.Platform.isAndroid();
            return isAndroid;

        }

    }

})();
