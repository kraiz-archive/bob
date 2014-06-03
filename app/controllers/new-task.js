
bob.controller('NewTaskController', function ($scope, models) {
    $scope.submit = function() {
        models.Task.prototype.findOrCreate($scope.newTask.title).then(function(task) {
            console.log(task);
        });
    };
});