angular.module('app.services')
    .service('ProjectMember',['$resource', 'appConfig', function($resource, appConfig){
        return $resource(appConfig.baseUrl + '/projects/:projectId/members/:id', {projectId: '@projectId', id: '@id'},{

        })
    }]);