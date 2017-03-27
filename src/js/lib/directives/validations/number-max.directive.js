// Copyright (c) Dyoub Applications. All rights reserved.
// Licensed under MIT (https://github.com/dyoub/app/blob/master/LICENSE).

(function () {

    function ValidNumberMaxDirective($parse) {
        function link(scope, $element, attrs, ngModelCtrl) {
            var numberGetter = $parse(attrs.validNumberMax);

            function validate(number, anotherNumber) {
                var isValid = ngModelCtrl.$isEmpty(number) ||
                              ngModelCtrl.$isEmpty(anotherNumber) ||
                              number <= anotherNumber;

                ngModelCtrl.$setValidity('maxNumber', isValid);
            }

            scope.$watch(attrs.ngModel, function (number) {
                validate(number, numberGetter(scope));
            });

            scope.$watch(function () {
                return numberGetter(scope);
            }, function (anotherNumber) {
                validate(ngModelCtrl.$modelValue, anotherNumber);
            });
        }

        return {
            restrict: 'A',
            require: 'ngModel',
            link: link
        };
    }

    angular.module('dyoub.theme').directive('validNumberMax', [
        '$parse',
        ValidNumberMaxDirective
    ]);

})();
