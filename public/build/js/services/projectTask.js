angular.module('app.services')
    .service('ProjectTask',[
        '$resource',
        '$filter',
        '$httpParamSerializer',
        'appConfig',
        function(
            $resource,
            $filter,
            $httpParamSerializer,
            appConfig
        ){
            function transformData(data, headers){
                if(angular.isObject(data)){
                    if(data.hasOwnProperty('start_date')){
                        var o = angular.copy(data);
                        o.start_date = $filter('date')(data.start_date,'yyyy-MM-dd');
                    }
                    if(data.hasOwnProperty('due_date')){
                        var o = angular.copy(data);
                        o.due_date = $filter('date')(data.due_date,'yyyy-MM-dd');
                    }
                    return appConfig.utils.transformRequest(o);
                }
                return data;
            }

            return $resource(appConfig.baseUrl + '/projects/:projectId/tasks/:id', {projectId: '@projectId', id: '@id'},{
                save: {
                    method: 'POST',
                    transformRequest: transformData
                },
                get: {
                    method: 'GET',
                    transformResponse: function (data, headers) {
                        var o = appConfig.utils.transformResponse(data, headers);
                        if(angular.isObject(o) && o.hasOwnProperty('start_date') && o.start_date){
                            var arrayDate = o.start_date.split('-');

                            o.start_date = new Date(arrayDate[0],parseInt(arrayDate[1])-1,arrayDate[2]);
                        }
                        if(angular.isObject(o) && o.hasOwnProperty('due_date') && o.due_date){
                            var arrayDate = o.due_date.split('-');

                            o.due_date = new Date(arrayDate[0],parseInt(arrayDate[1])-1,arrayDate[2]);
                        }
                        return o;
                    }
                },
                update: {
                    method: 'PUT',
                    transformRequest: transformData
                }
            })
        }]);