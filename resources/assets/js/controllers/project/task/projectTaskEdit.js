angular.module('app.controllers')
    .controller('projectTaskEditController',[
        '$scope',
        '$location',
        '$routeParams',
        'appConfig',
        'ProjectTask',
        function(
            $scope,
            $location,
            $routeParams,
            appConfig,
            ProjectTask
        ){
            $scope.projectTask = ProjectTask.get({projectId: $routeParams.projectId, id: $routeParams.id});
            $scope.projectTask.project_id = $routeParams.projectId;
            $scope.status = appConfig.project.task.status;

            $scope.start_date = {
                open: function($event){
                    $scope.start_date.opened = true;
                },
                opened: false
            };

            $scope.due_date = {
                open: function($event){
                    $scope.due_date.opened = true;
                },
                opened: false
            };

            $scope.save = function(){
                if($scope.form.$valid){
                    ProjectTask.update({projectId: $scope.projectTask.project_id, id: $scope.projectTask.id}, $scope.projectTask, function(){
                        $location.path('/projects/'+$routeParams.projectId+'/tasks');
                    });
                }
            };
        }
    ]);