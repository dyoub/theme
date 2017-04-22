// Copyright (c) Dyoub Applications. All rights reserved.
// Licensed under MIT (https://github.com/dyoub/app/blob/master/LICENSE).

(function () {

    Date.prototype.equals = function (date) {
        var currentDate = this;

        if (date === null || date === undefined) {
            return false;
        }

        return this.getTime() === date.getTime();

    };

    Date.prototype.getLastDate = function () {
        var year = this.getFullYear();
        var month = this.getMonth();

        return new Date(year, month + 1, 0).getDate();
    };

})();
