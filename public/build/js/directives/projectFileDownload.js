angular.module('app.directives')
    .directive('projectFileDownload',
        [
            '$timeout',
            'appConfig',
            'ProjectFile',
            function($timeout, appConfig, ProjectFile){
                return {
                    restrict: 'E',
                    templateUrl: appConfig.baseUrl + '/build/views/templates/projectFileDownload.html',
                    link: function(scope, element, attr){
                        scope.$on('salvar-arquivo', function(event, data){
                            var anchor = element.children()[0];
                            $(anchor).removeClass('disabled')
                            $('i', anchor).removeClass('fa-spinner');

                            /*$(anchor).attr({
                             href: 'data:application-octet-stream;base64,'+data.file,
                             download: data.name
                             });*/

                            $timeout(function(){
                                var link = document.createElement("a");
                                link.download = data.name;
                                link.href = 'data:application-octet-stream;base64,'+data.file;
                                link.click();
                            });
                        });
                    },
                    controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs){
                        $scope.downloadFile = function(){
                            var anchor = $element.children()[0];
                            $(anchor).addClass('disabled')
                            $('i', anchor).addClass('fa-spinner');

                            ProjectFile.download({id: $attrs.idProject, idFile: $attrs.idFile},function(data){
                                $scope.$emit('salvar-arquivo',data);
                            });
                        };
                    }]
                }
            }
        ]
    );