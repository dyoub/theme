// Copyright (c) Dyoub Applications. All rights reserved.
// Licensed under MIT (https://github.com/dyoub/app/blob/master/LICENSE).

(function () {

    function EventKeyEnterDirective($document, $parse) {
        return {
            restrict: 'A',
            link: function (scope, $element, attrs) {
                $element.keypress(function (e) {
                    if (e.isEnter) {
                        scope.$apply(attrs.eventKeyEnter);
                    }
                });
            }
        };
    }

    angular.module('dyoub.theme').directive('eventKeyEnter', [
        '$parse',
        EventKeyEnterDirective
    ]);

})();
