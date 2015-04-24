(function () {
    'use strict';

    var app = angular.module('amigos', [
        'ngAnimate',
        'ngMessages',
        'ionic',
        'ngCordova',

        'ui.router'
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


    app.config(function ($provide, $httpProvider) {
        $provide.factory('httpInterceptor', function ($q, errorHandlingService) {
            return {
                response: function (response) {
                    return response || $q.when(response);
                },
                responseError: function (rejection) {
                    if (rejection.status === 404) {

                        var errorHandler = errorHandlingService.getCommunicationErrorHandler();
                        if (errorHandler)
                        {
                            errorHandler();
                        }
                    }
                    return $q.reject(rejection);
                }
            };
        });
        $httpProvider.interceptors.push('httpInterceptor');
    });

})();