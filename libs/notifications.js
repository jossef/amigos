(function () {
    'use strict';

    var redis = require("redis").createClient();
    var Q = require("q");

    module.exports = {
        notify: notify,
        getNotifications: getNotifications
    };

    // ............................

    function notify(userId, data) {
        var key = 'notifications:' + userId;
        redis.rpush(key, JSON.stringify(data));
    }


    function getNotifications(userId) {
        var def = Q.defer();

        var key = 'notifications:' + userId;
        var notifications = redis.lrange(key, 0, -1, function (err, notifications) {

            if (err) {
                def.reject(err);
            }

            notifications = notifications.map(function(item){
                return JSON.parse(item);
            });

            redis.del(key);
            def.resolve(notifications);
        });

        return def.promise;
    }

})();