(function () {
    'use strict';
    var Q = require("q");
    var redisClient = require("redis").createClient();
    var mongoClient = require('mongodb').MongoClient;
    var mongoDBUrl = 'mongodb://127.0.0.1:27017/Amigos';
    var mongoose = require('mongoose');
    var chalk = require('chalk');

    module.exports = {
        isUserExists: isUserExists,
        getUsers: getUsers,
        addUser: addUser,
        init: init
    };

    // ..........................

    var db = {};

    function isUserExists(username) {
        var deferred = Q.defer();

        db.users.findOne({_id: username}, {}, function (err, user) {
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

        db.users.find({}, {_id: 1})
            .toArray(function (err, users) {
                if (err) {
                    return deferred.reject(err);
                }

                deferred.resolve(users);
            });

        return deferred.promise;
    }

    function addUser() {
        var deferred = Q.defer();

        db.users.find({}, {_id: 1})
            .toArray(function (err, users) {
                if (err) {
                    return deferred.reject(err);
                }

                deferred.resolve(users);
            });

        return deferred.promise;
    }

    function init() {

        mongoClient.connect(mongoDBUrl, function (err, mongoContext) {
            if (err) {
                console.error(chalk.red('Could not connect to MongoDB!'));
                console.log(chalk.red(err));
            }
            else {
                console.log(chalk.bold.green('CONNECTED'), 'mongodb', chalk.cyan(mongoDBUrl));
                mongoContext.createCollection('users', function (error) {
                    if (error) {
                        console.log(chalk.bold.red('ERROR'), error);
                    }
                });

                db.users = mongoContext.collection('users');
            }
        });
    }

})();