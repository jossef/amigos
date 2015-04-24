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

    module.exports = {

        isUserExists: isUserExists,
        getUser: getUser,
        updateUser: updateUser,

        isPhoneInUse: isPhoneInUse,
        getUsers: getUsers,

        register: register,

        getEvents: getEvents,
        getEvent: getEvent,

        User: User
    };

    // ..........................

    function isPhoneInUse(phone) {
        var deferred = Q.defer();

        User.findOne({phone: phone})
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


    function getUser(phone) {
        var deferred = Q.defer();

        User.findOne({phone: phone}, {phone: true, nickname: true})
            .exec(function (err, user) {
                if (err) {
                    return deferred.reject(err);
                }

                deferred.resolve(user);
            });

        return deferred.promise;
    }


    function updateUser(phone, data) {
        var deferred = Q.defer();

        User.findOne({'phone': phone}, function (err, user) {
            if (err) {
                return deferred.reject(err);
            }

            if (!user) {
                return deferred.reject('Authentication failed');
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

    function getEvents() {
        var deferred = Q.defer();

        Event.find({})
            .exec(function (err, data) {
                if (err) {
                    return deferred.reject(err);
                }

                deferred.resolve(data);
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

})();