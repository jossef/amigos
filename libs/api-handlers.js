(function () {
    'use strict';

    var express = require('express');
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

        events.push({name: 'asd1'});
        events.push({name: 'asd2'});
        events.push({name: 'asd3'});
        events.push({name: 'asd4'});
        events.push({name: 'asd5'});

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

            await(data.addUser(user));
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
            return response.json({user: request.user, err: err});
        });

    }

    function logout(request, response) {
        request.logout();
        response.end();
    }

})();