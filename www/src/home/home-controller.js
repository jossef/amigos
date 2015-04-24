(function () {
    'use strict';

    var app = angular.module('amigos');

    app.controller("HomeController", function ($scope, $http, commonService, contactsService) {
        var vm = this;

        var isFirstTime = commonService.isFirstTime();
        if (isFirstTime) {
            commonService.redirect('welcome');
        }


        contactsService.getContacts()
            .success(function (data) {
                vm.data = data;
            });

        vm.clicker = function () {
            commonService.showAlert('Ha');

            $http.post('http://10.0.0.6:8000/', angular.toJson({
                data: vm.data
            }));
        };

        vm.createEvent = function () {

        };
    });


})();