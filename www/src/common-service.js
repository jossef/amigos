(function () {
    'use strict';

    var app = angular.module('amigos');

    app.service('commonService', CommonService);

    var baseApi = '';

    function CommonService($location, routingService) {

        var theme = 'default';

        return {
            showMessage: showMessage,
            showAlert: showAlert,
            errorHandler: errorHandler,
            redirect: redirect,
            baseApi: baseApi,
            getTheme: function () {
                return theme;
            }
        };

        function showAlert(title, content) {
            alert(title);
        }

        function showMessage(text) {
            alert(text);
        }

        function errorHandler(error) {
            // TODO perhaps show error messages for each case;
            //      e.g. internet connectivity error

            var message = (error && error.userMessage) || 'Oops! that operation just failed :(';
            showAlert("Failed", message);
        }

        function redirect(name) {
            var route = routingService.routes[name];
            theme = route.theme;
            $location.path(route.path);
        }
    }

})();
