// Copyright (c) Dyoub Applications. All rights reserved.
// Licensed under MIT (https://github.com/dyoub/app/blob/master/LICENSE).

(function () {

    function ValidDateAfterDirective($parse) {
        function link(scope, $element, attrs, ngModelCtrl) {
            var dateGetter = $parse(attrs.validDateSameOrAfter);

            function validate(date, anotherDate) {
                var isValid = ngModelCtrl.$isEmpty(date) ||
                              ngModelCtrl.$isEmpty(anotherDate) ||
                              moment(date).isSameOrAfter(anotherDate);

                ngModelCtrl.$setValidity('dateSameOrAfter', isValid);
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

    angular.module('dyoub.theme').directive('validDateSameOrAfter', [
        '$parse',
        ValidDateAfterDirective
    ]);

})();
