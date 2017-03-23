// Copyright (c) Dyoub Applications. All rights reserved.
// Licensed under MIT (https://github.com/dyoub/app/blob/master/LICENSE).

(function () {

    // JSON results in ASP.NET MVC returns datetime like "/Date(1239018869048)/".
    // This directive converts to javascript Date when needed.

    function CTimeFilter($filter) {
        return function (datetime, format) {
            if (!datetime) return;

            var $dateFilter = $filter('date');

            if (angular.isDate(datetime)) {
                return $dateFilter(datetime, format);
            }

            var miliseconds = parseInt(/-?\d+/.exec(datetime));

            return $dateFilter(new Date(miliseconds), format);
        }
    }

    angular.module('dyoubTheme').filter('ctime', [
        '$filter',
        CTimeFilter
    ]);

})();
