<?php

use App\Applications\Navigation\Controllers\NavigationController;
use App\Applications\Navigation\Controllers\NavigationMenuController;
use App\Applications\Navigation\Controllers\NavigationMenuItemController;
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
    Route::prefix('navigations')->group(function () {
        Route::get('/', [NavigationController::class, 'index']);
        Route::get('{navigation}', [NavigationController::class, 'show']);
        Route::post('/', [NavigationController::class, 'store']);
        Route::patch('{navigation}', [NavigationController::class, 'update']);
        Route::delete('{navigation}', [NavigationController::class, 'destroy']);

        // Extra actions (keep using ID or refactor if needed)
        Route::patch('{navigation}/attach', [NavigationController::class, 'attach']);
        Route::patch('{navigation}/detach', [NavigationController::class, 'detach']);
        Route::get('{navigation}/ancestors', [NavigationController::class, 'ancestors']);
        Route::get('{navigation}/descendants', [NavigationController::class, 'descendants']);
    });

    Route::group([
        'prefix' => 'navigation-menu',
    ], function () {
        Route::get('all', [NavigationMenuController::class, 'getAll']);
        Route::get('{id}', [NavigationMenuController::class, 'get']);
        Route::post('create', [NavigationMenuController::class, 'create']);
        Route::patch('{id}', [NavigationMenuController::class, 'update']);
        Route::delete('{id}', [NavigationMenuController::class, 'delete']);
    });

    Route::group([
        'prefix' => 'navigation-menu-item',
    ], function () {
        Route::get('all', [NavigationMenuItemController::class, 'getAll']);
        Route::get('{id}', [NavigationMenuItemController::class, 'get']);
        Route::post('create', [NavigationMenuItemController::class, 'create']);
        Route::patch('{id}', [NavigationMenuItemController::class, 'update']);
        Route::delete('{id}', [NavigationMenuItemController::class, 'delete']);
        Route::patch('{id}/reorder', [NavigationMenuItemController::class, 'reorder']);
    });
});
