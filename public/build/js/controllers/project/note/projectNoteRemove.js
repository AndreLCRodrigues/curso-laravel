angular.module('app.controllers')
    .controller('projectNoteRemoveController',[
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
            $scope.projectNote =  ProjectNote.get({projectId: $routeParams.projectId, id: $routeParams.id});

            $scope.remove = function(){
                $scope.projectNote.$delete({projectId: $scope.projectNote.project_id, id: $scope.projectNote.id}).then(function(){
                    $location.path('/projects/'+$routeParams.projectId+'/notes');
                });
            };
        }
    ]);