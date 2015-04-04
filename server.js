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
    var passportLocalMongoose = require('passport-local-mongoose');

    var mongoDBUrl = 'mongodb://127.0.0.1:27017/Amigos';
    var mongoose = require('mongoose');
    mongoose.connect(mongoDBUrl);


    var async = require('asyncawait/async');
    var await = require('asyncawait/await');

    // Bootstrapping
    //
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

    app.use(expressSession({
        secret: 'ami$5-aggqas#5967nr_e4ocm9ck2&a+i4r0klzpsp+*zp@myrq^agos',
        name: 'AMIGOS',
        proxy: true,
        resave: true,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    //passport.use(data.User.createStrategy());
    //passport.serializeUser(data.User.serializeUser());
    //passport.deserializeUser(data.User.deserializeUser());

    routing(app, passport);

    // Listen
    //
    http.listen(expressPort, expressIPAddress);
    console.log(chalk.bold.yellow('LISTENING'), 'express', chalk.cyan(expressIPAddress), chalk.cyan(expressPort));

})();