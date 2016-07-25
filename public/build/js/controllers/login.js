angular.module('app.controllers')
    .controller('loginController',['$scope','$location', 'OAuth',function($scope, $location, OAuth){
        $scope.user = {
            username: '',
            password: ''
        };

        $scope.error = {
            message: '',
            error: false
        }

        $scope.login = function(){
            OAuth.getAccessToken($scope.user).then(function(){
                $location.path('home');
            },function(response){
                $scope.error.error = true;
                $scope.error.message = response.data.error_description;
            })
        };
    }])