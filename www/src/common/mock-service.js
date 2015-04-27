(function () {
    'use strict';

    var app = angular.module('amigos');

    app.service('mockService', MockService);

    function MockService() {

        return {
            contacts: _contacts,
            pickContact: pickContact
        };

        function pickContact(){
            var item = _contacts[Math.floor(Math.random()*_contacts.length)];

            var email;

            if (item.emails && item.emails.length)
            {
                email = item.emails[0].value;
            }

            var phone;

            if (item.phoneNumbers && item.phoneNumbers.length)
            {
                phone = item.phoneNumbers[0].value;
            }

            return {
                name: item.displayName,
                email: email,
                phone: phone
            };
        }

    }

    var _contacts = [
        {
            "addresses": null,
            "birthday": null,
            "categories": null,
            "displayName": "טבת באביר",
            "emails": null,
            "id": "434",
            "ims": null,
            "name": {
                "familyName": "באביר",
                "formatted": "טבת באביר",
                "givenName": "טבת"
            },
            "nickname": null,
            "note": "",
            "organizations": null,
            "phoneNumbers": [
                {
                    "id": "3091",
                    "pref": false,
                    "type": "mobile",
                    "value": "0545551189"
                }
            ],
            "photos": null,
            "rawId": "432",
            "urls": null
        },
        {
            "addresses": null,
            "birthday": null,
            "categories": null,
            "displayName": "Nir Gabbre",
            "emails": [
                {
                    "id": "4441",
                    "pref": false,
                    "type": "other",
                    "value": "Nir@gmail.com"
                }
            ],
            "id": "614",
            "ims": null,
            "name": {
                "familyName": "Gabbre",
                "formatted": "Nir Gabbre",
                "givenName": "Nir"
            },
            "nickname": null,
            "note": "",
            "organizations": null,
            "phoneNumbers": null,
            "photos": null,
            "rawId": "611",
            "urls": null
        },
        {
            "addresses": null,
            "birthday": null,
            "categories": null,
            "displayName": "The Papercut Factory",
            "emails": null,
            "id": "600",
            "ims": null,
            "name": {
                "familyName": "Factory",
                "formatted": "The Papercut Factory",
                "givenName": "The",
                "middleName": "Papercut"
            },
            "nickname": null,
            "note": "",
            "organizations": null,
            "phoneNumbers": [
                {
                    "id": "4315",
                    "pref": false,
                    "type": "mobile",
                    "value": "036007997"
                }
            ],
            "photos": null,
            "rawId": "593",
            "urls": null
        },
        {
            "addresses": null,
            "birthday": null,
            "categories": null,
            "displayName": "ארז דורי",
            "emails": null,
            "id": "435",
            "ims": null,
            "name": {
                "familyName": "דורי",
                "formatted": "ארז דורי",
                "givenName": "ארז"
            },
            "nickname": null,
            "note": "",
            "organizations": null,
            "phoneNumbers": [
                {
                    "id": "3152",
                    "pref": false,
                    "type": "mobile",
                    "value": "0545516444"
                }
            ],
            "photos": null,
            "rawId": "440",
            "urls": null
        },
        {
            "addresses": null,
            "birthday": null,
            "categories": null,
            "displayName": "ירון הראל",
            "emails": null,
            "id": "436",
            "ims": null,
            "name": {
                "familyName": "הראל",
                "formatted": "ירון הראל",
                "givenName": "ירון"
            },
            "nickname": null,
            "note": "",
            "organizations": null,
            "phoneNumbers": [
                {
                    "id": "3029",
                    "pref": false,
                    "type": "mobile",
                    "value": "0505298872"
                }
            ],
            "photos": null,
            "rawId": "424",
            "urls": null
        }
    ];


})();
