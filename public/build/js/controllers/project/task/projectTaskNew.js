angular.module('app.controllers')
    .controller('projectTaskNewController',[
        '$scope',
        '$routeParams',
        '$location',
        'appConfig',
        'ProjectTask',
        function(
            $scope,
            $routeParams,
            $location,
            appConfig,
            ProjectTask
        ){
            $scope.projectTask = new ProjectTask();
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
                    $scope.projectTask.$save({projectId: $routeParams.projectId}).then(function(){
                        $location.path('/projects/'+$routeParams.projectId+'/tasks');
                    });
                }
            };
        }
    ]);