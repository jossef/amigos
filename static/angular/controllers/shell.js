(function () {
    'use strict';

    var app = angular.module('amigos');

    app.factory('socket', function (socketFactory) {
            return socketFactory();
        });

    app.controller("ShellController", function ($scope, $http, socket) {
            $scope.messages = [];

            socket.addListener('message', function (message) {
                $scope.messages.push({date: new Date(), message: message});
            });

            $http.get('/api/hi').success(function(response){
                $scope.osnat = response;
            });
        }
    );

})();