(function () {
    'use strict';

    var express = require('express');
    var passport = require('passport');
    var path = require('path');
    var common = require('./common');
    var data = require('./data');
    var async = require('asyncawait/async');
    var await = require('asyncawait/await');

    module.exports = {
        root: root,
        listUsers: listUsers,
        getUser: getUser,
        register: register,
        events: events,
        login: login,
        logout: logout
    };

    // ............................

    function apiHandler(request, response, callback) {
        async(function () {
            try {
                callback();
            }
            catch (e) {
                console.log(e.message);
                console.log(e.stack);
                response.jsonError(e.message);
            }
        })();
    }

    // ............................


    function root(request, response) {
        response.sendFile(path.join(common.appDir, 'static', 'index.html'));
    }

    function events(request, response) {
        // TODO: get from db or something
        var events = [];

        events.push({id: 1, organizer: 'John', date: '2015-05-13', name: 'Social Meeting'});
        events.push({id: 2, organizer: 'Naila', date: '2015-05-13', name: 'BBQ'});
        events.push({id: 3, organizer: 'Qeraz', date: '2015-05-13', name: 'Birthday'});
        events.push({id: 4, organizer: 'Seala', date: '2015-05-13', name: 'Meetup'});
        events.push({id: 5, organizer: 'Poealo', date: '2015-05-13', name: 'Friends @ Beach'});

        response.json(events);
    }

    function listUsers(request, response) {
        apiHandler(request, response, function () {
            var users = await(data.getUsers());
            response.json(users);
        });
    }

    function getUser(request, response) {
        apiHandler(request, response, function () {
            var username = request.params.id;
            var user = await(data.getUser(username));
            response.json(user);
        });
    }

    function register(request, response) {
        apiHandler(request, response, function () {

            var user = request.body;
            if (!user.username) {
                return response.jsonError('Username is missing')
            }

            if (!user.password) {
                return response.jsonError('Password is missing')
            }

            var exists = await(data.isUserExists(user.username));

            if (exists) {
                return response.jsonError('Username already registered')
            }

            await(data.register(user.username, user.password));
            response.json();
        });
    }


    function login(request, response) {
        // Input checks

        var user = request.body;
        if (!user.username) {
            return response.jsonError('Username is missing')
        }

        if (!user.password) {
            return response.jsonError('Password is missing')
        }

        request.login(user, function (err) {
            return response.json({user: request.user, err: err, 'ist': request.isAuthenticated()});
        });

    }

    function logout(request, response) {
        request.logout();
        response.end();
    }

})();