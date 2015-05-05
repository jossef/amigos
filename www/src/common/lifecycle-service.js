(function () {
    'use strict';

    var app = angular.module('amigos');

    app.service('lifecycleService', LifecycleService);
    function LifecycleService($ionicPlatform) {

        $ionicPlatform.on('pause', function(){

        });

        // .................

        return {
            isNative: isNative
        };


        function isNative() {
            // TODO hack this around when more platform are relevant
            var isAndroid = ionic.Platform.isAndroid();
            return isAndroid;
        }
    }

})();
