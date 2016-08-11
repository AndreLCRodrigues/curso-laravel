angular.module('app.services')
    .service('User',['$resource', 'appConfig', function($resource, appConfig){
        return $resource(appConfig.baseUrl + '/users', {},{
            authenticated: {
                url: appConfig.baseUrl + '/users/authenticated',
                method: 'GET'
            }
        })
    }]);