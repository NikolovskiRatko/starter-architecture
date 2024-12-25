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
    Route::group([
        'prefix' => 'navigation',
    ], function () {
        Route::get('all', [NavigationController::class, 'getAll']);
        Route::get('{id}', [NavigationController::class, 'get']);
        Route::post('create', [NavigationController::class, 'create']);
        Route::patch('{id}', [NavigationController::class, 'update']);
        Route::delete('{id}', [NavigationController::class, 'delete']);
        Route::patch('{id}/attach', [NavigationController::class, 'attachToModel']);
        Route::patch('{id}/detach', [NavigationController::class, 'detachModel']);
        Route::get('{id}/ancestors', [NavigationController::class, 'getAncestors']);
        Route::get('{id}/descendants', [NavigationController::class, 'getDescendants']);
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
