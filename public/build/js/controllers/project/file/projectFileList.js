angular.module('app.controllers')
    .controller('projectFileListController',['$scope', '$routeParams','ProjectFile',function($scope, $routeParams, ProjectFile){
        $scope.projectId = $routeParams.projectId;
        $scope.projectFiles = ProjectFile.query({projectId: $scope.projectId});
    }]);