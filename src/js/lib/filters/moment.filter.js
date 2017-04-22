// Copyright (c) Dyoub Applications. All rights reserved.
// Licensed under MIT (https://github.com/dyoub/app/blob/master/LICENSE).

(function () {

    function MomentFilter($locale) {
        return function (datetime, format) {
            if (!datetime) return;
            return moment(datetime).format($locale.DATETIME_FORMATS[format]);
        }
    }

    angular.module('dyoub.theme').filter('moment', [
        '$locale',
        MomentFilter
    ]);

})();
