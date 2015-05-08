(function () {
    'use strict';

    var path = require('path');
    var phone = require('node-phonenumber');

    module.exports = {
        appDir: getApplicationDirectory(),
        parsePhoneNumber: parsePhoneNumber,
        clone: clone,
        getRandomInt: getRandomInt
    };

    function getApplicationDirectory() {
        return path.dirname(require.main.filename);
    }

    function parsePhoneNumber(input) {
        var phoneUtil = phone.PhoneNumberUtil.getInstance();
        var phoneNumber = phoneUtil.parse(input, 'IL');
        return phoneUtil.format(phoneNumber, phone.PhoneNumberFormat.INTERNATIONAL);
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function clone(object) {
        return JSON.parse(JSON.stringify(object));
    }

})();

