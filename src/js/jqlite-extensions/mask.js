// Copyright (c) Dyoub Applications. All rights reserved.
// Licensed under MIT (https://github.com/dyoub/app/blob/master/LICENSE).

(function (JQLite) {

    JQLite.prototype.mask = function (maskFormat) {
        var element = this;

        function mask(value) {
            var digits = value.replace(/[^\d]/g, ''),
                formatedValue = '';

            for (var d = 0, m = 0; d < digits.length && m < maskFormat.length; d++, m++) {
                var digit = digits[d],
                    mask = maskFormat[m];

                while (m < maskFormat.length && mask !== '9') {
                    formatedValue += mask;
                    mask = maskFormat[++m];
                }

                formatedValue += digit;
            }

            return formatedValue;
        }

        element.on('paste cut', function () {
            // TODO
        });

        element.keypress(function (e) {
            if (e.isNumber) {
                var caret = element.caret(),
                    oldValue = element.val(),
                    newValue = oldValue.insert(e.char, caret.selectionStart, caret.selectionEnd),
                    formatedValue = mask(newValue),
                    maxlength = parseInt(element.attr('maxlength'));

                if (maxlength && oldValue.length === maxlength && caret.selectionStart === caret.selectionEnd) return;

                caret.selectionStart += (1 + (formatedValue.length - newValue.length));
                caret.selectionEnd = caret.selectionStart;

                element.val(formatedValue);
                element.triggerHandler('input');
                element.caret(caret);
            }

            if (e.isEnter) return;

            e.preventDefault();
        });

        element.keydown(function (e) {
            if (e.isBackspace || e.isDelete) {
                var caret = element.caret(),
                    oldValue = element.val(),
                    newValue = oldValue.remove(caret.selectionStart, caret.selectionEnd, e.isDelete),
                    formatedValue = mask(newValue);

                if (caret.selectionStart > 0 && caret.selectionStart === caret.selectionEnd && e.isBackspace) {
                    caret.selectionStart--;
                }

                caret.selectionEnd = caret.selectionStart;

                element.val(formatedValue);
                element.triggerHandler('input');
                element.caret(caret);

                e.preventDefault();
            }
        });

        return element;
    };

})(angular.element);
