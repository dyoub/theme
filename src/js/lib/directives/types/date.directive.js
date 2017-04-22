// Copyright (c) Dyoub Applications. All rights reserved.
// Licensed under MIT (https://github.com/dyoub/app/blob/master/LICENSE).

(function () {

    function TypeDateDirective($filter, $locale, $parse) {
        function link(scope, $element, attrs, ngModelCtrl) {
            var $ctimeFilter = $filter('ctime'),
                maskFormat = '99/99/9999',
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
                return $ctimeFilter(modelValue, $locale.DATETIME_FORMATS.shortDate);
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
        '$filter',
        '$locale',
        '$parse',
        TypeDateDirective
    ]);

})();
