// Copyright (c) Dyoub Applications. All rights reserved.
// Licensed under MIT (https://github.com/dyoub/app/blob/master/LICENSE).

(function () {

    Array.prototype.any = function () {
        return this.length > 0;
    };

    Array.prototype.contains = function (item, compare) {
        if (typeof compare !== 'function') {
            return this.indexOf(item) >= 0;
        }

        for (var i = 0; i < this.length; i++) {
            var currentItem = this[i];

            if (compare(currentItem, item)) {
                return true;
            }
        }

        return false;
    };

    Array.prototype.distinct = function (compare) {
        var result = [];

        for (var i = 0; i < this.length; i++) {
            var item = this[i];

            if (!result.contains(item, compare)) {
                result.push(item);
            }
        }

        return result;
    };

    Array.prototype.first = function () {
        return this[0];
    };

    Array.prototype.forEach = function (iterate) {
        for (var i = 0; i < this.length; i++) {
            iterate(this[i]);
        }
    };

    Array.prototype.hasDuplicate = function (compare) {
        return this.length !== this.distinct(compare).length;
    };

    Array.prototype.isEmpty = function () {
        return this.length === 0;
    };

    Array.prototype.last = function () {
        return this[this.length - 1];
    };

    Array.prototype.pushRange = function (items) {
        return Array.prototype.push.apply(this, items);
    };

    Array.prototype.remove = function (item, compare) {
        var index = -1;

        if (typeof compare === 'function') {
            for (var i = 0; i < this.length; i++) {
                var currentItem = this[i];

                if (compare(currentItem, item)) {
                    index = this.indexOf(currentItem);
                }
            }
        } else {
            index = this.indexOf(item);
        }

        if (index >= 0) {
            return this.splice(index, 1);
        }
    };

    Array.prototype.select = function (transform) {
        var result = [];

        for (var i = 0; i < this.length; i++) {
            result.push(transform(this[i]));
        }

        return result;
    };

    Array.prototype.where = function (query) {
        var result = [];

        for (var i = 0; i < this.length; i++) {
            if (query(this[i])) {
                result.push(this[i]);
            }
        }

        return result;
    };

})();
