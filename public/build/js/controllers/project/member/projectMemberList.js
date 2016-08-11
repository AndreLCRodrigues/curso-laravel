angular.module('app.controllers')
    .controller('projectMemberListController',[
        '$scope',
        '$routeParams',
        'appConfig',
        'User',
        'ProjectMember',
        function(
            $scope,
            $routeParams,
            appConfig,
            User,
            ProjectMember
        ){
            $scope.projectMember = new ProjectMember();
            $scope.projectId = $routeParams.projectId;

            //==========================

            $scope.save = function(){
                if($scope.form.$valid){
                    $scope.projectMember.$save({projectId: $scope.projectId}).then(function(){
                        $scope.projectMember = new ProjectMember();
                        $scope.loadMember();
                    })
                }
            }

            $scope.formatName = function(model){
                if(model){
                    return model.name;
                }
                return '';
            };

            $scope.getUsers = function(name){
                return User.query({
                    search: name,
                    searchFields: 'name:like'
                }).$promise;
            };

            $scope.selectUser = function(item){
                $scope.projectMember.member_id = item.id;
            };

            $scope.loadMember = function(){
                $scope.projectMembers = ProjectMember.query({
                    projectId: $scope.projectId,
                    orderBy: 'id',
                    sortedBy: 'desc'
                })
            };

            $scope.loadMember();
        }]
    );