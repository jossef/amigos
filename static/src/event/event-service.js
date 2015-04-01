(function () {
    'use strict';

    angular.module('amigos')
        .service('eventService', EventService);

    function EventService($http) {

        return {
            getEvents: getEvents,
            getEvent: getEvent

        };


        function getEvents(){
            return $http.get('/api/events');
        }

        function getEvent(id){
            return $http.get('/api/events/' + id);
        }
    }

})();
