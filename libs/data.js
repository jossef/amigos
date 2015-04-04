(function () {
    'use strict';
    var Q = require("q");
    var redisClient = require("redis").createClient();
    var mongoClient = require('mongodb').MongoClient;
    var mongoDBUrl = 'mongodb://127.0.0.1:27017/Amigos';
    var mongoose = require('mongoose');
    var chalk = require('chalk');

    var User = require('./models/user');

    module.exports = {
        isUserExists: isUserExists,
        getUsers: getUsers,
        register: register,

        User: User
    };

    // ..........................

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