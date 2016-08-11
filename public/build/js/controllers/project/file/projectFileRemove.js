angular.module('app.controllers')
    .controller('projectFileRemoveController',[
        '$scope',
        '$location',
        '$routeParams',
        'ProjectFile',
        function(
            $scope,
            $location,
            $routeParams,
            ProjectFile
        ){
            $scope.projectFile =  ProjectFile.get({projectId: $routeParams.projectId, id: $routeParams.id});

            $scope.remove = function(){
                $scope.projectFile.$delete({projectId: $scope.projectFile.project_id, id: $scope.projectFile.id}).then(function(){
                    $location.path('/projects/'+$routeParams.projectId+'/files');
                });
            };
        }
    ]);