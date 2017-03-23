// Copyright (c) Dyoub Applications. All rights reserved.
// Licensed under MIT (https://github.com/dyoub/app/blob/master/LICENSE).

(function () {

    String.prototype.contains = function (str) {
        return new RegExp(str, "i").test(this);
    };

    String.prototype.insert = function (char, start, end) {
        var str = this;

        if (start == 0 && end === 0) {
            return char + str;
        }

        if (start === str.length && end === str.length) {
            return str + char;
        }

        var prepend = str.substring(0, start),
            append = str.substring(end, str.length);

        return prepend + char + append;
    };

    String.prototype.remove = function (start, end, reverse) {
        var str = this;

        if (str === '') {
            return str;
        }

        if (start === end) {
            if (reverse) {
                // delete behavior
                if (start === str.length && end === str.length) return str;
                return str.insert('', start, ++end);
            } else {
                // backspace behavior
                if (start == 0 && end === 0) return str;
                return str.insert('', --start, end);
            }
        }

        return str.insert('', start, end);
    };

    String.prototype.replaceAll = function (search, replacement) {
        return this.replace(new RegExp(search, 'g'), replacement);
    };

})();
