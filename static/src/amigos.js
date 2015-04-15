(function () {
    'use strict';

    var app = angular.module('amigos', [
        'ngAnimate',
        'ngRoute',
        'ngMessages',
        'ngMaterial',
        'material.wizard'
    ]);


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
            .icon("facebook", "/static/assets/svg/facebook.svg", 512)
            .icon("hangouts", "/static/assets/svg/hangouts.svg", 512)
            .icon("twitter", "/static/assets/svg/twitter.svg", 512)
            .icon("phone", "/static/assets/svg/phone.svg", 512);


        var defaultWeights = {
            'default': '500', // by default use shade 400 from the pink palette for primary intentions
            'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
            'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
            'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
        };

        $mdThemingProvider.theme('default')
            .primaryPalette('teal', defaultWeights)
            .accentPalette('red');


        $mdThemingProvider.theme('green')
            .primaryPalette('green', defaultWeights)
            .accentPalette('blue');


        $mdThemingProvider.theme('purple')
            .primaryPalette('purple', defaultWeights)
            .accentPalette('brown');


        $mdThemingProvider.theme('orange')
            .primaryPalette('deep-orange', defaultWeights)
            .accentPalette('blue-grey');


        $mdThemingProvider.alwaysWatchTheme(true);

    });

})();