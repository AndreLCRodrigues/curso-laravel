var app = angular.module('app',[
    'ngRoute','angular-oauth2','angular-filters','app.controllers','app.services', 'app.filters', 'app.directives',
    'ui.bootstrap.typeahead','ui.bootstrap.datepicker', 'ui.bootstrap.tpls', 'ui.bootstrap.modal', 'ui.bootstrap.dropdown',
    'ngFileUpload', 'http-auth-interceptor', 'angularUtils.directives.dirPagination',
    'mgcrea.ngStrap.navbar'
]);

angular.module('app.controllers',['ngMessages','angular-oauth2']);
angular.module('app.filters',[]);
angular.module('app.directives',[]);
angular.module('app.services',['ngResource']);

app.provider('appConfig', ['$httpParamSerializerProvider', function($httpParamSerializerProvider){
    var config = {
        baseUrl: 'http://localhost:8000',
        pagination: {
            limit: 30
        },
        project: {
            status: [
                {value: 1, label: 'Orçamento'},
                {value: 2, label: 'Coleta de dados'},
                {value: 3, label: 'Pronto para iniciar'},
                {value: 4, label: 'Em desenvolvimento'},
                {value: 5, label: 'Em teste'},
                {value: 6, label: 'Concluído'},
                {value: 7, label: 'Descartado'}
            ],
            task: {
                status: [
                    {value: 1, label: 'Incompleta'},
                    {value: 2, label: 'Completa'}
                ]
            }
        },
        urls: {
            projectFile: '/projects/{{projectId}}/files/{{id}}'
        },
        utils: {
            transformRequest: function(data){
                if(angular.isObject(data)){
                    return $httpParamSerializerProvider.$get()(data);
                }
                return data;
            },
            transformResponse: function(data,headers){
                var headersGetter = headers();
                if(headersGetter['content-type'] == 'application/json' || headersGetter['content-type'] == 'text/json'){
                    var dataJson = JSON.parse(data);
                    if(dataJson.hasOwnProperty('data') && Object.keys(dataJson).length == 1){
                        dataJson = dataJson.data;
                    }
                    return dataJson;
                }
                return data;
            }
        }
    };

    return {
        config: config,
        $get: function(){
            return config;
        }
    }
}]);

