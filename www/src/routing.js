(function () {
    'use strict';

    var app = angular.module('amigos');

    var routesList = [
        {
            name: 'home',
            path: '/',
            templateUrl: 'src/home/home-view.html',
            controller: 'HomeController as vm'
        },
        {
            name: 'login',
            path: '/login',
            templateUrl: 'src/login/login-view.html',
            controller: 'LoginController as vm'
        },
        {
            name: 'events',
            path: '/events',
            templateUrl: 'src/events/events-view.html',
            controller: 'EventsController as vm'
        },
        {
            name: 'events-create',
            path: '/events/create',
            abstract: true,
            templateUrl: 'src/events/create-event-view.html',
            controller: 'CreateEventController as vm'
        },
        {
            name: 'events-create.step1',
            path: '/1',
            views: {
                'create-event':{
                    templateUrl: 'src/events/create-event-step-1-view.html'
                }
            }
        },
        {
            name: 'events-create.step2',
            path: '/2',
            views: {
                'create-event':{
                    templateUrl: 'src/events/create-event-step-2-view.html'
                }
            }
        },
        {
            name: 'event',
            path: '/events/:id',
            templateUrl: 'src/events/event-view.html',
            controller: 'EventController as vm'
        },
        {
            name: 'profile',
            path: '/profile',
            templateUrl: 'src/profile/profile-view.html',
            controller: 'ProfileController as vm'
        },
        {
            name: 'welcome',
            path: '/welcome',
            templateUrl: 'src/welcome/welcome-view.html',
            controller: 'WelcomeController as vm'
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
                    templateUrl: route.templateUrl,
                    controller: route.controller,
                    abstract: route.abstract,
                    views: route.views
                })
        });

        $urlRouterProvider.otherwise('/');

    });


})();