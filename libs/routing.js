(function () {
    'use strict';

    var api = require('./api-handlers');
    var express = require('express');
    var path = require('path');
    var common = require('./common');
    var authentication = require('./authentication');

    module.exports = function(app, passport) {

        app.get('/api/users', api.listUsers);
        app.get('/api/users/:id', api.getUser);

        app.get('/api/events', api.getUserEvents);
        app.post('/api/events', api.createEvent);
        app.get('/api/events/:id/messages', api.getEventMessages);
        app.post('/api/events/:id/messages', api.addEventMessage);
        app.post('/api/events/:id/participants', api.addEventParticipant);
        app.post('/api/events/:id/participants/remove', api.removeEventParticipant);
        app.get('/api/events/:id/recommend', api.recommendEventProducts);
        app.get('/api/events/:id', api.getEvent);

        app.get('/api/info', api.getInfo);

        app.get('/api/notifications', api.getNotifications);

        app.get('/api/profile', api.getProfile);
        app.post('/api/profile', api.updateProfile);
        app.post('/api/profile', api.updateProfile);

        app.post('/api/validate/phone', api.validatePhone);

        app.post('/api/register', authentication.register);
        app.post('/api/login', authentication.login);
        app.get('/api/logout', authentication.logout);

        app.get('/auth/facebook', authentication.facebookAuth);
        app.get('/auth/facebook/callback', authentication.facebookAuthCallback);

        app.get('/auth/google', authentication.googleAuth);
        app.get('/auth/google/callback', authentication.googleAuthCallback);

        app.get('/', api.root);
    }
})();