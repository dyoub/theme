// Copyright (c) Dyoub Applications. All rights reserved.
// Licensed under MIT (https://github.com/dyoub/app/blob/master/LICENSE).

(function () {

    function ValidDateBeforeDirective($parse) {
        function link(scope, $element, attrs, ngModelCtrl) {
            var dateGetter = $parse(attrs.validDateBefore);

            function validate(date, anotherDate) {
                var isValid = ngModelCtrl.$isEmpty(date) ||
                              ngModelCtrl.$isEmpty(anotherDate) ||
                              date.before(anotherDate);

                ngModelCtrl.$setValidity('dateBefore', isValid);
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

    angular.module('dyoubTheme').directive('validDateBefore', [
        '$parse',
        ValidDateBeforeDirective
    ]);

})();
