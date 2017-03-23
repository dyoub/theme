// Copyright (c) Dyoub Applications. All rights reserved.
// Licensed under MIT (https://github.com/dyoub/app/blob/master/LICENSE).

(function () {

    function AppDialogDirective(dialog) {
        var template =
                '<div class="modal" data-ng-class="{ \'success\': isSuccess, \'info\': isInfo, \'danger\': isError }" data-modal-open="dialogOpen">' +
                    '<div class="modal-content">' +
                        '<div data-ng-repeat="message in messages" data-ng-bind="message"></div>' +
                        '<button type="button" class="close" data-ng-click="close()">&times;</button>' +
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

    angular.module('dyoubTheme').directive('dialog', [
        'Dialog',
        AppDialogDirective
    ]);

})();
