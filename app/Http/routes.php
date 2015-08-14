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

Route::get('', 'Admin\DashboardController@index');
Route::get('admin/dashboard', 'Admin\DashboardController@index');
Route::get('admin/clients', 'Admin\DashboardController@index');
Route::get('admin/procedures', 'Admin\DashboardController@index');
Route::get('admin/doctors', 'Admin\DashboardController@index');
Route::get('admin/manipulations', 'Admin\DashboardController@index');
Route::get('admin/references', 'Admin\DashboardController@index');
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
Route::post('api/clients/create', 'Admin\API\ClientsController@create');
Route::get('api/clients/{id?}', 'Admin\API\ClientsController@read');
Route::put('api/clients/{id}', 'Admin\API\ClientsController@update');
Route::delete('api/clients/{id}', 'Admin\API\ClientsController@delete');

Route::post('api/procedures/', 'Admin\API\ProceduresController@create');
Route::get('api/procedures/{id?}', 'Admin\API\ProceduresController@read');
Route::put('api/procedures/{id}', 'Admin\API\ProceduresController@update');
Route::delete('api/procedures/{id}', 'Admin\API\ProceduresController@delete');

Route::post('api/doctors/', 'Admin\API\DoctorsController@create');
Route::get('api/doctors/{id?}', 'Admin\API\DoctorsController@read');
Route::put('api/doctors/{id}', 'Admin\API\DoctorsController@update');
Route::delete('api/doctors/{id}', 'Admin\API\DoctorsController@delete');

Route::post('api/doctors/', 'Admin\API\DoctorsController@create');
Route::get('api/doctors/{id?}', 'Admin\API\DoctorsController@read');
Route::put('api/doctors/{id}', 'Admin\API\DoctorsController@update');
Route::delete('api/doctors/{id}', 'Admin\API\DoctorsController@delete');

Route::post('api/manipulations/', 'Admin\API\ManipulationsController@create');
Route::get('api/manipulations/{id?}', 'Admin\API\ManipulationsController@read');
Route::put('api/manipulations/{id}', 'Admin\API\ManipulationsController@update');
Route::delete('api/manipulations/{id}', 'Admin\API\ManipulationsController@delete');

Route::controllers([
	'auth' => 'Auth\AuthController',
	'password' => 'Auth\PasswordController',
]);
Route::any('{path?}', function()
{
    return response()->view('admin\content');
})->where("path", ".+");