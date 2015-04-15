(function () {
    'use strict';

    var app = angular.module('amigos');

    var routesList = [
        {
            name: 'home',
            path: '/',
            view: '/static/src/home/home-view.html',
            controller: 'HomeController',
            theme: 'green'
        },
        {
            name: 'login',
            path: '/login',
            view: '/static/src/login/login-view.html',
            controller: 'LoginController',
            theme: 'orange'
        },
        {
            name: 'events',
            path: '/events',
            view: '/static/src/events/events-view.html',
            controller: 'EventsController',
            theme: 'default'
        },
        {
            name: 'create-event',
            path: '/events/create',
            view: '/static/src/events/create-event-view.html',
            controller: 'CreateEventController',
            theme: 'default'
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
                    controller: route.controller,
                    controllerAs: 'vm',
                    color: route.theme || 'default'
                })
        });

        $routeProvider
            .otherwise({
                redirectTo: '/'
            });
    });


})();