(function () {
    'use strict';

    var app = angular.module('amigos');

    app.directive('shellView', function() {
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'src/shell/shell-view.html',
            controller:'ShellController',
            controllerAs:'vm'
        };
    });

})();