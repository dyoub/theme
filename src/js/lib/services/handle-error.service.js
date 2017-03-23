// Copyright (c) Dyoub Applications. All rights reserved.
// Licensed under MIT (https://github.com/dyoub/app/blob/master/LICENSE).

(function () {

    function HandleErrorService(dialog) {
        return function (response) {
            switch (response.status) {
                case undefined:
                case null: dialog.error('UnkownError'); break;
                case 422: dialog.error(response.data); break;
                default: dialog.error(response.status); break;
            }
        };
    }

    angular.module('dyoubTheme').factory('HandleError', [
        'Dialog',
        HandleErrorService
    ]);

})();
