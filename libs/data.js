(function () {
    'use strict';
    var redis = require("redis");
    var client = redis.createClient();


    function isUserExists(username){
        return client.get()
    }

    module.exports = {
        exists:exists
    };

})();