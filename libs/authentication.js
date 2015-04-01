(function () {
    'use strict';

    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;

    var local = new LocalStrategy(
        function (username, password, done) {
            if (!user) {
                return done(null, false, {message: 'Incorrect username.'});
            }

            if (!user.validPassword(password)) {
                return done(null, false, {message: 'Incorrect password.'});
            }

            return done(null, user);
        }
    );



    module.exports = {
        local:local
    };

})();
