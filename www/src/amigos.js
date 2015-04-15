(function () {
    'use strict';

    var app = angular.module('amigos', [
        'ngAnimate',
        'ionic',
        'ngCordova',
        'ui.router',
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

})();