// Copyright (c) Dyoub Applications. All rights reserved.
// Licensed under MIT (https://github.com/dyoub/app/blob/master/LICENSE).

(function () {

    var VALIDITY_REGEXP = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

    function TypeTimeDirective($parse) {
        function link(scope, $element, attrs, ngModelCtrl) {
            var maskFormat = '99:99',
                ngModel = $parse(attrs.ngModel);

            ngModelCtrl.$parsers.unshift(function (viewValue) {
                if (VALIDITY_REGEXP.test(viewValue)) {
                    ngModelCtrl.$setValidity('time', true);
                    return viewValue;
                }

                ngModelCtrl.$setValidity('time', ngModelCtrl.$isEmpty(viewValue));
                return undefined;
            });

            $element.attr('maxlength', maskFormat.length);
            $element.mask(maskFormat);
        }

        return {
            restrict: 'A',
            require: 'ngModel',
            link: link
        };
    }

    angular.module('dyoubTheme').directive('typeTime', [
        '$parse',
        TypeTimeDirective
    ]);

})();