app.config([
    '$routeProvider',
    '$httpProvider',
    'OAuthProvider',
    'OAuthTokenProvider',
    'appConfigProvider',
    function(
        $routeProvider,
        $httpProvider,
        OAuthProvider,
        OAuthTokenProvider,
        appConfigProvider
    ){
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        $httpProvider.defaults.transformRequest = appConfigProvider.config.utils.transformRequest;
        $httpProvider.defaults.transformResponse = appConfigProvider.config.utils.transformResponse;

        $httpProvider.interceptors.splice(0,1);
        $httpProvider.interceptors.splice(0,1);
        $httpProvider.interceptors.push('oauthFixInterceptor');

        $routeProvider
            .when('/login',{
                templateUrl: 'build/views/login.html',
                controller: 'loginController'
            })
            .when('/logout',{
                resolve: {
                    logout: [
                        '$location',
                        'OAuthToken',
                        function(
                            $location,
                            OAuthToken
                        ) {
                            OAuthToken.removeToken();
                            return $location.path('/login');
                        }
                    ]
                }
            })
            .when('/home',{
                templateUrl: 'build/views/home.html',
                controller: 'homeController'
            })

            // Clientes
            .when('/clients',{
                templateUrl: 'build/views/client/list.html',
                controller: 'clientListController'
            })
            .when('/clients/new',{
                templateUrl: 'build/views/client/new.html',
                controller: 'clientNewController'
            })
            .when('/clients/:id/edit',{
                templateUrl: 'build/views/client/edit.html',
                controller: 'clientEditController'
            })
            .when('/clients/:id/remove',{
                templateUrl: 'build/views/client/remove.html',
                controller: 'clientRemoveController'
            })

            // Projetos
            .when('/projects',{
                templateUrl: 'build/views/project/list.html',
                controller: 'projectListController'
            })
            .when('/projects/new',{
                templateUrl: 'build/views/project/new.html',
                controller: 'projectNewController'
            })
            .when('/projects/:id/edit',{
                templateUrl: 'build/views/project/edit.html',
                controller: 'projectEditController'
            })
            .when('/projects/:id/remove',{
                templateUrl: 'build/views/project/remove.html',
                controller: 'projectRemoveController'
            })

            // Projetos -> Notas
            .when('/projects/:projectId/notes',{
                templateUrl: 'build/views/project/note/list.html',
                controller: 'projectNoteListController'
            })
            .when('/projects/:projectId/notes/:id/show',{
                templateUrl: 'build/views/project/note/show.html',
                controller: 'projectNoteShowController'
            })
            .when('/projects/:projectId/notes/new',{
                templateUrl: 'build/views/project/note/new.html',
                controller: 'projectNoteNewController'
            })
            .when('/projects/:projectId/notes/:id/edit',{
                templateUrl: 'build/views/project/note/edit.html',
                controller: 'projectNoteEditController'
            })
            .when('/projects/:projectId/notes/:id/remove',{
                templateUrl: 'build/views/project/note/remove.html',
                controller: 'projectNoteRemoveController'
            })

            // Projetos -> Tarefas
            .when('/projects/:projectId/tasks',{
                templateUrl: 'build/views/project/task/list.html',
                controller: 'projectTaskListController'
            })
            .when('/projects/:projectId/tasks/new',{
                templateUrl: 'build/views/project/task/new.html',
                controller: 'projectTaskNewController'
            })
            .when('/projects/:projectId/tasks/:id/edit',{
                templateUrl: 'build/views/project/task/edit.html',
                controller: 'projectTaskEditController'
            })
            .when('/projects/:projectId/tasks/:id/remove',{
                templateUrl: 'build/views/project/task/remove.html',
                controller: 'projectTaskRemoveController'
            })

            // Projetos -> Arquivos
            .when('/projects/:projectId/files',{
                templateUrl: 'build/views/project/file/list.html',
                controller: 'projectFileListController'
            })
            .when('/projects/:projectId/files/new',{
                templateUrl: 'build/views/project/file/new.html',
                controller: 'projectFileNewController'
            })
            .when('/projects/:projectId/files/:id/edit',{
                templateUrl: 'build/views/project/file/edit.html',
                controller: 'projectFileEditController'
            })
            .when('/projects/:projectId/files/:id/remove',{
                templateUrl: 'build/views/project/file/remove.html',
                controller: 'projectFileRemoveController'
            })

            // Projetos -> Membros
            .when('/projects/:projectId/members',{
                templateUrl: 'build/views/project/member/list.html',
                controller: 'projectMemberListController'
            })
            .when('/projects/:projectId/members/:id/remove',{
                templateUrl: 'build/views/project/member/remove.html',
                controller: 'projectMemberRemoveController'
            })

        OAuthProvider.configure({
            baseUrl: appConfigProvider.config.baseUrl,
            clientId: 'app',
            clientSecret: 'secret',
            grantPath: 'oauth/access_token'
        });

        OAuthTokenProvider.configure({
            name: 'token',
            options: {
                secure: false
            }
        })
    }
]);

app.run(['$rootScope', '$location', '$http', '$modal', 'httpBuffer', 'OAuth', function($rootScope, $location, $http, $modal, httpBuffer, OAuth) {
    $rootScope.$on('$routeChangeStart',function(event,next,current){
        if(next.$$route.originalPath != '/login'){
            if(!OAuth.isAuthenticated()){
                return $location.path('login');
            }
        }
    });

    $rootScope.$on('oauth:error', function(event, data) {
        // Ignore `invalid_grant` error - should be catched on `LoginController`.
        if ('invalid_grant' === data.rejection.data.error) {
            return;
        }

        // Refresh token when a `invalid_token` error occurs.
        if ('access_denied' === data.rejection.data.error) {
            httpBuffer.append(data.rejection.config, data.deferred);
            if(!$rootScope.loginModalOpened){
                var modalInstance = $modal.open({
                    templateUrl: 'build/views/templates/loginModal.html',
                    controller: 'loginModalController',
                });
                $rootScope.loginModalOpened = true;
                return;
            }
        }

        // Redirect to `/login` with the `error_reason`.
        return $location.path('login');
    });
}]);