// Copyright (c) Dyoub Applications. All rights reserved.
// Licensed under MIT (https://github.com/dyoub/app/blob/master/LICENSE).

(function () {

    function FileManagerDirective($parse, buffer) {
        return {
            restrict: 'A',
            link: function (scope, $element, attrs) {
                var $input = angular.element('<input/>').attr('type', 'file'),
                    type = attrs.deviceFileType,
                    model = $parse(attrs.deviceFile),
                    maxSize = $parse(attrs.deviceFileMaxsize),
                    onChange = $parse(attrs.deviceFileChange);

                function readFile(file, onReady) {
                    var reader = new FileReader();

                    if (!file.$errors) {
                        reader.onload = function (e) {
                            file.dataURL = e.target.result;
                            onReady();
                        };

                        reader.readAsDataURL(file);
                    } else {
                        onReady();
                    }
                }

                function validateFileType(file) {
                    if (type) {
                        var regex = new RegExp(type);

                        if (!regex.test(file.type)) {
                            file.$errors = file.$errors || [];
                            file.$errors.push('type');
                        }
                    }
                }

                function validateFileSize(file) {
                    if (maxSize() && file.size > maxSize()) {
                        file.$errors = file.$errors || [];
                        file.$errors.push('maxSize');
                    }
                }

                scope.$watch(attrs.fileManager, function () {
                    $input.val('');
                });

                $input.on('change', function () {
                    var file = $input[0].files[0];

                    file.$errors = null;

                    validateFileType(file);
                    validateFileSize(file);

                    readFile(file, function () {
                        scope.$apply(function () {
                            model.assign(scope, file);
                            onChange(scope);
                        });
                    });
                });

                $element.on('click', function () {
                    $input.trigger('click'); // jQuery required
                });
            }
        };
    }

    angular.module('dyoub.theme').directive('deviceFile', [
        '$parse',
        'Buffer',
        FileManagerDirective
    ]);

})();
