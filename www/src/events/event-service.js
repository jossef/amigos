(function () {
    'use strict';

    angular.module('amigos')
        .service('eventService', EventService);


    var eventTypes = [
        {name: 'Party', id: 'party'},
        {name: 'Friendship', id: 'friendship'},
        {name: 'Beach', id: 'beach'},
        {name: 'Nature Trip', id: 'nature'},
        {name: 'BBQ', id: 'bbq'},
        {name: 'Picnic', id: 'picnic'},
        {name: 'Other', id: 'other'}
    ];

    function EventService($http, commonService) {

        return {
            getEvents: getEvents,
            getEvent: getEvent,
            createEvent: createEvent,
            eventTypes: eventTypes
        };


        function getEvents(){
            return $http.get(commonService.baseApi + '/api/events');
        }


        function createEvent(event){
            var json = angular.toJson(event);
            return $http.post(commonService.baseApi + '/api/events', json);
        }

        function getEvent(id){
            return $http.get(commonService.baseApi + '/api/events/' + id);
        }
    }

})();
