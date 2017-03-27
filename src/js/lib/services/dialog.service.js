// Copyright (c) Dyoub Applications. All rights reserved.
// Licensed under MIT (https://github.com/dyoub/app/blob/master/LICENSE).

(function () {

    function DialogService(translate) {
        this.status = null;
        this.translate = translate;
    }

    DialogService.prototype.getCurrentStatus = function () {
        return this.status;
    };

    DialogService.prototype.close = function () {
        this.status = null;
    };

    DialogService.prototype.error = function (messages) {
        this.status = this.newStatus('error', messages);
    };

    DialogService.prototype.info = function (messages) {
        this.status = this.newStatus('info', messages);
    };

    DialogService.prototype.success = function (messages) {
        this.status = this.newStatus('success', messages);
    };

    DialogService.prototype.newStatus = function (type, content) {
        var service = this,
            messages = angular.isArray(content) ? content : [content];

        return {
            isSuccess: type === 'success',
            isInfo: type === 'info',
            isError: type === 'error',
            messages: messages.select(function (message) {
                return service.translate(message);
            })
        };
    }

    angular.module('dyoub.theme').service('Dialog', [
        'Translate',
        DialogService
    ]);

})();
