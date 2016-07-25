angular.module('app.controllers')
    .controller('clientRemoveController',[
        '$scope',
        '$location',
        '$routeParams',
        'Client',
        function(
            $scope,
            $location,
            $routeParams,
            Client
        ){
            $scope.client =  Client.get({id: $routeParams.id});

            $scope.remove = function(){
                $scope.client.$delete().then(function(){
                    $location.path('/clients');
                });
            };
        }
    ])