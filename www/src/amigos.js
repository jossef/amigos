(function () {
    'use strict';

    var app = angular.module('amigos', [
        'ngAnimate',
        'ngMessages',
        'ionic',
        'ngCordova',
        'uiGmapgoogle-maps',
        'ui.router'
    ]);

    app.config(function (uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyDFpJUfZnR7T0M7_u3CmHIPGwIgO4-QBEc',
            v: '3.17',
            libraries: 'weather,geometry,visualization,places'
        });
    })



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

    app.config(
        function ($ionicConfigProvider) {
            //$ionicConfigProvider.views.maxCache(0);
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
                        if (errorHandler) {
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