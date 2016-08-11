angular.module('app.controllers')
    .controller('projectFileNewController',[
        '$scope',
        '$routeParams',
        '$location',
        'appConfig',
        'ProjectFile',
        'Url',
        'Upload',
        function(
            $scope,
            $routeParams,
            $location,
            appConfig,
            ProjectFile,
            Url,
            Upload
        ){
            $scope.projectFile = new ProjectFile();
            $scope.projectFile.project_id = $routeParams.projectId;

            $scope.save = function(){
                if($scope.form.$valid){
                    var url = appConfig.baseUrl +
                    Url.getUrlFromUrlSymbol(appConfig.urls.projectFile,{
                        projectId: $routeParams.projectId,
                        id: ''
                    });
                    Upload.upload({
                        url: url,
                        fields: {
                            name: $scope.projectFile.name,
                            description: $scope.projectFile.description
                        },
                        file: $scope.projectFile.file,
                    }).then(function (resp) {
                        console.log('Success ' + resp.config.file.name + 'uploaded. Response: ' + resp.data);
                        $location.path('/projects/'+$routeParams.projectId+'/files');
                    }, function (resp) {
                        console.log('Error status: ' + resp.status);
                    }, function (evt) {
                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                    });
                }
            };
        }
    ]);