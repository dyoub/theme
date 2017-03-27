// Copyright (c) Dyoub Applications. All rights reserved.
// Licensed under MIT (https://github.com/dyoub/app/blob/master/LICENSE).

(function () {

    function ModalOpenDirective() {
        return {
            restrict: 'A',
            link: function (scope, $element, attrs) {
                scope.$watch(attrs.modalOpen, function (open) {
                    if (open) {
                        $('body').addClass('modal-open');
                        $element.addClass('show');
                    } else {
                        $('body').removeClass('modal-open');
                        $element.removeClass('show');
                    }
                });
            }
        };
    }

    angular.module('dyoub.theme').directive('modalOpen', [
        ModalOpenDirective
    ]);

})();
