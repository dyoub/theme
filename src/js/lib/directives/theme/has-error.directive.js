// Copyright (c) Dyoub Applications. All rights reserved.
// Licensed under MIT (https://github.com/dyoub/app/blob/master/LICENSE).

(function () {

    function HasErrorDirective() {
        return {
            restrict: 'A',
            link: function (scope, $element, attrs) {
                scope.$watch(attrs.hasError, function (hasError) {
                    if (hasError) {
                        $element.addClass('has-error');
                    } else {
                        $element.removeClass('has-error');
                    }
                });
            }
        };
    }

    angular.module('dyoub.theme').directive('hasError', [
        HasErrorDirective
    ]);

})();
