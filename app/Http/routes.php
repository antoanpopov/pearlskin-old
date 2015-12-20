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


//Route::get('admin/dashboard', 'Admin\Api\DashboardController@index');
//Route::get('admin/clients', 'Admin\DashboardController@index');
//Route::get('admin/procedures', 'Admin\DashboardController@index');
//Route::get('admin/doctors', 'Admin\DashboardController@index');
//Route::get('admin/manipulations', 'Admin\DashboardController@index');
//Route::get('admin/references', 'Admin\DashboardController@index');
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
 */
Route::group(['prefix' => 'api'], function()
{

    Route::resource('authenticate', 'Admin\AuthenticateController', ['only' => ['index']]);
    Route::post('authenticate', 'Admin\AuthenticateController@authenticate');
    Route::get('authenticate/user', 'Admin\AuthenticateController@getAuthenticatedUser');


    Route::group(['middleware' => ['jwt.auth'], 'namespace' => 'API'], function() {

        Route::post('languages/', 'LanguagesController@create');
        Route::get('languages/{id?}', 'LanguagesController@read');
        Route::put('languages/{id}', 'LanguagesController@update');
        Route::delete('languages/{id}', 'LanguagesController@delete');


        Route::post('manipulations/', 'ManipulationsController@create');
        Route::get('manipulations/{id?}', 'ManipulationsController@read');
        Route::put('manipulations/{id}', 'ManipulationsController@update');
        Route::delete('manipulations/{id}', 'ManipulationsController@delete');

        Route::resource('clients', 'ClientsController');

        Route::resource('doctors', 'DoctorsController',['except' => [ 'update' ]]);
        Route::post('doctors/{id}', 'DoctorsController@update');

        Route::resource('procedures', 'ProceduresController');
        Route::post('procedures/{id}', 'ProceduresController@update');

        Route::resource('promotionalservices', 'PromotionalServicesController');

        Route::resource('schedule', 'ScheduleController');

        Route::resource('news', 'NewsController',['except' => [ 'update' ]]);
        Route::post('news/{id}', 'NewsController@update');

        Route::resource('contacts', 'ContactsController');
        Route::resource('equipments', 'EquipmentsController');
        Route::resource('videos', 'VideosController');


    });

});

Route::group(['prefix' => 'admin'], function()
{
    Route::get('', 'Admin\LayoutController@index');
    Route::any('/{path?}', function()
    {
        return response()->view('admin/content');
    })->where("path", ".+");

});

Route::group(['as' => 'admin::', 'namespace' => 'Client'], function () {
    Route::get('', 'LayoutController@index');
    Route::any('/{path?}', function()
    {
        return response()->view('client/layout');
    })->where("path", ".+");
});

