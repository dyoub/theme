// Copyright (c) Dyoub Applications. All rights reserved.
// Licensed under MIT (https://github.com/dyoub/app/blob/master/LICENSE).

(function () {

    function DialogController(dialog) {
        this.dialog = dialog;
    }

    DialogController.prototype.showSuccess = function () {
        this.dialog.success('SomeMessage');
    };

    DialogController.prototype.showInfo = function () {
        this.dialog.info('SomeMessage');
    };

    DialogController.prototype.showDanger = function () {
        this.dialog.error('SomeMessage');
    };

    angular.module('sample').controller('DialogController', [
        'Dialog',
        DialogController
    ]);

})();
