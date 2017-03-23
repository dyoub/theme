// Copyright (c) Dyoub Applications. All rights reserved.
// Licensed under MIT (https://github.com/dyoub/app/blob/master/LICENSE).

(function (JQLite) {

    JQLite.prototype.keydown = function (callback) {
        var element = this;

        element.on('keydown', function (e) {
            var keyCode = e.keyCode || e.which;

            e.isBackspace = keyCode === 8;
            e.isDelete = keyCode === 46 || keyCode === 63272 /* Safari */;
            e.isEnter = keyCode === 13;
            e.esc = e.keyCode === 27;

            if (typeof callback === 'function') {
                if (!e.handled) {
                    e.handled = true; // Make sure that event will fire once
                    callback(e);
                }
            }
        });

        return element;
    };

})(angular.element);
