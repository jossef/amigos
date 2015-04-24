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
            templateUrl: 'src/events/create/create-event-base-view.html',
            controller: 'CreateEventController as vm'
        },
        {
            name: 'events-create.info',
            path: '/info',
            views: {
                'create-event':{
                    templateUrl: 'src/events/create/create-event-info-view.html'
                }
            }
        },
        {
            name: 'events-create.date',
            path: '/date',
            views: {
                'create-event':{
                    templateUrl: 'src/events/create/create-event-date-view.html'
                }
            }
        },
        {
            name: 'events-create.location',
            path: '/location',
            views: {
                'create-event':{
                    templateUrl: 'src/events/create/create-event-location-view.html'
                }
            }
        },
        {
            name: 'events-create.participants',
            path: '/participants',
            views: {
                'create-event':{
                    templateUrl: 'src/events/create/create-event-participants-view.html'
                }
            }
        },
        {
            name: 'events-create.logistics',
            path: '/logistics',
            views: {
                'create-event':{
                    templateUrl: 'src/events/create/create-event-logistics-view.html'
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