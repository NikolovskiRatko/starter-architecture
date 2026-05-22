<?php

use App\Applications\User\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Admin Users API Routes
|--------------------------------------------------------------------------
| Mounted by routes/api.php under prefix /api/admin/users with the
| `auth:sanctum` + `permission:admin.access` middleware stack. Do not add
| group wrappers here — the parent group provides them.
*/

Route::prefix('users')->group(function () {
    Route::get('all', [UserController::class, 'getAll']);
    Route::get('draw', [UserController::class, 'draw']);
    Route::get('permissions-roles', [UserController::class, 'getUserPermissionsRoles']);

    // CRUD ROUTES
    Route::post('create', [UserController::class, 'create']);
    Route::get('{id}', [UserController::class, 'get']);
    Route::patch('{id}', [UserController::class, 'update']);
    Route::delete('{id}', [UserController::class, 'delete']);

    // User avatars
    Route::post('avatar/{id}', [UserController::class, 'uploadAvatar']);
});
