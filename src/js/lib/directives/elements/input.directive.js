// Copyright (c) Dyoub Applications. All rights reserved.
// Licensed under MIT (https://github.com/dyoub/app/blob/master/LICENSE).

(function () {

    function InputDirective() {
        return {
            restrict: 'E',
            link: function (scope, $element, attrs) {
                $element.attr('autocomplete', 'off');
            }
        };
    }

    angular.module('dyoubTheme').directive('input', [
        InputDirective
    ]);

})();
