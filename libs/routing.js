(function () {
    'use strict';

    module.exports = {
        setRouting: setRouting
    };

    // --------------------------------

    var api = require('./api-handlers');
    var express = require('express');
    var path = require('path');
    var common = require('./common');

    var staticFilesHandler = express.static(path.join(common.appDir, 'static'));

    function setRouting(app) {
        app.use('/static/', staticFilesHandler);

        app.get('/api/users', api.listUsers);
        app.get('/api/users/:id', api.getUser);
        app.post('/api/users', api.register);

        app.get('/api/events', api.events);
        app.post('/api/login', api.login);
        app.get('/api/logout', api.logout);

        app.get('/', api.root);
    }

})();