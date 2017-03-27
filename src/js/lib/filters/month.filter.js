// Copyright (c) Dyoub Applications. All rights reserved.
// Licensed under MIT (https://github.com/dyoub/app/blob/master/LICENSE).

(function () {

    function MonthFilter($locale) {
        return function (monthIndex) {
            if (monthIndex < 0 || monthIndex > 11) {
                return '';
            }

            return $locale.DATETIME_FORMATS.MONTH[monthIndex];
        }
    }

    angular.module('dyoub.theme').filter('month', [
        '$locale',
        MonthFilter
    ]);

})();
