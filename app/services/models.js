/**
 * Module containing factory methods for all models.
 * Category <>---> * Task <>---> * Slot
 */
(function (angular) {
    'use strict';

    var module = angular.module('BobModels', ['xc.indexedDB', 'utils'])

    module.service('models', function ($q, $indexedDB, uuid4) {

        /**
         * Kind of abstract class for concrete models below with methods to save
         * and load to/from IndexedDB.
         * @constructor do not instantiate this abstract class
         */
        var AbstractModel = function () {
            this.save = function () {
                return $indexedDB.objectStore(this.objectStore).insert(this);
            };
            /**
             * Mode 1: single param = id
             * Mode 2: 1st param = index_name
             *         2nd param = value
             */
            this.find = function () {
                var deferred = $q.defer();
                $indexedDB.objectStore(this.objectStore)
                    .find(arguments[0], arguments.length > 1 ? arguments[1] : undefined)
                    .then(function (found) {
                        if (angular.isDefined(found)) {
                            deferred.resolve(new this.constructor(found));
                        } else {
                            deferred.reject('not found');
                        }
                    }.bind(this));
                return deferred.promise;
            };
            // helpers
            this.findOrCreate = function (title) {
                var deferred = $q.defer();
                this.find('title_idx', title)
                    .then(function (object) {
                        deferred.resolve(object);
                    }, function () {
                        var newObject = new this.constructor({title: title});
                        newObject.save().then(function () {
                            deferred.resolve(newObject);
                        });
                    }.bind(this)
                );
                return deferred.promise;
            }
        }

        /**
         * Category model.
         * @param data object containing instance values.
         * @constructor
         */
        function Category(data) {
            this.id = uuid4();
            this.title = null;
            this.description = null;
            this.tasks = [
                // ids of tasks
            ];
            angular.extend(this, data);
        }

        Category.prototype = new AbstractModel();
        Category.prototype.constructor = Category;
        Category.prototype.objectStore = 'categories';

        /**
         * Task model.
         * @param data object containing instance values.
         * @constructor
         */
        function Task(data) {
            this.id = uuid4();
            this.title = null;
            this.description = null;
            this.url = null;
            this.slots = [
                //  {start: Date, end: Date],
                //  {start: Date, end: Date]
            ];
            this.category = null; // id of category or null
            angular.extend(this, data);
        }

        Task.prototype = new AbstractModel();
        Task.prototype.constructor = Task;
        Task.prototype.objectStore = 'tasks';

        // expose concrete models
        return {
            'Category': Category,
            'Task': Task
        }
    });

})(window.angular);