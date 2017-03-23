// Copyright (c) Dyoub Applications. All rights reserved.
// Licensed under MIT (https://github.com/dyoub/app/blob/master/LICENSE).

(function () {

    function PathService($window) {
        this.$window = $window;
    }

    PathService.prototype.build = function (pattern, params) {
        var patternParts = pattern.split('/').filter(String),
            params = params || {},
            path = '/';

        for (var i = 0; i < patternParts.length; i++) {
            var patternPart = patternParts[i];

            if (i > 0) path += '/';

            if (patternPart.startsWith(':')) {
                var paramName = patternPart.replace(':', ''),
                    paramValue = params[paramName];

                if (paramValue === null || paramValue === undefined || paramValue === '') {
                    throw new Error("Route parameter '" + paramName + "' is missing for template URL: " + pattern);
                }

                path += paramValue;
            } else {
                path += patternPart
            }
        }

        return path;
    };

    PathService.prototype.map = function (pattern) {
        var patternParts = pattern.split('/').filter(String),
            pathParts = this.$window.location.pathname.split('/').filter(String),
            params = {};

        for (var i = 0; i < patternParts.length; i++) {
            var patternPart = patternParts[i];

            if (patternPart.startsWith(':')) {
                var paramName = patternPart.replace(':', '');
                params[paramName] = pathParts[i];
            }
        }

        return params;
    };

    PathService.prototype.redirectTo = function (pattern, params) {
        this.$window.location.href = this.build(pattern, params);
    };

    angular.module('dyoubTheme').service('Path', [
        '$window',
        PathService
    ]);

})();
