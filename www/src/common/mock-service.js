(function () {
    'use strict';

    var app = angular.module('amigos');

    app.service('mockService', MockService);

    function MockService() {

        return {
            contacts: _contacts,
            pickContact: pickContact
        };

        function pickContact() {
            var item = _contacts[Math.floor(Math.random() * _contacts.length)];
            return {
                name: item.name,
                email: item.email,
                phone: item.phone
            };
        }

    }


    var _contacts = [
        {phone: '0505500010', name: 'Jossef', email: 'jossef@gmail.com'},
        {phone: '0505500011', name: 'Moshe', email: 'moshe@gmail.com'},
        {phone: '0505500012', name: 'Aharon', email: 'aharon@gmail.com'},
        {phone: '0505500013', name: 'David', email: 'david@gmail.com'},
        {phone: '0505500014', name: 'Lior', email: 'lior@gmail.com'},
        {phone: '0505500015', name: 'Reut', email: 'reut@gmail.com'},
        {phone: '0505500016', name: 'Adi', email: 'adi@gmail.com'},
        {phone: '0505500017', name: 'Liat', email: 'liat@gmail.com'},
        {phone: '0505500018', name: 'Osnat', email: 'osnat@gmail.com'},
        {phone: '0505500019', name: 'Naama', email: 'naama@gmail.com'},
        {phone: '0505500020', name: 'Lizi', email: 'lizi@gmail.com'}
    ];


})();
