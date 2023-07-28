<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// NON AUTHORIZED ROUTES
Route::group([
    'middleware' => 'api',
    'prefix' => 'guest',
], function () {
    Route::get('/test', function (Request $request) {
        return "OPEN";
    });
//    Route::post('/tokens/create', [AuthenticatedSessionController::class,'createUserToken']);
//    Route::post('/login', [AuthenticatedSessionController::class,'login']);
//    Route::post('register', [RegisteredUserController::class, 'register']);
//    Route::post('/sanctum/token', [AuthenticatedSessionController::class,'getToken']);
//    Route::post('activate', 'Controllers\UserController@userActivate');
//    Route::post('draw', 'Controllers\UserController@drawUserGuest');
////    Route::get('{id}/get', 'Controllers\UserController@getUserGuest');// TODO this route should probably not be available unless you are logged in
////    Route::post('new', 'Controllers\UserController@storeUserGuest');
////    Route::get('myprofile', 'Controllers\UserController@getMyProfile');// TODO Same issue as above
////    Route::post('myprofile/{id}', 'Controllers\UserController@updateMyProfile');// TODO Same issue as above
////    Route::post('avatar', 'Controllers\UserController@updateMyAvatar');
});

// AUTHORIZED ROUTES
Route::group([
    'middleware' => ['auth:sanctum'],
    'prefix' => 'api'
], function (){
    Route::get('/test', function (Request $request) {
        return "CLOSED";
    });
//    Route::post('/logout', [AuthenticatedSessionController::class ,'logout']); //TODO: Try to move these inside the auth.php route file, test if the api middleware somehow causes problems
//    Route::get('/test',[AuthenticatedSessionController::class ,'test']);
//    Route::get('/user',[AuthenticatedSessionController::class ,'user']);
});
