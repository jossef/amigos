(function () {
    'use strict';

    var app = angular.module('amigos');

    app.controller("HomeController", function ($scope, $timeout, $http, geoNavigationService, commonService, contactsService, uiGmapGoogleMapApi, $templateCache) {
        var vm = this;

        var isFirstTime = commonService.isFirstTime();
        if (isFirstTime) {
            //commonService.redirect('welcome');
        }

        // TODO remove this later on
        commonService.redirect('events');


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

        /*
        var websocket = new WebSocket("ws://echo.websocket.org/");

        vm.state = '';
        websocket.onopen = function(){
            vm.state = 'connected';
            $timeout(angular.noop);

        };
        websocket.onmessage = function(e){
            vm.message = e.data;
            $timeout(angular.noop);
        };

        vm.wsTest = function(message){
            websocket.send(message);
        };

        vm.createEvent = function () {

        };
        */
    });


})();