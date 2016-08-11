angular.module('app.controllers')
    .controller('projectFileEditController',[
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
            $scope.projectFile = ProjectFile.get({projectId: $routeParams.projectId, id: $routeParams.id});

            $scope.save = function(){
                if($scope.form.$valid){
                    ProjectFile.update({projectId: $scope.projectFile.project_id, id: $scope.projectFile.id}, $scope.projectFile, function(){
                        $location.path('/projects/'+$routeParams.projectId+'/files');
                    });
                }
            };
        }
    ]);