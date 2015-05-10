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
            eventTypes: eventTypes,

            getMessages: getMessages,
            addMessage: addMessage,

            addParticipant: addParticipant,
            removeParticipant: removeParticipant,

            recommendProducts: recommendProducts

        };

        function getMessages(eventId){
            return $http.get(commonService.baseApi + '/api/events/' + eventId + '/messages');
        }

        function addMessage(eventId, message){
            var json = angular.toJson(message);
            return $http.post(commonService.baseApi + '/api/events/' + eventId + '/messages', json);
        }

        function addParticipant(eventId, participant){
            var json = angular.toJson(participant);
            return $http.post(commonService.baseApi + '/api/events/' + eventId + '/participants', json);
        }

        function removeParticipant(eventId, participant){
            var json = angular.toJson({
                participant: participant
            });

            return $http.post(commonService.baseApi + '/api/events/' + eventId + '/participants/', json);
        }

        function recommendProducts(eventId){
            return $http.get(commonService.baseApi + '/api/events/' + eventId + '/recommend');
        }

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
