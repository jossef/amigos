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

            addProduct: addProduct,
            removeProduct: removeProduct,

            join: join,
            addDate: addDate,
            removeDate: removeDate,
            confirmDate: confirmDate,
            declineDate: declineDate,
            setEventPrimaryDate: setEventPrimaryDate,

            setEventLocation: setEventLocation,

            recommendProducts: recommendProducts

        };

        // ...............

        function getMessages(eventId) {
            return $http.get(commonService.baseApi + '/api/events/' + eventId + '/messages');
        }

        function addMessage(eventId, message) {
            var json = angular.toJson(message);
            return $http.post(commonService.baseApi + '/api/events/' + eventId + '/messages', json);
        }

        // ...............

        function addParticipant(eventId, participant) {
            var json = angular.toJson(participant);
            return $http.post(commonService.baseApi + '/api/events/' + eventId + '/participants', json);
        }

        function removeParticipant(eventId, participantId) {
            return $http.delete(commonService.baseApi + '/api/events/' + eventId + '/participants/' + participantId);
        }

        // ...............

        function setEventLocation(eventId, address, latitude, longitude) {
            var json = angular.toJson({
                address: address,
                latitude: latitude,
                longitude: longitude
            });

            return $http.post(commonService.baseApi + '/api/events/' + eventId + '/location', json);
        }

        // ...............

        function addDate(eventId, date) {
            var json = angular.toJson({
                date: date
            });

            return $http.post(commonService.baseApi + '/api/events/' + eventId + '/dates', json);
        }

        function setEventPrimaryDate(eventId, date) {
            var json = angular.toJson({
                date: date
            });

            return $http.post(commonService.baseApi + '/api/events/' + eventId + '/dates/primary', json);
        }

        function confirmDate(eventId, date) {
            var json = angular.toJson({
                date: date
            });

            return $http.post(commonService.baseApi + '/api/events/' + eventId + '/dates/confirm', json);
        }

        function join(eventId) {
            return $http.post(commonService.baseApi + '/api/events/' + eventId + '/join');
        }

        function declineDate(eventId, date) {
            var json = angular.toJson({
                date: date
            });

            return $http.post(commonService.baseApi + '/api/events/' + eventId + '/dates/decline', json);
        }

        function removeDate(eventId, date) {
            date = new Date(date);
            return $http.delete(commonService.baseApi + '/api/events/' + eventId + '/dates/' + date.getTime());
        }

        // ...............

        function recommendProducts(eventId) {
            return $http.get(commonService.baseApi + '/api/events/' + eventId + '/products/recommend');
        }

        function removeProduct(eventId, productId) {
            return $http.delete(commonService.baseApi + '/api/events/' + eventId + '/products/' + productId);
        }

        function addProduct(eventId, productName) {
            var json = angular.toJson({
                name: productName
            });

            return $http.post(commonService.baseApi + '/api/events/' + eventId + '/products', json);
        }
        // ...............

        function getEvents() {
            return $http.get(commonService.baseApi + '/api/events');
        }

        function createEvent(event) {
            var json = angular.toJson(event);
            return $http.post(commonService.baseApi + '/api/events', json);
        }

        function getEvent(id) {
            return $http.get(commonService.baseApi + '/api/events/' + id);
        }
    }

})();
