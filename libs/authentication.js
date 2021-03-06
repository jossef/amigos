(function () {
    'use strict';

    var passport = require('passport');
    var common = require('./common');
    var callbackConfig = {successRedirect: '/', failureRedirect: '/'};
    var googleScopes = [
        'profile',
        'email',
        'https://www.googleapis.com/auth/plus.login',
        'https://www.google.com/m8/feeds',
        'https://www.googleapis.com/auth/calendar'];

    module.exports = {
        register: register,
        login: login,
        logout: logout,
        facebookAuth: passport.authenticate('facebook', {scope: 'email'}),
        facebookAuthCallback: passport.authenticate('facebook', callbackConfig),
        googleAuth: passport.authenticate('google', {scope: googleScopes}),
        googleAuthCallback: passport.authenticate('google', callbackConfig)
    };

    function register(req, res, next) {

        var user = req.body;
        if (!user.phone) {
            return res.jsonError('Phone is required')
        }

        if (!user.nickname) {
            return res.jsonError('Nickname is required')
        }

        if (!user.password) {
            return res.jsonError('Password is required')
        }


        // To fixed phone number
        user.phone = common.parsePhoneNumber(user.phone);

        passport.authenticate('local-signup', function (err, user, info) {
            if (err) return next(err);
            if (!user) {
                return res.jsonError(info);
            }

            // Manually establish the session...
            req.login(user, function (err) {
                if (err) return next(err);

                res.json("Signed up successfully");
            });

        })(req, res, next);

    }


    function login(req, res, next) {
        // Input checks

        var user = req.body;
        if (!user.phone) {
            return res.jsonError('Phone is required')
        }

        if (!user.password) {
            return res.jsonError('Password is required')
        }

        // To fixed phone number
        user.phone = common.parsePhoneNumber(user.phone);

        passport.authenticate('local-login', function (err, user, info) {
            if (err) return next(err);
            if (!user) {
                return res.jsonError("Authentication failed");
            }

            // Manually establish the session...
            req.login(user, function (err) {
                if (err) return next(err);
                res.json("Authenticated successfully");
            });

        })(req, res, next);
    }

    function logout(request, response) {
        request.logout();
        response.end();
    }


})();
