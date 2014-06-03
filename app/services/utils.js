/**
 * Module providing all those simple helper functions.
 */

(function (angular) {
    'use strict';

    var utils = angular.module('utils', []);

    /**
     * UUID4 from http://stackoverflow.com/a/2117523
     */
    utils.service('uuid4', function () {
        return function() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
    });

})(window.angular);

