angular.module('app.controllers')
    .controller('projectTaskListController',['$scope', '$routeParams', 'appConfig','ProjectTask',function($scope, $routeParams, appConfig, ProjectTask){
        $scope.projectTask = new ProjectTask();
        $scope.projectId = $routeParams.projectId;

        //==========================

        $scope.save = function(){
            if($scope.form.$valid){
                $scope.projectTask.status = appConfig.project.task.status[0].value;
                $scope.projectTask.$save({projectId: $scope.projectId}).then(function(){
                    $scope.projectTask = new ProjectTask();
                    $scope.loadTask();
                })
            }
        }

        $scope.loadTask = function(){
            $scope.projectTasks = ProjectTask.query({
                projectId: $scope.projectId,
                orderBy: 'id',
                sortedBy: 'desc'
            })
        };

        $scope.loadTask();
    }]);