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

        validatePhone: validatePhone,
        getFriends: getFriends,

        getInfo: getInfo,

        getProfile: getProfile,
        updateProfile: updateProfile,

        events: events,
        createEvent: createEvent,
        getEvent: getEvent
    };

    // ............................

    function apiHandler(req, res, callback) {
        async(function () {
            try {
                callback();
            }
            catch (e) {
                console.log(e.message);
                console.log(e.stack);
                res.jsonError(e.message);
            }
        })();
    }

    function ensureAuthenticated(req) {
        if (!req.isAuthenticated()) {
            throw Error('User not logged in');
        }
    }

    // ............................


    function root(req, res) {
        res.sendFile(path.join(common.appDir, 'static', 'index.html'));
    }

    function events(req, res) {
        apiHandler(req, res, function () {
            ensureAuthenticated(req);
            var events = await(data.getUserEvents(req.user));
            res.json(events);
        });
    }

    function createEvent(req, res) {
        apiHandler(req, res, function () {
            ensureAuthenticated(req);

            var event = req.body;

            await(data.createEvent(req.user, event));
            res.json(req.body);
        });
    }

    function getEvent(req, res) {
        apiHandler(req, res, function () {
            var eventId = req.params.id;
            var event = await(data.getEvent(eventId));
            res.json(event);
        });
    }

    function getInfo(req, res) {
        apiHandler(req, res, function () {

            var user = req.user;
            if (user)
            {
                user = {
                    phone: user.phone,
                    nickname: user.nickname
                }
            }

            // TODO move version to somewhere else

            res.json({
                user:  user,
                version: 0.1
            });
        });
    }

    function listUsers(req, res) {
        apiHandler(req, res, function () {
            var users = await(data.getUsers());
            res.json({users:users, user: req.user || false});
        });
    }

    function getUser(req, res) {
        apiHandler(req, res, function () {
            var username = req.params.id;
            var user = await(data.getUser(username));
            res.json(user);
        });
    }

    function getProfile(req, res) {
        apiHandler(req, res, function () {
            ensureAuthenticated(req);

            var user = await(data.getUser(req.user.phone));
            res.json(user);
        });
    }

    function updateProfile(req, res) {
        apiHandler(req, res, function () {
            ensureAuthenticated(req);

            var body = req.body;

            var user = await(data.updateUser(req.user.phone, body));
            res.json(user);
        });
    }

    function getFriends(req, res) {
        apiHandler(req, res, function () {

            if (!req.isAuthenticated())
            {
                throw new Error('yo, uncool.');
            }

            var google = require('googleapis');
            var auth = require('../config/auth');
            var plus = google.plus('v1');
            var userId = req.user.google.id;

            var oauth2Client = new google.auth.OAuth2(auth.googleAuth.clientID, auth.googleAuth.clientSecret, auth.googleAuth.callbackURL);
            oauth2Client.setCredentials(req.user.google.token);


            plus.people.get({ auth: oauth2Client, userId: 'me' }, function(err, user) {
                console.log('Result: ' + (err ? err.message : user.displayName));

                res.json(user);
            });

        });
    }


    function validatePhone(req, res) {

        apiHandler(req, res, function () {

            var body = req.body;
            if (!body.phone) {
                return res.jsonError('Phone is required')
            }

            var phone = body.phone;

            // To fixed phone number
            phone = common.parsePhoneNumber(phone);

            var isTaken = await(data.isPhoneInUse(phone));

            res.json({
                isTaken: isTaken
            });
        });
    }



})();