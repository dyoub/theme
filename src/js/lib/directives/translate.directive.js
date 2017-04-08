// Copyright (c) Dyoub Applications. All rights reserved.
// Licensed under MIT (https://github.com/dyoub/app/blob/master/LICENSE).

(function () {

    function TranslateDirective($parse, translate) {
        return {
            restrict: 'A',
            link: function (scope, $element, attrs) {
                scope.$watch(function () {
                    return attrs.translate;
                }, function (label) {
                    $element.html(translate(label));
                });
            }
        };
    }

    angular.module('dyoub.theme').directive('translate', [
        '$parse',
        'Translate',
        TranslateDirective
    ]);

})();
