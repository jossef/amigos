(function () {
    'use strict';

    var app = angular.module('amigos');

    app.directive('eventType', function (eventService) {
        return {
            restrict: 'E',
            require: 'ngModel',
            templateUrl: 'src/events/event-type-directive-view.html',
            scope:{
                eventTypes: '=?'
            },
            link: function (scope, elm, attrs, ngModel) {

                if(!scope.eventTypes)
                {
                    scope.eventTypes = eventService.eventTypes;
                }

                scope.selectEventType = function(value){
                    scope.value = value;
                    ngModel.$setViewValue(scope.value);
                };

                ngModel.$render = function(){
                    scope.value = ngModel.$modelValue;
                };
            }
        };
    });

})();