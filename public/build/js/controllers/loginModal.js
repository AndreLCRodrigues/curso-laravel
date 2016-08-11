angular.module('app.controllers')
    .controller('loginModalController',
        [
            '$rootScope',
            '$scope',
            '$location',
            '$cookies',
            '$modalInstance',
            'OAuth',
            'OAuthToken',
            'authService',
            'User',
            function(
                $rootScope,
                $scope,
                $location,
                $cookies,
                $modalInstance,
                OAuth,
                OAuthToken,
                authService,
                User
            ){
                $scope.user = {
                    username: '',
                    password: ''
                };

                $scope.error = {
                    message: '',
                    error: false
                };

                $scope.$on('event:auth-loginConfirmed', function(){
                    $rootScope.loginModalOpened = false;
                    $modalInstance.close();
                });

                $scope.$on('$routeChangeStart', function(){
                    $rootScope.loginModalOpened = false;
                    $modalInstance.dismiss('cancel');
                })

                $scope.$on('event:auth-loginCancelled', function(){
                    OAuthToken.removeToken();
                })

                $scope.login = function(){
                    OAuth.getAccessToken($scope.user).then(function(){
                        User.authenticated({},{},function(data){
                            $cookies.putObject('user',data);
                            authService.loginConfirmed();
                        });
                    },function(response){
                        $scope.error.error = true;
                        $scope.error.message = response.data.error_description;
                    })
                };

                $scope.cancel = function(){
                    authService.loginCancelled();
                    return $location.path('login');
                };
            }
        ]
    );