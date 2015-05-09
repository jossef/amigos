(function () {
    'use strict';

    module.exports = {
        init: init,
        reload: reload
    };

    // ............................

    var userSockets = {};

    function init(io) {

        io.on('connection', function (socket) {

            var userId;

            socket.emit('identify');
            socket.on('identify', function (user) {

                if (!user || !user.id) {
                    return;
                }

                userId = user.id;
                userSockets[userId] = socket;
                console.log('identified', userId, user.phone, user.nickname);
            });


            socket.on('disconnect', function () {
                console.log('disconnected', userId);
            });

        });
    }


    function reload(userId) {
        if (!userId) {
            console.warn('got invalid user id', userId);
            return;
        }

        var userSocket = userSockets[userId];

        if (!userSocket) {
            console.warn('no socket for user id', userId);
            return;
        }

        userSocket.emit('reload');
    }

})();