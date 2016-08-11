angular.module('app.controllers')
    .controller('projectMemberRemoveController',[
        '$scope',
        '$location',
        '$routeParams',
        'ProjectMember',
        function(
            $scope,
            $location,
            $routeParams,
            ProjectMember
        ){
            $scope.projectMember =  ProjectMember.get({projectId: $routeParams.projectId, id: $routeParams.id});

            $scope.remove = function(){
                $scope.projectMember.$delete({projectId: $scope.projectMember.project_id, id: $scope.projectMember.id}).then(function(){
                    $location.path('/projects/'+$routeParams.projectId+'/members');
                });
            };
        }
    ]);