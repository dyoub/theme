// Copyright (c) Dyoub Applications. All rights reserved.
// Licensed under MIT (https://github.com/dyoub/app/blob/master/LICENSE).

(function () {

    function TranslateFilter(translate) {
        return function (entry) {
            return translate(entry);
        }
    }

    angular.module('dyoubTheme').filter('translate', [
        'Translate',
        TranslateFilter
    ]);

})();
