// Copyright (c) Dyoub Applications. All rights reserved.
// Licensed under MIT (https://github.com/dyoub/app/blob/master/LICENSE).

(function () {

    function NavbarDirective() {
        return {
            restrict: 'EC',
            link: function (scope, $element, attrs) {
                if ($element.hasClass('fixed')) {
                    $window = angular.element(window);

                    $window.on('load scroll', function () {
                        if ($window.scrollTop()) {
                            $element.addClass('scrolled');
                        } else {
                            $element.removeClass('scrolled');
                        }
                    });
                }
            }
        };
    }

    angular.module('dyoub.theme').directive('navbar', [
        NavbarDirective
    ]);

})();
