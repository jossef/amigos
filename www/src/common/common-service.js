(function () {
    'use strict';

    var app = angular.module('amigos');

    var baseApi = '192.168.1.107';
    var webSocketAddress = 'ws://192.168.1.107:8080';
    var _info;

    app.factory('amigosSocket', function (socketFactory) {
        return socketFactory({
            ioSocket: io.connect(webSocketAddress, {path: '/api/socket'})
        });
    });

    app.service('commonService', CommonService);
    function CommonService($location, $http, $timeout, $rootScope, $ionicHistory, $window, routingService, errorHandlingService, $cordovaLocalNotification, interactiveService, amigosSocket) {

        errorHandlingService.setCommunicationErrorHandler(handleCommunicationError);

        $rootScope.$watch(function () {
            return _info;
        }, function watchCallback(newValue, oldValue) {
            console.log('user changed from ', oldValue, 'to', newValue);

            amigosSocket.emit('identify', newValue && newValue.user);
        }, true);

        amigosSocket.on('identify', function(){
            amigosSocket.emit('identify', _info && _info.user);
        });

        return {
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


            getUser: getUser,

            getInfo: getInfo,
            refreshInfo: refreshInfo
        };

        // .................

        function getUser() {
            return _info && _info.user;
        }

        function goBack() {
            $ionicHistory.goBack();
        }

        function clearHistory() {
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
            interactiveService.showMessage('Please check your internet connection and try again');
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

        function errorHandler(error) {
            // TODO perhaps show error messages for each case;
            //      e.g. internet connectivity error

            var message = (error && error.userMessage) || 'Oops! that operation just failed :(';
            interactiveService.showAlert("Failed", message);
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


    }

})();
