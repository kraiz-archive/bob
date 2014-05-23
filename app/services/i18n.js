/**
 * Module providing a service, a filter and a directive to bridge localization from angular to chrome i18n mechanism.
 */

(function (chrome, angular) {
    'use strict';

    var trans = function () {
        return chrome.i18n.getMessage(
            arguments[0],
            arguments.length > 1 ? arguments.slice(1, arguments.length) : undefined
        );
    }

    angular.module('i18n', [])
        .factory('trans', function () {
            return trans;
        })

        .filter('trans', function () {
            return trans;
        })

        .directive('trans', function () {
            return {
                restrict: 'E',
                scope: {
                    key: '@'
                },
                link: function ($scope, $element, $attributes, controller) {
                    $element.val(trans($attributes.key));
                }
            }
        });

})(chrome, window.angular);