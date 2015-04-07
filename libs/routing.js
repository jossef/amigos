(function () {
    'use strict';

    var api = require('./api-handlers');
    var express = require('express');
    var path = require('path');
    var common = require('./common');
    var authentication = require('./authentication');

    var staticFilesHandler = express.static(path.join(common.appDir, 'static'));

    module.exports = function(app, passport) {

        app.use('/static/', staticFilesHandler);

        app.get('/api/users', api.listUsers);
        app.get('/api/users/:id', api.getUser);
        app.get('/api/events', api.events);

        app.post('/api/register', authentication.register);
        app.post('/api/login', authentication.login);
        app.get('/api/logout', authentication.logout);

        app.get('/', api.root);
    }
})();