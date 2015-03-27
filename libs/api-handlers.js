(function () {
    'use strict';

    var express = require('express');
    var path = require('path');
    var common = require('./common');

    module.exports.root = root;
    module.exports.hi = hi;
    module.exports.users = users;
    module.exports.events = events;
    module.exports.static = express.static(path.join(common.appDir, 'static'));

    // -----------------------

    function root(request, response) {
        response.sendFile(path.join(common.appDir, 'static', 'index.html'));
    }

    function hi(request, response) {
        response.json({hello: 'world'});
    }

    function events(request, response) {

        // TODO: get from db or something
        var events = [];

        events.push({name:'asd1'});
        events.push({name:'asd2'});
        events.push({name:'asd3'});
        events.push({name:'asd4'});
        events.push({name:'asd5'});

        response.json(events);
    }

    function users(request, response) {

        var result = {};

        result.name = 'osnat';
        result.type = 123;
        result.isValid = true;

        response.json(result);
    }

})();