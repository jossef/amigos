(function () {
    'use strict';

    var expressPort = 8080;
    var expressIPAddress = '0.0.0.0';
    var mongoDBUrl = 'mongodb://127.0.0.1:27017/Amigos';

    var chalk = require('chalk');
    var routing = require('./libs/routing');
    var express = require('express');
    var passport = require('passport');
    var bodyParser = require('body-parser');
    var app = express();
    var http = require('http').Server(app);
    var io = require('socket.io')(http);
    var expressSession = require('express-session');

    // Bootstrapping
    //
    app.use(expressSession({
        secret: 'ASDASDASDASDASDQWEQWEACCC@!@DSASDQWQWDSDASDWQ',
        name: 'AMIGOS',
        proxy: true,
        resave: true,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(bodyParser.json());
    routing.setRouting(app);

    passport.serializeUser(function (user, done) {
        done(null, user.username);
    });

    passport.deserializeUser(function (username, done) {

        console.log(username);
        done(null, {
            username: username
        });

        return;
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    // Listen
    //
    http.listen(expressPort, expressIPAddress);
    console.log(chalk.bold.yellow('LISTENING'), 'express', chalk.cyan(expressIPAddress), chalk.cyan(expressPort));

})();