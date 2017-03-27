// Copyright (c) Dyoub Applications. All rights reserved.
// Licensed under MIT (https://github.com/dyoub/app/blob/master/LICENSE).

(function () {

    function EscapeHtmlFilter($sce) {
        return function (htmlContent) {
            var escaped = angular.element('<div>').text(htmlContent).html(),
                formatted = escaped.replace(/\r?\n/g, '<br />');

            return $sce.trustAsHtml(formatted);
        }
    }

    angular.module('dyoub.theme').filter('escapeHtml', [
        '$sce',
        EscapeHtmlFilter
    ]);

})();
