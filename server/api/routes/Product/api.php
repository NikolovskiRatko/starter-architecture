<?php

use App\Applications\Product\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| This file contains the API routes for the Product module
|
|
*/

Route::group([
    'prefix' => 'product',
], function () {
    // CRUD ROUTES
    Route::get('all', [ProductController::class, 'getAll']);
    Route::post('create', [ProductController::class, 'create']);
    Route::get('{id}/get', [ProductController::class, 'get']);
    Route::put('{id}/update', [ProductController::class, 'update']);
    Route::delete('{id}/delete', [ProductController::class, 'delete']);
});
