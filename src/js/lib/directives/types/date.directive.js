// Copyright (c) Dyoub Applications. All rights reserved.
// Licensed under MIT (https://github.com/dyoub/app/blob/master/LICENSE).

(function () {

    // TODO: Internationalization. This directive validates only date format dd/MM/yyyy.

    var VALIDITY_REGEXP = /^(?:(?:31(\/)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)\d{2})$|^(?:29(\/)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)\d{2})$/,
        ASPNET_DATE_REGEXP = /^\/Date\(\d*\)\/$/;

    function TypeDateDirective($filter, $parse) {
        function link(scope, $element, attrs, ngModelCtrl) {
            var $ctimeFilter = $filter('ctime'),
                maskFormat = '99/99/9999',
                ngModel = $parse(attrs.ngModel),
                today = new Date();

            ngModelCtrl.$parsers.unshift(function (viewValue) {
                if (VALIDITY_REGEXP.test(viewValue)) {
                    var split = viewValue.split('/'),
                        year = parseInt(split[2]),
                        month = parseInt(split[1]) - 1,
                        day = parseInt(split[0]);

                    ngModelCtrl.$setValidity('date', true);
                    return new Date(year, month, day);
                }

                ngModelCtrl.$setValidity('date', ngModelCtrl.$isEmpty(viewValue));
                return null;
            });

            scope.$watch(attrs.ngModel, function (newValue) {
                if (ASPNET_DATE_REGEXP.test(newValue)) {
                    var milliseconds = parseInt(newValue.replace(/[^0-9]/g, ''));
                    ngModel.assign(scope, new Date(milliseconds));
                }
            });

            ngModelCtrl.$formatters.push(function (modelValue) {
                return $ctimeFilter(modelValue, 'dd/MM/yyyy');
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
        '$parse',
        TypeDateDirective
    ]);

})();
