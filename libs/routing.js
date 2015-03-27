(function () {
    'use strict';

    var api = require('./api-handlers');
    module.exports.setRouting = setRouting;

    function setRouting(app){
        app.use('/static/', api.static);
        app.get("/api/hi", api.hi);
        app.get("/api/users", api.users);
        app.get("/api/events", api.events);
        app.get("/", api.root);
    }

})();