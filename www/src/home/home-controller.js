(function () {
    'use strict';

    var app = angular.module('amigos');

    app.controller("HomeController", function ($scope, commonService) {
        var vm = $scope;

        // If the user is new here

        var isFirstTime = commonService.isFirstTime();
        console.log('first time', isFirstTime);

        if (isFirstTime) {
            commonService.redirect('welcome');
            return;
        }

        // If not logged in
        // TODO add for each routing config if login is required


        if (!commonService.loggedInUser)
        {
            commonService.redirect('login');
        }


    });


})();