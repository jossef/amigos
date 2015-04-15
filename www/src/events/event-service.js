(function () {
    'use strict';

    angular.module('amigos')
        .service('eventService', EventService);

    function EventService($http, commonService) {

        return {
            getEvents: getEvents,
            getEvent: getEvent

        };


        function getEvents(){
            return $http.get(commonService.baseApi + '/api/events');
        }

        function getEvent(id){
            return $http.get(commonService.baseApi + '/api/events/' + id);
        }
    }

})();
