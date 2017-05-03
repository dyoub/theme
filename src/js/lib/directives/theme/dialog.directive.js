// Copyright (c) Dyoub Applications. All rights reserved.
// Licensed under MIT (https://github.com/dyoub/app/blob/master/LICENSE).

(function () {

    function AppDialogDirective(dialog) {
        var template =
                '<div class="modal" data-ng-class="{ \'success\': isSuccess, \'info\': isInfo, \'danger\': isError }" data-modal-open="dialogOpen">' +
                    '<div class="modal-content">' +
                        '<div class="box">' +
                            '<div data-ng-repeat="message in messages" data-ng-bind="message"></div>' +
                        '</div>' +
                        '<button type="button" class="outline" data-ng-click="close()">OK</button>' +
                    '</div>' +
                '</div>';

        var link = function (scope, $element, attrs) {
            scope.$watch(function () {
                return dialog.getCurrentStatus();
            }, function (currentStatus) {
                scope.dialogOpen = !!currentStatus;

                if (scope.dialogOpen) {
                    scope.isSuccess = currentStatus.isSuccess;
                    scope.isInfo = currentStatus.isInfo;
                    scope.isError = currentStatus.isError;
                    scope.messages = currentStatus.messages;
                }
            });

            scope.close = function () {
                dialog.close();
            };
        }

        return {
            restrict: 'A',
            template: template,
            link: link
        };
    }

    angular.module('dyoub.theme').directive('dialog', [
        'Dialog',
        AppDialogDirective
    ]);

})();
