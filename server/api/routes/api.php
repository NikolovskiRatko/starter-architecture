<?php

use App\Http\Controllers\Auth\LoginController;
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

//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});

// NON AUTHORIZED ROUTES
// AUTHENTICATION ROUTES
Route::group([
    'prefix' => 'auth',
], function () {
    Route::post('/login', [LoginController::class,'login']);
});
// GUEST ROUTES
Route::group([
    'prefix' => 'guest',
], function () {
    Route::get('/test', function (Request $request) {
        return "OPEN";
    });
});

// AUTHORIZED ROUTES
Route::group([
    'middleware' => 'auth:sanctum'
], function () {
    // AUTHENTICATION ROUTES
    Route::group([
        'prefix' => 'auth',
    ], function () {
        Route::post('/logout', [LoginController::class,'logout']);
        Route::get('/user', [LoginController::class, 'user']);
        Route::get('/refresh', [LoginController::class, 'refresh']);
    });
});

