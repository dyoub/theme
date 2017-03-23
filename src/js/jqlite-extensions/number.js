// Copyright (c) Dyoub Applications. All rights reserved.
// Licensed under MIT (https://github.com/dyoub/app/blob/master/LICENSE).

(function (JQLite) {

    JQLite.prototype.number = function (options) {
        var $element = this;

        function mask(newValue, oldValue) {
            var digits = newValue.replace(/[^\d]/g, '').replace(/^0+/, ''),
                precision = options.precision,
                scale = options.scale,
                decimalSeparator = options.decimalSeparator,
                integerPart = digits.length > scale ? digits.slice(0, digits.length - scale) : '0',
                fractionalPart = '',
                formatedValue = '';

            if (digits.length > precision) {
                return oldValue;
            }

            if (newValue === '') {
                return '';
            }

            formatedValue = integerPart;

            if (scale > 0) {
                var fractionalPart = digits.length > scale ? digits.slice(digits.length - scale) : digits,
                    leadingZeros = new Array((scale + 1) - fractionalPart.length).join(0);

                formatedValue += decimalSeparator + leadingZeros + fractionalPart;
            }

            return formatedValue;
        };

        $element.on('paste', function (e) {
            e.preventDefault(); // TODO: Do something better than this
        });

        $element.keypress(function (e) {
            if (e.isNumber) {
                var caret = $element.caret(),
                    oldValue = $element.val(),
                    newValue = oldValue.insert(e.char, caret.selectionStart, caret.selectionEnd),
                    formatedValue = mask(newValue, oldValue);

                caret.selectionStart += (1 + (formatedValue.length - newValue.length));
                caret.selectionEnd = caret.selectionStart;

                $element.val(formatedValue);
                $element.triggerHandler('input');
                $element.caret(caret);
            }

            if (e.isEnter) return;

            e.preventDefault();
        });

        $element.keydown(function (e) {
            if (e.isBackspace || e.isDelete) {
                var caret = $element.caret(),
                    oldValue = $element.val(),
                    newValue = oldValue.remove(caret.selectionStart, caret.selectionEnd, e.isDelete),
                    formatedValue = mask(newValue, oldValue);

                if (e.isBackspace) {
                    if (caret.selectionStart > 0 && caret.selectionStart === caret.selectionEnd && formatedValue.charAt(0) !== '0') {
                        caret.selectionStart--;
                    }
                }

                if (e.isDelete) {
                    var nextCharIsZero = formatedValue.charAt(caret.selectionStart) === '0',
                        nextCharIsDecimalSeparator = formatedValue.charAt(caret.selectionStart) === options.decimalSeparator;

                    if (nextCharIsZero || nextCharIsDecimalSeparator) {
                        caret.selectionStart++
                    }
                }

                if (oldValue === '' || oldValue === mask('0')) {
                    formatedValue = '';
                }

                caret.selectionEnd = caret.selectionStart;

                $element.val(formatedValue);
                $element.triggerHandler('input');
                $element.caret(caret);

                e.preventDefault();
            }
        });

        return $element;
    };

})(angular.element);
