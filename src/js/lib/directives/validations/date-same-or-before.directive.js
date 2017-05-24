// Copyright (c) Dyoub Applications. All rights reserved.
// Licensed under MIT (https://github.com/dyoub/app/blob/master/LICENSE).

(function () {

    function ValidDateBeforeDirective($locale, $parse) {
        function link(scope, $element, attrs, ngModelCtrl) {
            var dateGetter = $parse(attrs.validDateSameOrBefore);

            function validate(date, anotherDate) {
                var isValid = ngModelCtrl.$isEmpty(date) ||
                              ngModelCtrl.$isEmpty(anotherDate) ||
                              moment(date).isSameOrBefore(anotherDate);

                ngModelCtrl.$setValidity('dateSameOrBefore', isValid);
            }

            scope.$watch(attrs.ngModel, function (date) {
                validate(date, dateGetter(scope));
            });

            scope.$watch(function () {
                return dateGetter(scope);
            }, function (anotherDate) {
                validate(ngModelCtrl.$modelValue, anotherDate);
            });
        }

        return {
            restrict: 'A',
            require: 'ngModel',
            link: link
        };
    }

    angular.module('dyoub.theme').directive('validDateSameOrBefore', [
        '$locale',
        '$parse',
        ValidDateBeforeDirective
    ]);

})();
