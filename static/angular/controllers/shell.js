(function () {
    'use strict';

    var app = angular.module('amigos');

    app.factory('socket', function (socketFactory) {
            return socketFactory();
        });

    app.controller("ShellController", function ($scope, $http) {
            $scope.messages = [];

            $http.get('/api/hi').success(function(response){
                $scope.osnat = response;
            });
        }
    );

})();