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

    Route::group(['middleware' => ['jwt.auth']], function() {

        Route::post('languages/', 'API\LanguagesController@create');
        Route::get('languages/{id?}', 'API\LanguagesController@read');
        Route::put('languages/{id}', 'API\LanguagesController@update');
        Route::delete('languages/{id}', 'API\LanguagesController@delete');

        Route::post('clients/', 'API\ClientsController@create');
        Route::get('clients/{id?}', 'API\ClientsController@read');
        Route::put('clients/{id}', 'API\ClientsController@update');
        Route::delete('clients/{id}', 'API\ClientsController@delete');

        Route::post('procedures/', 'API\ProceduresController@create');
        Route::get('procedures/{id?}', 'API\ProceduresController@read');
        Route::post('procedures/{id}', 'API\ProceduresController@update');
        Route::delete('procedures/{id}', 'API\ProceduresController@delete');

        Route::post('doctors/', 'API\DoctorsController@create');
        Route::get('doctors/{id?}', 'API\DoctorsController@read');
        Route::post('doctors/{id}', 'API\DoctorsController@update');
        Route::delete('doctors/{id}', 'API\DoctorsController@delete');

        Route::post('manipulations/', 'API\ManipulationsController@create');
        Route::get('manipulations/{id?}', 'API\ManipulationsController@read');
        Route::put('manipulations/{id}', 'API\ManipulationsController@update');
        Route::delete('manipulations/{id}', 'API\ManipulationsController@delete');

        Route::post('promotionalservices/', 'API\PromotionalServicesController@create');
        Route::get('promotionalservices/{id?}', 'API\PromotionalServicesController@read');
        Route::post('promotionalservices/{id}', 'API\PromotionalServicesController@update');
        Route::delete('promotionalservices/{id}', 'API\PromotionalServicesController@delete');

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

