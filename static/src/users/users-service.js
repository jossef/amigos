(function () {
    'use strict';

    angular.module('amigos')
        .service('userService', ['$q', UserService]);

    /**
     * Users DataService
     * Uses embedded, hard-coded data model; acts asynchronously to simulate
     * remote data service call(s).
     *
     * @returns {{loadAll: Function}}
     * @constructor
     */
    function UserService($q) {

        // Promise-based API
        return {
            loadAllUsers: function () {
                // Simulate async nature of real remote calls
                return $q.when(users);
            }
        };
    }

})();
