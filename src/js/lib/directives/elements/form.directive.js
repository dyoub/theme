// Copyright (c) Dyoub Applications. All rights reserved.
// Licensed under MIT (https://github.com/dyoub/app/blob/master/LICENSE).

(function () {

    function FormDirective() {
        return {
            restrict: 'E',
            link: function (scope, $element, attrs) {
                $element.attr('novalidate', '');
            }
        };
    }

    angular.module('dyoubTheme').directive('form', [
        FormDirective
    ]);

})();

