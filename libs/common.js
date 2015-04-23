/**
 * Created by user on 3/25/15.
 */

(function () {
    'use strict';

    var path = require('path');
    var phone = require('node-phonenumber');

    module.exports.appDir = getApplicationDirectory();

    function getApplicationDirectory() {
        return path.dirname(require.main.filename);
    }

    module.exports.parsePhoneNumber = function (input) {
        var phoneUtil = phone.PhoneNumberUtil.getInstance();
        var phoneNumber = phoneUtil.parse(input,'IL');
        return phoneUtil.format(phoneNumber, phone.PhoneNumberFormat.INTERNATIONAL);
    };


})();

