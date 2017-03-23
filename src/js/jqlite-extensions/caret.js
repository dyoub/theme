// Copyright (c) Dyoub Applications. All rights reserved.
// Licensed under MIT (https://github.com/dyoub/app/blob/master/LICENSE).

(function (JQLite) {

    JQLite.prototype.caret = function (caret) {
        var domElement = this[0];

        if (typeof domElement.selectionStart === 'number' && typeof domElement.selectionEnd === 'number') {
            if (caret) {
                // Set selection range

                domElement.selectionStart = caret.selectionStart;
                domElement.selectionEnd = caret.selectionEnd;
            } else {
                // Get selection range

                caret = {
                    selectionStart: domElement.selectionStart,
                    selectionEnd: domElement.selectionEnd
                };
            }

            return caret;
        }

        // IE Support

        if (document.selection) {
            var range = document.selection.createRange();

            if (range && range.parentElement() === domElement) {
                if (caret) {
                    // Set selection range

                    var range = domElement.createTextRange();
                    range.collapse(true);
                    range.moveEnd('character', caret.selectionEnd);
                    range.moveStart('character', caret.selectionStart);
                    range.select();
                } else {
                    // Get selection range

                    var textInputRange = domElement.createTextRange(),
                        endRange = domElement.createTextRange(),
                        length = domElement.value.length,
                        normalizedValue = domElement.value.replace(/\r\n/g, '\n');

                    caret = {};

                    textInputRange.moveToBookmark(range.getBookmark());
                    endRange.collapse(false);

                    if (textInputRange.compareEndPoints('StartToEnd', endRange) > -1) {
                        caret.selectionStart = length;
                        caret.selectionEnd = length;
                    } else {
                        caret.selectionStart = -textInputRange.moveStart('character', -length);
                        caret.selectionStart += normalizedValue.slice(0, caret.selectionStart).split('\n').length - 1;

                        if (textInputRange.compareEndPoints('EndToEnd', endRange) > -1) {
                            caret.selectionEnd = length;
                        } else {
                            caret.selectionEnd = -textInputRange.moveEnd('character', -length);
                            caret.selectionEnd += normalizedValue.slice(0, caret.selectionEnd).split('\n').length - 1;
                        }
                    }
                }

                return caret;
            }
        }

        return {
            selectionStart: -1,
            selectionEnd: -1,
        };
    };

})(angular.element);
