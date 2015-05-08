(function () {
    'use strict';

    var app = angular.module('amigos');

    app.service('calendarService', CalendarService);

    function formatDate(date) {

        date = new Date(date);

        var yyyy = date.getFullYear().toString();
        var mm = ( date.getMonth() + 1).toString(); // getMonth() is zero-based
        var dd = date.getDate().toString();

        return (yyyy + (mm[1] ? mm : "0" + mm[0]) + (dd[1] ? dd : "0" + dd[0]));

    }


    function CalendarService($q, lifecycleService) {

        return {
            openCurrentDateInCalendar: openCurrentDateInCalendar
        };

        function openCurrentDateInCalendar(date) {
            var def = $q.defer();

            if (lifecycleService.isNative()) {
                //TODO: IMPLEMENT NATIVE CALENDAR
            }
            else
            {
                var url = 'https://www.google.com/calendar/render?tab=mc&date=' + formatDate(date);
                window.open(url,'_blank');
            }

            return def.promise;
        }

    }

})();
