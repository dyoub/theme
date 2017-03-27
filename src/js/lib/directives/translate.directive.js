// Copyright (c) Dyoub Applications. All rights reserved.
// Licensed under MIT (https://github.com/dyoub/app/blob/master/LICENSE).

(function () {

    function TranslateDirective(translate) {
        return {
            restrict: 'A',
            link: function (scope, $element, attrs) {
                $element.html(translate(attrs.translate));
            }
        };
    }

    angular.module('dyoub.theme').directive('translate', [
        'Translate',
        TranslateDirective
    ]);

})();
