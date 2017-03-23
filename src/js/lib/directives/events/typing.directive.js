// Copyright (c) Dyoub Applications. All rights reserved.
// Licensed under MIT (https://github.com/dyoub/app/blob/master/LICENSE).

(function () {

    function EventTypingDirective($parse) {
        function link(scope, $element, attrs, ngModelCtrl) {
            var start = $parse(attrs.eventTyping),
                disabled = $parse(attrs.eventTypingDisabled),
                typing,
                waiting = 700,
                initializing = true;

            scope.$watch(function () {
                return ngModelCtrl.$modelValue;
            }, function (modelValue) {
                if (initializing) {
                    initializing = false;
                    return;
                }

                if (disabled(scope)) return;
                if (!$element.is(':focus')) return;

                start(scope);

                clearTimeout(typing);

                typing = setTimeout(function () {
                    scope.$apply(attrs.eventTypingEnd);
                }, waiting);
            });
        }

        return {
            restrict: 'A',
            require: 'ngModel',
            link: link
        };
    }

    angular.module('dyoubTheme').directive('eventTyping', [
        '$parse',
        EventTypingDirective
    ]);

})();
