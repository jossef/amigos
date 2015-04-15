(function () {
    'use strict';

    var app = angular.module('amigos');

    var routesList = [
        {
            name: 'home',
            path: '/',
            view: 'src/home/home-view.html',
            controller: 'HomeController',
            theme: 'green'
        },
        {
            name: 'login',
            path: '/login',
            view: 'src/login/login-view.html',
            controller: 'LoginController',
            theme: 'orange'
        },
        {
            name: 'events',
            path: '/events',
            view: 'src/events/events-view.html',
            controller: 'EventsController',
            theme: 'default'
        },
        {
            name: 'create-event',
            path: '/events/create',
            view: 'src/events/create-event-view.html',
            controller: 'CreateEventController',
            theme: 'default'
        }
    ];

    var routesMap = {};

    routesList.forEach(function(route){
        routesMap[route.name] = route;
    });

    app.service('routingService', RoutingService);

    function RoutingService($location) {

        return {
            routesList: routesList,
            routes: routesMap
        };
    }

    // --------------

    app.config(function ($stateProvider, $urlRouterProvider) {

        routesList.forEach(function (route) {
            $stateProvider
                .state(route.name, {
                    url: route.path,
                    templateUrl: route.view,
                    controller: route.controller,
                    controllerAs: 'vm'
                })
        });

        $urlRouterProvider.otherwise('/');

    });


})();