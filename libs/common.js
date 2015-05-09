(function () {
    'use strict';

    var path = require('path');
    var phone = require('node-phonenumber');

    module.exports = {
        appDir: getApplicationDirectory(),
        parsePhoneNumber: parsePhoneNumber,
        clone: clone,
        generateUUID: generateUUID,
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

    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);});
    }

})();

