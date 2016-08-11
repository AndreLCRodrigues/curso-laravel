angular.module('app.controllers')
    .controller('loginController',
        [
            '$scope',
            '$location',
            '$cookies',
            'OAuth',
            'User',
            function(
                $scope,
                $location,
                $cookies,
                OAuth,
                User
            ){
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
                        User.authenticated({},{},function(data){
                            $cookies.putObject('user',data);
                            $location.path('home');
                        });
                    },function(response){
                        $scope.error.error = true;
                        $scope.error.message = response.data.error_description;
                    })
                };
            }
        ]
    );