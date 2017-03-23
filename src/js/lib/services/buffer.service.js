// Copyright (c) Dyoub Applications. All rights reserved.
// Licensed under MIT (https://github.com/dyoub/app/blob/master/LICENSE).

(function () {

    function BufferService($sce) {
        this.$sce = $sce;
    }

    BufferService.prototype.blob = function (buffer, type) {
        type = type || 'application/octet-stream';

        var blob;

        try {
            blob = new Blob([buffer], { type: type });
        } catch (e) {
            var bb = new (window.WebKitBlobBuilder || window.MozBlobBuilder);
            bb.append(buffer);
            blob = bb.getBlob(type);
        }

        return blob;
    };

    /*
     * Example:
     * <img data-ng-src='{{dataURL}}' />
     */
    BufferService.prototype.dataURL = function (buffer, type, onReady) {
        var fileReader = new FileReader();

        fileReader.onload = function (event) {
            (onReady || angular.noop)(event.target.result);
        };

        fileReader.readAsDataURL(this.blob(buffer, type));
    };

    /*
     * Example:
     * <object data='{{object}}' type='application/pdf' style='width: 800px; height: 600px;'></object>
     */
    BufferService.prototype.object = function (buffer, type) {
        return this.$sce.trustAsResourceUrl(this.url(buffer, type));
    };

    BufferService.prototype.url = function (buffer, type) {
        return URL.createObjectURL(this.blob(buffer, type));
    };

    BufferService.prototype.saveToFile = function (buffer, type, filename) {
        var a = document.createElement('a');
        a.href = this.url(buffer, type);
        a.download = filename;
        a.click();
        a.remove();
    };

    angular.module('dyoubTheme').service('Buffer', [
        '$sce',
        BufferService
    ]);

})();
