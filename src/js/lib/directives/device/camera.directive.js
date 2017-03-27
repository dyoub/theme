// Copyright (c) Dyoub Applications. All rights reserved.
// Licensed under MIT (https://github.com/dyoub/app/blob/master/LICENSE).

(function () {

    navigator.getMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;

    function hasUserMedia() {
        return navigator.getMedia ? true : false;
    };

    function link(scope, $element) {
        scope.camera = scope.camera || {};
        scope.camera.start = start;
        scope.camera.stop = stop;
        scope.camera.takePicture = takePicture;
        scope.camera.isStreaming = false;
        scope.camera.video = null;
        scope.camera.stream = null;

        function start() {
            if (!hasUserMedia()) {
                scope.onerror({ code: -1, message: 'Browser does not support "getUserMedia".' });
                return;
            }

            if (scope.camera.isStreaming) {
                return;
            }

            scope.camera.video = document.createElement('video');
            scope.camera.video.style.cssText = // Flip horizontally
                '-moz-transform: scale(-1, 1); \
                 -webkit-transform: scale(-1, 1); \
                 -o-transform: scale(-1, 1); \
                 transform: scale(-1, 1); \
                 filter: FlipH;';

            $element.append(scope.camera.video);

            var width = $element.width = scope.camera.width || 320,
                height = $element.height = 0,
                mediaConstraint = { video: true, audio: false };

            navigator.getMedia(mediaConstraint, onSuccess, onFailure);

            scope.camera.video.addEventListener('canplay', function () {
                if (!scope.camera.isStreaming) {
                    var scale = width / scope.camera.video.videoWidth;

                    height = (scope.camera.video.videoHeight * scale) || scope.camera.height;

                    scope.camera.video.setAttribute('width', width);
                    scope.camera.video.setAttribute('height', height);

                    scope.$apply(function () {
                        scope.camera.isStreaming = true;
                        scope.onStreaming();
                    });
                }
            }, false);
        };

        function onSuccess(stream) {
            scope.camera.stream = stream;

            if (navigator.mozGetUserMedia) {
                scope.camera.video.mozSrcObject = stream;
            } else {
                var vendorURL = window.URL || window.webkitURL;
                scope.camera.video.src = vendorURL.createObjectURL(stream);
            }

            scope.camera.video.play();
        };

        function stop() {
            if (!!scope.camera.stream) {
                if (scope.camera.stream.getVideoTracks && typeof scope.camera.stream.getVideoTracks === 'function') {
                    var tracks = scope.camera.stream.getVideoTracks();

                    if (tracks && tracks[0] && tracks[0].stop) {
                        tracks[0].stop();
                    }
                } else if (scope.camera.stream.stop) {
                    // Deprecated, may be removed in the near future
                    scope.camera.stream.stop();
                }
            }

            if (!!scope.camera.video) {
                delete scope.camera.video.src;
            }

            scope.camera.video.remove();
            scope.camera.video = null;
            scope.camera.stream = null;
            scope.camera.isStreaming = false;
        };

        function onFailure(err) {
            scope.$apply(scope.onerror);
        };

        function takePicture() {
            if (!scope.camera.video) return;

            var canvas = document.createElement('canvas');
            canvas.width = scope.camera.video.width;
            canvas.height = scope.camera.video.height;

            var context = canvas.getContext('2d');
            context.translate(scope.camera.video.width, 0); // 'translate' and 'scale' to flip horizontally
            context.scale(-1, 1);
            context.drawImage(scope.camera.video, 0, 0, scope.camera.video.width, scope.camera.video.height);

            var dataURL = canvas.toDataURL(),
                blob = dataURLtoBlob(dataURL);

            blob.dataURL = dataURL;

            return blob;
        }

        function dataURLtoBlob(dataURL) {
            var byteString;

            if (dataURL.split(',')[0].indexOf('base64') >= 0) {
                byteString = atob(dataURL.split(',')[1]);
            } else {
                byteString = unescape(dataURL.split(',')[1]);
            }

            var mimeType = dataURL.split(',')[0].split(':')[1].split(';')[0],
                ia = new Uint8Array(byteString.length);

            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }

            return new Blob([ia], { type: mimeType });
        }
    }

    function CameraDirective() {
        return {
            restrict: 'A',
            scope:
            {
                camera: '=',
                onerror: '&',
                onStreaming: '&'
            },
            link: link
        };
    }

    angular.module('dyoub.theme').directive('deviceCamera', [
        CameraDirective
    ]);

})();
