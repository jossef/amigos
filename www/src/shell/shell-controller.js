(function () {
    'use strict';

    var app = angular.module('amigos');

    app.controller("ShellController", function ($scope, loginService, commonService) {
        var vm = this;
        vm.redirect = commonService.redirect;
        vm.clearStorage = commonService.clearStorage;

        vm.logout = function () {
            loginService.logout()
                .success(function(){
                    commonService.refreshInfo();
                    commonService.clearHistory();
                    commonService.redirect('login');
                });
        };

        commonService.refreshInfo();

        $scope.$watch(commonService.getInfo, function (info) {
            if (info && !info.user)
            {
                // Not logged in!
                commonService.redirect('login');
            }

            vm.info = info;
        });

    });

})();