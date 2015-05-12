(function () {
    'use strict';

    var app = angular.module('amigos');

    var baseApi = '';
    var webSocketAddress = 'ws://localhost:8080';

    /*

    baseApi = 'http://10.0.0.6:8080';
    webSocketAddress = 'ws://10.0.0.6:8080';
     */



    var _info;

    app.factory('amigosSocket', function (socketFactory) {
        return socketFactory({
            ioSocket: io.connect(webSocketAddress, {path: '/api/socket'})
        });
    });

    app.service('commonService', CommonService);
    function CommonService($location, $http, $state, $timeout, $rootScope, $ionicHistory, $window, routingService, errorHandlingService, interactiveService, amigosSocket) {

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
            isFirstTime: isFirstTime,
            setFirstTime: setFirstTime,

            errorHandler: errorHandler,
            redirect: redirect,
            changeState: changeState,
            baseApi: baseApi,

            clearStorage: clearStorage,
            storageGet: storageGet,
            storageSet: storageSet,

            goBack: goBack,
            clearHistory: clearHistory,

            getUser: getUser,

            getNotifications: getNotifications,
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
                    console.log('info', info);
                    _info = info;
                });
        }

        function getNotifications() {
            return $http.get(baseApi + '/api/notifications');
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

        function changeState(name, args) {
            $state.go(name, args);
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
