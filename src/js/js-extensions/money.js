// Copyright (c) Dyoub Applications. All rights reserved.
// Licensed under MIT (https://github.com/dyoub/app/blob/master/LICENSE).

(function () {

    window.Money = function (amount) {
        if (typeof amount !== 'number') {
            amount = 0;
        }

        this.divide = function (installments) {
            var payments = new Array(installments);

            // TODO

            return payments;
        };
    }

})();
