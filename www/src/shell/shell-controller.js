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

        vm.toggleMenu = function() {
            vm.sideMenuController.toggleLeft();
        };

        $scope.$watch(commonService.getInfo, function (info) {
            if (info && !info.user)
            {
                // Not logged in!
                commonService.redirect('login');
            }

            vm.info = info;
        });


        $scope.$on('$routeChangeError', function(current, previous, rejection) {
            console.log("routeChangeError", currrent, previous, rejection);
        });

        $scope.$on('$routeChangeStart', function(next, current) {
            console.log("routeChangeStart");
            console.dir(next);
            console.dir(current);
        });

        $scope.$on('$routeChangeSuccess', function(current, previous) {
            console.log("routeChangeSuccess");
            console.dir(current);
            console.dir(previous);
        });

        $scope.$on('$routeUpdate', function(rootScope) {
            console.log("routeUpdate", rootScope);
        });

    });

})();