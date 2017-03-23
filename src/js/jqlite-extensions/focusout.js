// Copyright (c) Dyoub Applications. All rights reserved.
// Licensed under MIT (https://github.com/dyoub/app/blob/master/LICENSE).

(function (JQLite) {

    JQLite.prototype.onFocusOut = function (callback) {
        var $element = this,
            $document = JQLite(document);

        function focusout(e) {
            if (!$(e.target).closest($element).length) {
                if (typeof callback === 'function') {
                    callback();
                }
            }
        }

        $document.on('click', focusout);
        $document.find('input').on('focus', focusout);
        $document.find('select').on('focus', focusout);
        $document.find('textarea').on('focus', focusout)
        $document.find('button').on('focus', focusout);
        $document.find('a').on('focus', focusout);

        return $element;
    };

})(angular.element);
