angular.module('app.services')
    .service('ProjectNote',['$resource', 'appConfig', function($resource, appConfig){
        return $resource(appConfig.baseUrl + '/projects/:projectId/notes/:id', {projectId: '@projectId', id: '@id'},{
            update: {
                method: 'PUT'
            }
        })
    }]);