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
    var common = require('./common');
    var TaggedItem = require('./models/tagged-item');

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

        User: User,

        saveTaggedItem: saveTaggedItem
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

            for (var key in data.dates) {
                var date = data.dates[key];
                event.dates.push(date);
            }

            event.location = data.location;

            // TODO set products here as well

            event.save();

            // Now let's update all of the users
            usersInvolved.forEach(function(user){
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

            user.save(function(err){

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

    function saveTaggedItem(data){

        //TODO: complete the saving

        var deferred = Q.defer();

        async(function () {

            var taggedItem = new TaggedItem();

            taggedItem.eventType =

            event.name = data.name;
            event.type = data.type;

            for (var key in data.participants) {
                var participant = data.participants[key];
                var user = await(ensureUserExists(participant.phone, {nickname: participant.name}));

                taggedItem.participants.push(user._id);
            }

            for (var key in data.products) {
                var products = data.products[key];
                var product = await(ensureUserExists(products.ID, {name: products.name}));

                taggedItem.products.push(product._id);
            }


            taggedItem.save();

            deferred.resolve(taggedItem);
        })();

        return deferred.promise;
    };

})();