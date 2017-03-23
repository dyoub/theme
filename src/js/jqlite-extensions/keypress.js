// Copyright (c) Dyoub Applications. All rights reserved.
// Licensed under MIT (https://github.com/dyoub/app/blob/master/LICENSE).

(function (JQLite) {

    var NUMBER_REGEXP = /\d/;
    var LETTER_REGEXP = /[a-zA-Z]/;

    JQLite.prototype.keypress = function (callback) {
        var element = this;

        element.on('keypress', function (e) {
            var keyCode = e.keyCode || e.which;

            e.char = String.fromCharCode(keyCode);
            e.isNumber = NUMBER_REGEXP.test(e.char);
            e.isLetter = LETTER_REGEXP.test(e.char);
            e.isEnter = keyCode === 13;

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
