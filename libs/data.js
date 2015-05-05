(function () {
    'use strict';
    var Q = require("q");
    var redisClient = require("redis").createClient();
    var mongoClient = require('mongodb').MongoClient;
    var mongoDBUrl = 'mongodb://127.0.0.1:27017/Amigos';
    var mongoose = require('mongoose');
    var chalk = require('chalk');

    var User = require('./models/user');
    var Event = require('./models/event');
    var Product = require('./models/product');
    var common = require('./common');

    var async = require('asyncawait/async');
    var await = require('asyncawait/await');

    module.exports = {

        isUserExists: isUserExists,
        getUser: getUser,
        updateUser: updateUser,

        isPhoneInUse: isPhoneInUse,
        getUsers: getUsers,

        register: register,

        getUserEvents: getUserEvents,
        createEvent: createEvent,
        getEvent: getEvent,
        getAllEvents: getAllEvents,
        getEventMessages: getEventMessages,
        addEventMessage: addEventMessage,
        getEventParticipants: getEventParticipants,

        User: User
    };

    // ..........................

    function isPhoneInUse(phone) {
        var deferred = Q.defer();

        User.findOne({phone: phone, registered: true})
            .exec(function (err, user) {
                if (err) {
                    return deferred.reject(err);
                }

                var exists = user && true;
                deferred.resolve(exists);
            });

        return deferred.promise;
    }

    function isUserExists(username) {
        var deferred = Q.defer();

        User.findOne({username: username})
            .exec(function (err, user) {
                if (err) {
                    return deferred.reject(err);
                }

                var exists = user && true;
                deferred.resolve(exists);
            });

        return deferred.promise;
    }


    function getEvent(id) {
        var deferred = Q.defer();

        Event.findById(id)
            .exec(function (err, event) {
                if (err) {
                    return deferred.reject(err);
                }

                deferred.resolve(event);
            });

        return deferred.promise;
    }


    function getEventMessages(eventId) {
        var deferred = Q.defer();

        Event.findById(eventId, {messages: true})
            .exec(function (err, event) {
                if (err) {
                    return deferred.reject(err);
                }

                deferred.resolve(event && event.messages);
            });

        return deferred.promise;
    }

    function getEventParticipants(eventId) {
        var deferred = Q.defer();

        Event.findById(eventId, {participants: true})
            .exec(function (err, event) {
                if (err) {
                    return deferred.reject(err);
                }

                deferred.resolve(event && event.participants);
            });

        return deferred.promise;
    }

    function addEventMessage(phone, eventId, message) {
        var deferred = Q.defer();

        async(function () {
            var user = await(getUser(phone));

            Event.findById(eventId, {messages: true})
                .exec(function (err, event) {
                    if (err) {
                        return deferred.reject(err);
                    }

                    var eventMessage = {
                        timestamp: new Date(),
                        type: message.type,
                        user: {
                            id: user._id,
                            name: user.nickname
                        },
                        message: message.message
                    };

                    event.messages.push(eventMessage);

                    event.save();

                    deferred.resolve(eventMessage);
                });
        })();

        return deferred.promise;
    }


    function createEvent(creatorUser, data) {
        var deferred = Q.defer();

        async(function () {

            var usersInvolved = [];

            creatorUser = await(getUser(creatorUser.phone));
            usersInvolved.push(creatorUser);

            var event = new Event();

            event.organizer = creatorUser;
            event.name = data.name;
            event.type = data.type;

            for (var key in data.participants) {
                var participant = data.participants[key];
                var user = await(ensureUserExists(participant.phone, {nickname: participant.name}));
                usersInvolved.push(user);

                event.participants.push(user._id);
            }

            event.participants.push(creatorUser._id);

            for (var key in data.dates) {
                var date = data.dates[key];
                event.dates.push(date);
            }

            event.location = data.location;

            var approvedProducts = [];

            for (var key in data.products) {
                var name = data.products[key];
                var product = await(ensureProductExists(name));

                approvedProducts.push(product);
                event.products.push(product._id);
            }

            event.save();

            // Now let's update all of the users
            usersInvolved.forEach(function (user) {
                user.events.addToSet(event._id);
                user.save();
            });

            deferred.resolve(event);
        })();

        return deferred.promise;
    }


    function getUser(phone) {

        phone = common.parsePhoneNumber(phone);

        var deferred = Q.defer();

        User.findOne({phone: phone})
            .exec(function (err, user) {
                if (err) {
                    return deferred.reject(err);
                }

                deferred.resolve(user);
            });

        return deferred.promise;
    }

    function ensureUserExists(phone, data) {

        phone = common.parsePhoneNumber(phone);

        var deferred = Q.defer();

        User.findOne({'phone': phone}, function (err, user) {
            if (err) {
                return deferred.reject(err);
            }

            if (!user) {
                user = new User();
                user.phone = phone;
            }

            if (data.nickname) {
                user.nickname = data.nickname;
            }

            user.save(function (err) {

                if (err) {
                    return deferred.reject(err);
                }

                deferred.resolve(user);
            });
        });

        return deferred.promise;
    }

    function updateUser(phone, data) {

        phone = common.parsePhoneNumber(phone);

        var deferred = Q.defer();

        User.findOne({'phone': phone}, function (err, user) {
            if (err) {
                return deferred.reject(err);
            }

            if (!user) {
                return deferred.reject('User not found');
            }

            if (data.nickname) {
                user.nickname = data.nickname;
            }

            if (data.password) {
                user.password = user.generateHash(data.password);
            }

            user.save();

            deferred.resolve();

        });
        return deferred.promise;
    }


    function getUsers() {
        var deferred = Q.defer();

        User.find({})
            .limit(10)
            .exec(function (err, users) {
                if (err) {
                    return deferred.reject(err);
                }

                deferred.resolve(users);
            });

        return deferred.promise;
    }

    function getUserEvents(user) {
        var deferred = Q.defer();

        var phone = common.parsePhoneNumber(user.phone);


        User.findOne({'phone': phone}, {events: true})
            .populate('events')
            .populate('events.participants.user')
            .exec(function (err, data) {
                if (err) {
                    return deferred.reject(err);
                }

                deferred.resolve(data && data.events);

            });

        return deferred.promise;
    }

    function register(username, password) {

        var deferred = Q.defer();

        var user = {
            username: username
        };

        User.register(user, password, function (err, users) {
            if (err) {
                return deferred.reject(err);
            }

            deferred.resolve(users);
        });

        return deferred.promise;
    }

    function getAllEvents() {
        var deferred = Q.defer();

        Event.find({})
            .exec(function (err, events) {
                if (err) {
                    return deferred.reject(err);
                }

                deferred.resolve(events);
            });

        return deferred.promise;
    }

})();