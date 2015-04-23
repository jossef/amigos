(function () {
    'use strict';

    var app = angular.module('amigos');

    app.service('contactsService', ContactsService);

    function ContactsService($q, $cordovaContacts, $ionicPlatform, mockService) {

        var def = $q.defer();

        $ionicPlatform.ready(function () {

            if (isNative()) {
                $cordovaContacts.find({filter: ''})
                    .then(def.resolve, def.reject);
            }
            else {

                def.resolve(mockService.contacts);
            }
        });

        var getContactsPromise = def.promise;

        return {
            getContacts: getContacts,
            isNative: isNative
        };

        function getContacts() {
            return getContactsPromise;
        }

        function isNative() {
            // TOOD hack this around when more platform are relevant
            var isAndroid = ionic.Platform.isAndroid();
            return isAndroid;

        }

    }

})();
