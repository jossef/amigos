(function () {
    'use strict';

    var express = require('express');
    var path = require('path');
    var common = require('./common');
    var data = require('./data');
    var webSockets = require('./web-sockets');
    var async = require('asyncawait/async');
    var await = require('asyncawait/await');
    var fb = require('fb');
    var notifications = require('./notifications');

    module.exports = {
        root: root,
        listUsers: listUsers,
        getUser: getUser,

        validatePhone: validatePhone,

        getInfo: getInfo,

        getProfile: getProfile,
        updateProfile: updateProfile,

        getUserEvents: getUserEvents,
        createEvent: createEvent,
        getEvent: getEvent,
        getEventMessages: getEventMessages,
        addEventMessage: addEventMessage,

        getNotifications: getNotifications,

        apiHandler: apiHandler
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

    function getUserEvents(req, res) {
        apiHandler(req, res, function () {
            ensureAuthenticated(req);
            var events = await(data.getUserEvents(req.user));
            res.json(events);
        });
    }

    function createEvent(req, res) {
        apiHandler(req, res, function () {
            ensureAuthenticated(req);

            var user = req.user;
            var event = await(data.createEvent(req.user, req.body));

            event.participants.forEach(function (eventParticipant) {
                var userId = eventParticipant.user._id;

                if (userId != user.id) {

                    notifications.notify(userId, {
                        event: {
                            id: event._id,
                            name: event.name
                        },
                        type: 'new-event',
                        content: {
                            message: 'New Event'
                        }
                    });
                }

                webSockets.reload(userId);
            });

            res.json(req.body);
        });
    }

    function getEvent(req, res) {
        apiHandler(req, res, function () {
            var eventId = req.params.id;
            var event = await(data.getEvent(eventId));
            event = common.clone(event);
            event.isAdmin = req.user._id == event.organizer;
            res.json(event);
        });
    }

    function getEventMessages(req, res) {
        apiHandler(req, res, function () {
            var eventId = req.params.id;
            var event = await(data.getEventMessages(eventId));
            res.json(event);
        });
    }

    function addEventMessage(req, res) {
        apiHandler(req, res, function () {
            ensureAuthenticated(req);

            var user = req.user;
            var eventId = req.params.id;
            var message = req.body;
            var phone = req.user.phone;
            var eventMessage = await(data.addEventMessage(phone, eventId, message));
            var event = await(data.getEvent(eventId));

            event.participants.forEach(function (eventParticipant) {
                var userId = eventParticipant.user._id;

                if (userId != user.id) {

                    notifications.notify(userId, {
                        event: {
                            id: eventId,
                            name: event.name
                        },
                        type: 'chat',
                        content: message
                    });
                }

                webSockets.reload(userId);
            });

            res.json(eventMessage);
        });
    }

    function getInfo(req, res) {
        apiHandler(req, res, function () {

            var user = req.user;
            if (user) {
                user = {
                    id: user._id,
                    phone: user.phone,
                    nickname: user.nickname
                }
            }

            // TODO move version to somewhere else

            res.json({
                user: user,
                version: 0.1
            });
        });
    }

    function listUsers(req, res) {
        apiHandler(req, res, function () {
            var users = await(data.getUsers());
            res.json({users: users, user: req.user || false});
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

    function getNotifications(req, res) {
        apiHandler(req, res, function () {
            ensureAuthenticated(req);

            var userId = req.user.id;
            var data = await(notifications.getNotifications(userId));
            res.json(data);
        });
    }


})();