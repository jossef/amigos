(function () {
    'use strict';

    var expressPort = 8080;
    var expressIPAddress = '0.0.0.0';

    var chalk = require('chalk');
    var morgan = require('morgan');
    var routing = require('./libs/routing');
    var cookieParser = require('cookie-parser');

    var data = require('./libs/data');
    var express = require('express');
    var passport = require('passport');
    var bodyParser = require('body-parser');
    var app = express();
    var http = require('http').createServer(app);
    var io = require('socket.io')(http, {path: '/api/socket'});

    var mongoose = require('mongoose');
    var configDB = require('./config/database.js');

    var session = require('express-session');
    var MongoStore = require('connect-mongo')(session);

    var webSockets = require('./libs/web-sockets');


    mongoose.connect(configDB.url); // connect to our database

    // Bootstrapping
    //

    app.use(morgan('dev')); // log every request to the console
    app.use(cookieParser()); // read cookies (needed for auth)
    app.use(bodyParser.json(null));

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

    app.use(session({
        secret: 'ami$5-aggqas#5967nr_e4ocm9ck2&a+i4r0klzpsp+*zp@myrq^agos',
        name: 'AMIGOS',
        resave: true,
        saveUninitialized: true,
        maxAge: new Date(Date.now() + 3600000),
        store: new MongoStore(
            {mongooseConnection: mongoose.connection},
            function (err) {
                console.log(err || 'connect-mongodb setup ok');
            })
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    require('./config/passport')(passport); // pass passport for configuration


    routing(app, passport);

    http.listen(expressPort, expressIPAddress);
    console.log(chalk.bold.yellow('LISTENING'), 'express', chalk.cyan(expressIPAddress), chalk.cyan(expressPort));

    webSockets.init(io);
    console.log(chalk.bold.yellow('INITIALIZED'), 'web sockets');

})();