(function () {
    'use strict';

    var app = angular.module('amigos');

    app.service('errorHandlingService', ErrorHandlingService);

    var _communicationErrorHandler;

    function ErrorHandlingService() {

        return {
            setCommunicationErrorHandler: setCommunicationErrorHandler,
            getCommunicationErrorHandler: getCommunicationErrorHandler
        };

        function setCommunicationErrorHandler(handler) {
            _communicationErrorHandler = handler;
        }

        function getCommunicationErrorHandler() {
            return _communicationErrorHandler;
        }

    }

})();
