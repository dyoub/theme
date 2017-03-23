// Copyright (c) Dyoub Applications. All rights reserved.
// Licensed under MIT (https://github.com/dyoub/app/blob/master/LICENSE).

(function () {

    function HelpDirective(dialog) {
        return {
            restrict: 'A',
            link: function (scope, $element, attrs) {
                $element.on('click', function () {
                    scope.$apply(function () {
                        dialog.info(attrs.help);
                    });
                });
            }
        };
    }

    angular.module('dyoubTheme').directive('help', [
        'Dialog',
        HelpDirective
    ]);

})();
