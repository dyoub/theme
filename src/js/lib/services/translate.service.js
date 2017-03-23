// Copyright (c) Dyoub Applications. All rights reserved.
// Licensed under MIT (https://github.com/dyoub/app/blob/master/LICENSE).

(function () {

    function TranslateFactory($locale) {
        return function (entry) {
            return $locale.translation[entry] || entry;
        };
    }

    angular.module('dyoubTheme').factory('Translate', [
        '$locale',
        TranslateFactory
    ]);

})();
