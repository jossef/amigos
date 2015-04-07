(function () {
    'use strict';

    var app = angular.module('amigos');

    var routesList = [
        {
            name: 'home',
            path: '/',
            view: '/static/src/home/home-view.html',
            controller: 'HomeController'
        },
        {
            name: 'login',
            path: '/login',
            view: '/static/src/login/login-view.html',
            controller: 'LoginController'
        },
        {
            name: 'events',
            path: '/events',
            view: '/static/src/events/events-view.html',
            controller: 'EventsController'
        }
    ];

    var routesMap = {};

    routesList.forEach(function(route){
        routesMap[route.name] = route;
    });

    app.service('routingService', RoutingService);

    function RoutingService($mdToast, $mdDialog, $location) {

        return {
            routesList: routesList,
            routes: routesMap
        };
    }

    // --------------

    app.config(function ($routeProvider) {

        routesList.forEach(function (route) {
            $routeProvider
                .when(route.path, {
                    templateUrl: route.view,
                    controller: route.controller
                })
        });

        $routeProvider
            .otherwise({
                redirectTo: '/'
            });
    });


})();