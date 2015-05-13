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
        app.delete('/api/events/:eventId/participants/:participantId', api.removeEventParticipant);

        app.post('/api/events/:id/join', api.joinEvent);
        app.post('/api/events/:id/dates', api.addEventDate);
        app.post('/api/events/:id/location', api.setEventLocation);
        app.delete('/api/events/:eventId/dates/:dateEpoch', api.removeEventDate);
        app.post('/api/events/:id/dates/primary', api.setEventPrimaryDate);
        app.post('/api/events/:id/dates/confirm', api.confirmEventDate);
        app.post('/api/events/:id/dates/decline', api.declineEventDate);

        app.get('/api/events/:id/products/recommend', api.recommendEventProducts);
        app.delete('/api/events/:eventId/products/:productId', api.removeEventProduct);
        app.post('/api/events/:id/products', api.addEventProduct);

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