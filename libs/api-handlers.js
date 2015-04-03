(function () {
    'use strict';

    var express = require('express');
    var path = require('path');
    var common = require('./common');

    module.exports = {
        root: root,
        listUsers: listUsers,
        addUser: addUser,
        events: events,
        login: login,
        logout: logout
    };

    // -----------------------

    function root(request, response) {
        response.sendFile(path.join(common.appDir, 'static', 'index.html'));
    }

    function hi(request, response) {
        response.json({hello: 'world'});
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
        var result = {};

        result.name = 'osnat';
        result.type = 123;
        result.isValid = true;

        response.json(result);
    }

    function addUser(request, response) {
        response.json(request.body);
    }

    function jsonError(response, error) {
        response.send(500);
        return response.json({error: error});
    }

    function login(request, response) {

        // Input checks

        if (!request.body.username)
        {
            jsonError(response, 'asd')
        }

            var user = {
                username: 'sahbak'
            };
        request.login(user, function (err) {
            return response.json({user: request.user, err: err});
        });

    }

    function logout(request, response) {
        request.logout();
        response.end();
    }

})();