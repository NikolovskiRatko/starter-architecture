<?php

use Illuminate\Http\Request;
use App\Applications\User\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| This file contains the API routes for the User module
|
|
*/

// AUTHORIZED ROUTES
Route::group([
    'middleware' => 'auth:sanctum'
], function () {
    Route::group([
        'prefix' => 'user',
    ], function () {
        // CRUD ROUTES
        Route::get('all', [UserController::class, 'getAll']);
        Route::post('create', [UserController::class, 'create']);
        Route::post('draw', [UserController::class, 'draw']);
        Route::get('roles/get', [UserController::class, 'getUserRoles']);
        Route::get('{id}/get', [UserController::class, 'get']);
        Route::post('{id}/update', [UserController::class, 'update']);
        Route::get('{id}/delete', [UserController::class, 'delete']);

        // Admin profile
        Route::post('edit/myprofile/{id}', [UserController::class, 'updateMyProfile']);
        Route::get('myprofile', [UserController::class, 'getMyProfile']);

    });
});
