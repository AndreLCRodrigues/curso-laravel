angular.module('app.controllers')
    .controller('projectNoteListController',['$scope', '$routeParams','ProjectNote',function($scope, $routeParams, ProjectNote){
        $scope.projectId = $routeParams.projectId;
        $scope.projectNotes = ProjectNote.query({projectId: $scope.projectId});
    }]);