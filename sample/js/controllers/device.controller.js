// Copyright (c) Dyoub Applications. All rights reserved.
// Licensed under MIT (https://github.com/dyoub/app/blob/master/LICENSE).

(function () {

    function DeviceController(dialog) {
        this.dialog = dialog;
    }

    DeviceController.prototype.showMessage = function () {
        this.dialog.success('Selected file: ' + this.selectedFile.name);
    };

    angular.module('sample').controller('DeviceController', [
        'Dialog',
        DeviceController
    ]);

})();
