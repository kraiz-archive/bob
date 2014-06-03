'use strict';

var bob = angular.module('bob', ['ngRoute', 'ui.bootstrap', 'xc.indexedDB',
    'BobModels', 'i18n']);

bob.config(function ($routeProvider) {
    $routeProvider
        .when('/current', { templateUrl: 'partials/new-task.html', controller: 'NewTaskController'}, {})
        .otherwise({ redirectTo: '/current' });
});

bob.config(function ($indexedDBProvider) {
    // configure database name, version number and define migration plan
    $indexedDBProvider
        .connection('BobDB')
        .upgradeDatabase(1, function (event, db, tx) {
            for (var migrationStep = event.oldVersion + 1; migrationStep <= event.newVersion; migrationStep++) {
                switch (migrationStep) {
                    case 1:
                        var objStore = db.createObjectStore('categories', {keyPath: 'id'});
                        objStore.createIndex('title_idx', 'title', {unique: true});
                        objStore.createIndex('tasks_idx', 'tasks', {unique: false, multiEntry: true});

                        var objStore = db.createObjectStore('tasks', {keyPath: 'id'});
                        objStore.createIndex('title_idx', 'title', {unique: true});
                        objStore.createIndex('category_idx', 'category', {unique: false});
                        break;
                }
            }
        });
});

bob.controller('MainCtrl', function ($scope, $location, models) {
    $scope.isActive = function (route) {
        return route === $location.path();
    }

    models.Category.prototype.find('title_idx', 'testcat45').then(function(category) {
        $scope.category = category;
    });


});
