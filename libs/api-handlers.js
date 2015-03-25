(function () {
    'use strict';

    var express = require('express');
    var path = require('path');
    var common = require('./common');

    module.exports.root = root;
    module.exports.hi = hi;
    module.exports.static = express.static(path.join(common.appDir, 'static'));

    function root(request, response) {
        response.sendFile(path.join(common.appDir, 'static', 'index.html'));
    }

    function hi(request, response) {
        response.json({hello: 'world'});
    }

})();