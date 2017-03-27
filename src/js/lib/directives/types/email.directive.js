// Copyright (c) Dyoub Applications. All rights reserved.
// Licensed under MIT (https://github.com/dyoub/app/blob/master/LICENSE).

(function () {

    var VALIDITY_REGEXP = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

    function TypeEmailDirective() {
        function postLink(scope, $element, attrs, ngModel) {
            ngModel.$parsers.unshift(function (viewValue) {
                if (VALIDITY_REGEXP.test(viewValue)) {
                    ngModel.$setValidity('email', true);
                    return viewValue;
                }

                ngModel.$setValidity('email', ngModel.$isEmpty(viewValue));
                return null;
            });

            $element.attr('maxlength', 50);
        }

        return {
            restrict: 'A',
            require: 'ngModel',
            link: postLink
        };
    }

    angular.module('dyoub.theme').directive('typeEmail', [
        TypeEmailDirective
    ]);

})();
