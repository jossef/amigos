/**
 * Created by user on 3/25/15.
 */

(function () {
    'use strict';

    var path = require('path');
    module.exports.appDir = getApplicationDirectory();

    function getApplicationDirectory() {
        return path.dirname(require.main.filename);
    }

})();