<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('app');
});

Route::post('oauth/access_token', function() {
    return Response::json(Authorizer::issueAccessToken());
});

Route::group(['middleware'=>'oauth'], function () {
    Route::resource('clients', 'ClientController', ['except' => ['create', 'edit']]);

    Route::resource('projects', 'ProjectController', ['except' => ['create', 'edit']]);

    Route::resource('projects.members', 'ProjectMemberController', ['except' => ['create', 'edit', 'update']]);

    Route::group(['middleware'=>'check-project-permission', 'prefix'=>'projects'], function () {
        Route::get('{projectId}/notes', 'ProjectNoteController@index');
        Route::get('{projectId}/notes/{id}', 'ProjectNoteController@show');
        Route::post('{projectId}/notes', 'ProjectNoteController@store');
        Route::put('{projectId}/notes/{id}', 'ProjectNoteController@update');
        Route::delete('{projectId}/notes/{id}', 'ProjectNoteController@destroy');

        Route::get('{projectId}/tasks', 'ProjectTaskController@index');
        Route::get('{projectId}/tasks/{id}', 'ProjectTaskController@show');
        Route::post('{projectId}/tasks', 'ProjectTaskController@store');
        Route::put('{projectId}/tasks/{id}', 'ProjectTaskController@update');
        Route::delete('{projectId}/tasks/{id}', 'ProjectTaskController@destroy');

        Route::get('{projectId}/files', 'ProjectFileController@index');
        Route::get('{projectId}/files/{id}', 'ProjectFileController@show');
        Route::get('{projectId}/files/{id}/download', 'ProjectFileController@showFile');
        Route::post('{projectId}/files', 'ProjectFileController@store');
        Route::put('{projectId}/files/{id}', 'ProjectFileController@update');
        Route::delete('{projectId}/files/{id}', 'ProjectFileController@destroy');
    });

    Route::get('users/authenticated', 'UserController@authenticated');
    Route::resource('users', 'UserController', ['except' => ['create', 'edit']]);

});