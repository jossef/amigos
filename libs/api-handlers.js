(function () {
    'use strict';

    var express = require('express');
    var path = require('path');
    var common = require('./common');
    var data = require('./data');
    var async = require('asyncawait/async');
    var await = require('asyncawait/await');
    var fb = require('fb');

    module.exports = {
        root: root,
        listUsers: listUsers,
        getUser: getUser,
        getFriends: getFriends,
        getInfo: getInfo,
        events: events
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
        apiHandler(request, response, function () {
            var events = await(data.getEvents());
            response.json(events);
        });
    }

    function getInfo(request, response) {
        apiHandler(request, response, function () {

            var user = request.user;
            if (user)
            {
                user = {
                    phone: user.phone
                }
            }

            // TODO move version to somewhere else

            response.json({
                user:  user,
                version: 0.1
            });
        });
    }

    function listUsers(request, response) {
        apiHandler(request, response, function () {
            var users = await(data.getUsers());
            response.json({users:users, user: request.user || false});
        });
    }

    function getUser(request, response) {
        apiHandler(request, response, function () {
            var username = request.params.id;
            var user = await(data.getUser(username));
            response.json(user);
        });
    }

    function getFriends(request, response) {
        apiHandler(request, response, function () {

            if (!request.isAuthenticated())
            {
                throw new Error('yo, uncool.');
            }

            var google = require('googleapis');
            var auth = require('../config/auth');
            var plus = google.plus('v1');
            var userId = request.user.google.id;

            var oauth2Client = new google.auth.OAuth2(auth.googleAuth.clientID, auth.googleAuth.clientSecret, auth.googleAuth.callbackURL);
            oauth2Client.setCredentials(request.user.google.token);


            plus.people.get({ auth: oauth2Client, userId: 'me' }, function(err, user) {
                console.log('Result: ' + (err ? err.message : user.displayName));

                response.json(user);
            });

        });
    }


})();