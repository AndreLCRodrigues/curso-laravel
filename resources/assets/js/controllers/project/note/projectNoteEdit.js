angular.module('app.controllers')
    .controller('projectNoteEditController',[
        '$scope',
        '$location',
        '$routeParams',
        'ProjectNote',
        function(
            $scope,
            $location,
            $routeParams,
            ProjectNote
        ){
            $scope.projectNote = ProjectNote.get({projectId: $routeParams.projectId, id: $routeParams.id});

            $scope.save = function(){
                if($scope.form.$valid){
                    ProjectNote.update({projectId: $scope.projectNote.project_id, id: $scope.projectNote.id}, $scope.projectNote, function(){
                        $location.path('/projects/'+$routeParams.projectId+'/notes');
                    });
                }
            };
        }
    ]);