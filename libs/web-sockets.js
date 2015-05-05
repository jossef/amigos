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
            socket.emit('identify');
            socket.on('identify', function (user) {

                if (!user || !user.id)
                {
                    return;
                }

                userSockets[user.id] = socket;

                console.log('identified', user.id, user.phone, user.nickname);
            });
        });
    }


    function reload(userId)
    {
        if (!userId)
        {
            console.warn('got invalid user id', userId);
            return;
        }

        var userSocket = userSockets[userId];

        if (!userSocket)
        {
            console.warn('no socket for user id', userId);
            return;
        }

        userSocket.emit('reload');
    }

})();