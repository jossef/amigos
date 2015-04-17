(function () {
    'use strict';

    var app = angular.module('amigos');

    app.controller("ProfileController", function ($scope, profileService, commonService) {
        var vm = this;

        profileService.getProfile()
            .success(function(){

            })
            .error(function(){
                commonService.showAlert(':( @');
            });


    });

})();