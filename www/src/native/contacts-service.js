(function () {
    'use strict';

    var app = angular.module('amigos');

    app.service('contactsService', ContactsService);


    function ContactsService($q, $cordovaContacts, $ionicPlatform, mockService) {

        var getContactsPromise = _getContacts();

        return {
            getContacts: getContacts,
            pickContact: pickContact,
            isNative: isNative
        };

        // ........

        function pickContact() {
            var def = $q.defer();

            if (isNative()) {
                window.plugins.ContactChooser.chooseContact(function (contactInfo) {
                    // setTimeout - workaround for ios
                    setTimeout(function () {
                        var contact = {
                            name: contactInfo.displayName,
                            email: contactInfo.email,
                            phone: contactInfo.phoneNumber
                        };

                        def.resolve(contact);

                    }, 0);
                });
            }
            else {
                var contact = mockService.pickContact();
                def.resolve(contact);
            }

            return def.promise;

        }

        function getContacts() {
            return getContactsPromise;
        }

        function isNative() {
            // TOOD hack this around when more platform are relevant
            var isAndroid = ionic.Platform.isAndroid();
            return isAndroid;

        }

        function _getContacts() {

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

            return def.promise;
        }

    }

})();
