angular.module('app.controllers')
    .controller('projectTaskRemoveController',[
        '$scope',
        '$location',
        '$routeParams',
        'ProjectTask',
        function(
            $scope,
            $location,
            $routeParams,
            ProjectTask
        ){
            $scope.projectTask =  ProjectTask.get({projectId: $routeParams.projectId, id: $routeParams.id});

            $scope.remove = function(){
                $scope.projectTask.$delete({projectId: $scope.projectTask.project_id, id: $scope.projectTask.id}).then(function(){
                    $location.path('/projects/'+$routeParams.projectId+'/tasks');
                });
            };
        }
    ]);