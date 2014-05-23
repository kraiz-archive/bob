'use strict';

var bob = angular.module('bob', ['ngRoute', 'ui.bootstrap', 'i18n']);

bob.config(function ($routeProvider) {
    $routeProvider
        .when('/', { templateUrl: 'partials/new_task.html', controller: 'NewTaskController'}, {});
});

bob.controller('MainCtrl', function ($scope, trans) {
    $scope.test = trans('appName');
});

bob.controller('NewTaskController', function ($scope) {
    $scope.test = 1337;
});