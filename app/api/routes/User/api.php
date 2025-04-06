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
        Route::get('all', [UserController::class, 'getAll']);
        Route::get('draw', [UserController::class, 'draw']);
        Route::get('permissions-roles', [UserController::class, 'getUserPermissionsRoles']);

        // Admin profile
        Route::patch('myprofile/{id}', [UserController::class, 'updateMyProfile']);
        Route::get('myprofile', [UserController::class, 'getMyProfile']);

        // CRUD ROUTES
        Route::post('create', [UserController::class, 'create']);
        Route::get('{id}', [UserController::class, 'get']);
        Route::patch('{id}', [UserController::class, 'update']);
        Route::delete('{id}', [UserController::class, 'delete']);

        // User avatars
        Route::post('avatar/{id}', [UserController::class, 'uploadAvatar']);
    });
});
