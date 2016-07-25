angular.module('app.controllers')
    .controller('clientListController',['$scope','Client',function($scope, Client){
        $scope.clients = Client.query();
    }])