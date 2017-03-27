// Copyright (c) Dyoub Applications. All rights reserved.
// Licensed under MIT (https://github.com/dyoub/app/blob/master/LICENSE).

(function () {

    function PlaceholderDirective(translate) {
        return {
            restrict: 'A',
            link: function (scope, $element, attrs) {
                $element.attr('placeholder', translate(attrs.placeholder));
            }
        };
    }

    angular.module('dyoub.theme').directive('placeholder', [
        'Translate',
        PlaceholderDirective
    ]);

})();
