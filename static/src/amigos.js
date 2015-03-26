(function () {
    'use strict';

    var app = angular.module('amigos', [
        'ngAnimate',
        'ngRoute',
        'ngMaterial'
    ]);

    // ......................................................
    // SPA URL Route states
    app.config(
        function ($routeProvider) {

            $routeProvider
                .when('/', {
                    templateUrl: "/static/src/home/home-view.html",
                    controller: 'HomeController'
                })

                .otherwise({
                    redirectTo: '/'
                });
        });

    // ......................................................
    // Promises Fix
    app.config(
        function ($provide) {
            $provide.decorator('$q', function ($delegate) {
                var defer = $delegate.defer;
                $delegate.defer = function () {
                    var deferred = defer();
                    deferred.promise.success = function (fn) {
                        deferred.promise.then(fn);
                        return deferred.promise;
                    };
                    deferred.promise.error = function (fn) {
                        deferred.promise.then(null, fn);
                        return deferred.promise;
                    };
                    return deferred;
                };
                return $delegate;
            });
        });

    app.config(function ($mdThemingProvider, $mdIconProvider) {

        $mdIconProvider
            .defaultIconSet("/static/assets/svg/avatars.svg", 128)
            .icon("menu", "/static/assets/svg/menu.svg", 24)
            .icon("share", "/static/assets/svg/share.svg", 24)
            .icon("google_plus", "/static/assets/svg/google_plus.svg", 512)
            .icon("hangouts", "/static/assets/svg/hangouts.svg", 512)
            .icon("twitter", "/static/assets/svg/twitter.svg", 512)
            .icon("phone", "/static/assets/svg/phone.svg", 512);

        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .accentPalette('red');

    });

})();