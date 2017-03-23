// Copyright (c) Dyoub Applications. All rights reserved.
// Licensed under MIT (https://github.com/dyoub/app/blob/master/LICENSE).

(function () {

    function SuggestionDirective($parse) {
        return {
            restrict: 'A',
            link: function (scope, $element, attrs) {
                var suggestionOpen = $parse(attrs.suggestionOpen);

                scope.$watch(attrs.suggestionOpen, function (opened) {
                    if (opened) {
                        $element.addClass('open');
                    } else {
                        $element.removeClass('open');
                    }
                });

                $element.onFocusOut(function () {
                    scope.$apply(function () {
                        suggestionOpen.assign(scope, false);
                    });
                });
            }
        };
    }

    angular.module('dyoubTheme').directive('suggestionOpen', [
        '$parse',
        SuggestionDirective
    ]);

})();
