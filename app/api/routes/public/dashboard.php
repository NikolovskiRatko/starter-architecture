<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public-context Authenticated Dashboard Routes
|--------------------------------------------------------------------------
| Mounted by routes/api.php under prefix /api/public with the
| `auth:sanctum` + `permission:public.access` middleware stack.
|
| Currently a stub that returns the authenticated user identifier so the
| Nuxt dashboard built in Phase 4 has something to call. Real public-side
| endpoints are added in follow-up tasks.
*/

Route::get('dashboard', function (Request $request) {
    return response()->json([
        'message' => 'ok',
        'user_id' => $request->user()->id,
    ]);
});
