// Copyright (c) Dyoub Applications. All rights reserved.
// Licensed under MIT (https://github.com/dyoub/app/blob/master/LICENSE).

(function () {

    function SectionLinkDirective() {
        return {
            restrict: 'A',
            link: function (scope, $element, attrs) {
                var $document = angular.element(document),
                    $page = $document.find('html, body'),
                    $section = $document.find(attrs.sectionLink),
                    $navbar = $document.find('.navbar.fixed');

                $element.on('click', function () {
                    var position = $section.offset().top - ($navbar.height() || 0);
                    $page.animate({ scrollTop: position }, 'slow');
                });
            }
        };
    }

    angular.module('dyoub.theme').directive('sectionLink', [
        SectionLinkDirective
    ]);

})();
