// Copyright (c) Dyoub Applications. All rights reserved.
// Licensed under MIT (https://github.com/dyoub/app/blob/master/LICENSE).

(function () {

    function EventFocusoutDirective($document, $parse) {
        return {
            restrict: 'A',
            link: function (scope, $element, attrs) {
                $element.onFocusOut(function () {
                    scope.$apply(attrs.eventFocusout);
                });
            }
        };
    }

    angular.module('dyoubTheme').directive('eventFocusout', [
        '$document',
        '$parse',
        EventFocusoutDirective
    ]);

})();
