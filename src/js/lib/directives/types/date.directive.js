// Copyright (c) Dyoub Applications. All rights reserved.
// Licensed under MIT (https://github.com/dyoub/app/blob/master/LICENSE).

(function () {

    var ASPNET_DATE_REGEXP = /^\/Date\(\d*\)\/$/;

    function TypeDateDirective($locale, $parse) {
        function link(scope, $element, attrs, ngModelCtrl) {
            var maskFormat = '99/99/9999',
                ngModel = $parse(attrs.ngModel),
                today = new Date();

            ngModelCtrl.$parsers.unshift(function (viewValue) {
                if (moment(viewValue, $locale.DATETIME_FORMATS.shortDate, true).isValid()) {
                    ngModelCtrl.$setValidity('date', true);
                    return moment(viewValue, $locale.DATETIME_FORMATS.shortDate).toDate();
                }

                ngModelCtrl.$setValidity('date', ngModelCtrl.$isEmpty(viewValue));
                return null;
            });

            ngModelCtrl.$formatters.push(function (modelValue) {
                if (!modelValue) return undefined;
                return moment(modelValue).format($locale.DATETIME_FORMATS.shortDate);
            });

            scope.$watch(attrs.ngModel, function (newValue) {
                if (ASPNET_DATE_REGEXP.test(newValue)) {
                    ngModel.assign(scope, moment(newValue).toDate());
                }
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

    angular.module('dyoub.theme').directive('typeDate', [
        '$locale',
        '$parse',
        TypeDateDirective
    ]);

})();
