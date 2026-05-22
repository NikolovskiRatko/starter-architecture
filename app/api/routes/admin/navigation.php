<?php

use App\Applications\Navigation\Controllers\NavigationController;
use App\Applications\Navigation\Controllers\NavigationMenuController;
use App\Applications\Navigation\Controllers\NavigationMenuItemController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Admin Navigation API Routes
|--------------------------------------------------------------------------
| Mounted by routes/api.php under prefix /api/admin with the
| `auth:sanctum` + `permission:admin.access` middleware stack.
*/

Route::prefix('navigation')->group(function () {
    Route::get('by-path/{path}', [NavigationController::class, 'showByPath'])
        ->where('path', '.*');

    Route::get('/', [NavigationController::class, 'index']);
    Route::get('{navigation}', [NavigationController::class, 'show']);
    Route::post('/', [NavigationController::class, 'store']);
    Route::patch('{navigation}', [NavigationController::class, 'update']);
    Route::delete('{navigation}', [NavigationController::class, 'destroy']);

    Route::patch('{navigation}/attach', [NavigationController::class, 'attach']);
    Route::patch('{navigation}/detach', [NavigationController::class, 'detach']);
    Route::get('{navigation}/ancestors', [NavigationController::class, 'ancestors']);
    Route::get('{navigation}/descendants', [NavigationController::class, 'descendants']);
});

Route::prefix('navigation-menu')->group(function () {
    Route::get('all', [NavigationMenuController::class, 'getAll']);
    Route::get('{id}', [NavigationMenuController::class, 'get']);
    Route::post('create', [NavigationMenuController::class, 'create']);
    Route::patch('{id}', [NavigationMenuController::class, 'update']);
    Route::delete('{id}', [NavigationMenuController::class, 'delete']);
});

Route::prefix('navigation-menu-item')->group(function () {
    Route::get('all', [NavigationMenuItemController::class, 'getAll']);
    Route::get('{id}', [NavigationMenuItemController::class, 'get']);
    Route::post('create', [NavigationMenuItemController::class, 'create']);
    Route::patch('{id}', [NavigationMenuItemController::class, 'update']);
    Route::delete('{id}', [NavigationMenuItemController::class, 'delete']);
    Route::patch('{id}/reorder', [NavigationMenuItemController::class, 'reorder']);
});
