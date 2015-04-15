(function () {
    'use strict';

    var app = angular.module('amigos');

    app.service('commonService', CommonService);

    function CommonService($mdToast, $mdDialog, $location, routingService) {

        var theme = 'default';

        return {
            showMessage: showMessage,
            showAlert: showAlert,
            errorHandler: errorHandler,
            redirect: redirect,
            getTheme: function () {
                return theme;
            }
        };

        function showAlert(title, content) {

            var alert = $mdDialog.alert();
            alert = alert.title(title);
            alert = alert.content(content);
            alert = alert.ok('Got it!');

            $mdDialog.show(alert);
        }

        function showMessage(text) {

            $mdToast.show(
                $mdToast.simple()
                    .content(text)
                    .position('bottom')
                    .hideDelay(3000)
            );
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
