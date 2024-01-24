<?php

use Illuminate\Http\Request;
use App\Applications\Magazine\Controllers\MagazineController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| This file contains the API routes for the Magazine module
|
|
*/

Route::group([
    'prefix' => 'magazine',
], function () {
    // CRUD ROUTES
    Route::get('all', [MagazineController::class, 'getAll']);
    Route::post('create', [MagazineController::class, 'create']);
    Route::get('{id}/get', [MagazineController::class, 'get']);
    Route::post('{id}/update', [MagazineController::class, 'update']);
    Route::get('{id}/delete', [MagazineController::class, 'delete']);
});
