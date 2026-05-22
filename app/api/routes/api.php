<?php

use App\Applications\User\Controllers\LoginController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\Frontend\NavigationController;
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
Route::get('vue', [HomeController::class, 'vue']);

// AUTHENTICATION ROUTES
Route::group([
    'prefix' => 'auth',
], function () {
    Route::post('login', [LoginController::class, 'login']);
    Route::post('sign-up', [LoginController::class, 'signUp']);
});

// GUEST ROUTES
Route::group([
    'prefix' => 'guest',
], function () {
    Route::get('test', function (Request $request) {
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
        Route::post('logout', [LoginController::class, 'logout']);
        Route::get('user', [LoginController::class, 'user']);
        Route::get('me', [LoginController::class, 'me']);
        Route::get('refresh', [LoginController::class, 'refresh']);
    });
});

// ---------------------------------------------------------------------------
// Phase 2 sub-slice B — admin-context route group (canonical)
// /api/admin/users/* and /api/admin/navigation/* mirror the existing
// /api/user/* and /api/navigations/* groups. The legacy prefixes remain
// alive (see routes/User/api.php and routes/Navigation/api.php) until the
// admin SPA migrates in Phase 3.
// ---------------------------------------------------------------------------
Route::prefix('admin')
    ->middleware(['auth:sanctum', 'permission:admin.access'])
    ->group(function () {
        require base_path('routes/admin/users.php');
        require base_path('routes/admin/navigation.php');
    });

// Public-context authenticated routes — for the Nuxt dashboard built in Phase 4.
Route::prefix('public')
    ->middleware(['auth:sanctum', 'permission:public.access'])
    ->group(function () {
        require base_path('routes/public/dashboard.php');
    });

// Public unauthenticated content (renamed from /nuxt/* to /public-content/*).
// The /nuxt/* prefix below is kept alive as a deprecated alias for one cycle.
Route::prefix('public-content')->group(function () {
    Route::get('/menu/{slug}', [NavigationController::class, 'get']);
    Route::get('/navigation-routes', [NavigationController::class, 'getLiveNavigations']);
});

// DEPRECATED alias — to be removed once Nuxt and admin SPA both migrate.
Route::group([
    'prefix' => 'nuxt',
], function () {
    Route::get('/menu/{slug}', [NavigationController::class, 'get']);
    Route::get('/navigation-routes', [NavigationController::class, 'getLiveNavigations']);
});
