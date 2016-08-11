angular.module('app.controllers')
    .controller('projectListController',['$scope', '$routeParams', 'appConfig','Project',function($scope, $routeParams, appConfig, Project){
        $scope.projects = [];

        $scope.pagination = {
            total: 0,
            limit: appConfig.limit,
            current: 1
        };

        $scope.pageChanged = function(newPage) {
            getResultsPage(newPage);
        };

        function getResultsPage(page) {
            Project.query({page: page, limit: $scope.pagination.limit}, function(data){
                $scope.projects = data.data;
                $scope.pagination.total = data.meta.pagination.total;
            });
        }

        getResultsPage(1);
    }]);