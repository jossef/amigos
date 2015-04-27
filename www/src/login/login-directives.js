(function () {
    'use strict';

    var app = angular.module('amigos');

    app.directive('uniquePhone', function ($q, loginService) {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {

                ctrl.$asyncValidators.phone = function (modelValue, viewValue) {

                    if (ctrl.$isEmpty(modelValue)) {
                        // consider empty model valid
                        return $q.when();
                    }

                    var def = $q.defer();

                    loginService.validatePhone(modelValue)
                        .success(function (result) {
                            if (result.isTaken) {
                                def.reject();
                            }
                            else {
                                def.resolve();
                            }
                        })
                        .error(def.reject);

                    return def.promise;
                };
            }
        };
    });


    app.directive('match', function ($parse) {
        return {
            require: '?ngModel',
            restrict: 'A',
            link: function (scope, elem, attrs, ctrl) {
                if (!ctrl) {
                    if (console && console.warn) {
                        console.warn('Match validation requires ngModel to be on the element');
                    }
                    return;
                }

                var matchGetter = $parse(attrs.match);

                scope.$watch(getMatchValue, function () {
                    ctrl.$$parseAndValidate();
                });

                ctrl.$validators.match = function () {
                    return ctrl.$viewValue === getMatchValue();
                };

                function getMatchValue() {
                    var match = matchGetter(scope);
                    if (angular.isObject(match) && match.hasOwnProperty('$viewValue')) {
                        match = match.$viewValue;
                    }
                    return match;
                }
            }
        };
    });
})();