// Copyright (c) Dyoub Applications. All rights reserved.
// Licensed under MIT (https://github.com/dyoub/app/blob/master/LICENSE).

(function () {

    var VALIDITY_REGEXP = /[-+]?(\d*[.,])?\d+$/;

    function TypeNumberDirective($compile, $filter, $locale) {
        function link(scope, $element, attrs, ngModelCtrl) {
            var options = attrs.typeNumber ? attrs.typeNumber.split(',') : [],
                precision = parseInt(options[0]) || 4,
                scale = parseInt(options[1]) || 0,
                $numberFilter = $filter('number'),
                number;

            ngModelCtrl.$parsers.unshift(function (viewValue) {
                if (VALIDITY_REGEXP.test(viewValue)) {
                    ngModelCtrl.$setValidity('number', true);

                    if (scale > 0) {
                        return parseFloat(viewValue.replace(',', '.'));
                    }

                    return parseInt(viewValue);
                }

                ngModelCtrl.$setValidity('number', ngModelCtrl.$isEmpty(viewValue));
                return null;
            });

            ngModelCtrl.$formatters.push(function (modelValue) {
                ngModelCtrl.$setValidity('number', true);

                if (angular.isNumber(modelValue)) {
                    return $numberFilter(modelValue, scale)
                        .replace(new RegExp('[' + $locale.NUMBER_FORMATS.GROUP_SEP + ']', 'g'), '');
                }

                return null;
            });

            $element.attr('maxlength', precision + 1); // [precision] + [decimal separator]
            $element.number({
                precision: precision,
                scale: scale,
                decimalSeparator: $locale.NUMBER_FORMATS.DECIMAL_SEP
            });
        }

        return {
            restrict: 'A',
            require: 'ngModel',
            link: link
        };
    }

    angular.module('dyoub.theme').directive('typeNumber', [
        '$compile',
        '$filter',
        '$locale',
        TypeNumberDirective
    ]);

})();
