// Copyright (c) Dyoub Applications. All rights reserved.
// Licensed under MIT (https://github.com/dyoub/app/blob/master/LICENSE).

(function () {

    Number.prototype.round = function (decimals) {
        return parseFloat(this.toFixed(decimals));
    };

})();
