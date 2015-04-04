(function () {
    'use strict';

    var expressPort = 8080;
    var expressIPAddress = '0.0.0.0';

    var chalk = require('chalk');
    var routing = require('./libs/routing');
    var data = require('./libs/data');
    var express = require('express');
    var passport = require('passport');
    var bodyParser = require('body-parser');
    var app = express();
    var http = require('http').Server(app);
    var io = require('socket.io')(http);
    var expressSession = require('express-session');

    var async = require('asyncawait/async');
    var await = require('asyncawait/await');

    // Bootstrapping
    //
    app.use(expressSession({
        secret: 'ami$5-aggqas#5967nr_e4ocm9ck2&a+i4r0klzpsp+*zp@myrq^agos',
        name: 'AMIGOS',
        proxy: true,
        resave: true,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(bodyParser.json());
    app.use(function (req, res, next) {

        res.jsonError = function (technicalMessage, userMessage) {
            res.status(500).json(
                {
                    technicalMessage: technicalMessage,
                    userMessage: userMessage || technicalMessage
                });
        };

        next();
    });

    routing.setRouting(app);

    passport.serializeUser(function (user, done) {
        done(null, user.username);
    });

    passport.deserializeUser(function (username, done) {
        console.log(username);

        async(function () {


            var exists = await(data.isUserExists(username));

            var user = null;
            if (exists) {
                user = {username: username};
            }

            console.log(user);
            done(err, user);

        });


    });


    data.init();

    // Listen
    //
    http.listen(expressPort, expressIPAddress);
    console.log(chalk.bold.yellow('LISTENING'), 'express', chalk.cyan(expressIPAddress), chalk.cyan(expressPort));

})();