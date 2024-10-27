<?php

use App\Applications\Navigation\Controllers\NavigationController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| This file contains the API routes for the Navigation module
|
|
*/

// AUTHORIZED ROUTES
Route::group([
    'middleware' => 'auth:sanctum'
], function () {
    Route::group([
        'prefix' => 'navigation',
    ], function () {
        Route::get('all', [NavigationController::class, 'getAll']);
        Route::get('{id}', [NavigationController::class, 'get']);
        Route::post('create', [NavigationController::class, 'create']);
        Route::patch('{id}', [NavigationController::class, 'update']);
        Route::delete('{id}', [NavigationController::class, 'delete']);
    });
});
