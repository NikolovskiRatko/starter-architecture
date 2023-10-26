<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{

    /**
     * Handle an authentication attempt.
     */
    public function login(Request $request): JsonResponse
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $data = Auth::user();
            $token = $data->createToken('api-token')->plainTextToken;

            return response()
                ->json(compact('data'), 200)
                ->header('authorization', $token)
                ->header('Access-Control-Expose-Headers', 'Authorization');
        }

        return response()->json(['error' => 'Invalid Credentials'], 401);
    }

    public function logout(Request $request)
    {
        // Revoke the user's current token
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Token revoked']);
    }

    public function refresh(Request $request)
    {
        // Revoke the user's current token
        $request->user()->currentAccessToken()->delete();
        $data = $request->user();

        // Issue new token
        $token = $request->user()->createToken('api-token')->plainTextToken;

        return response()
                ->json(compact('data'), 200)
                ->header('authorization', $token)
                ->header('Access-Control-Expose-Headers', 'Authorization');;
    }

    public function user(Request $request){
        $user = $request->user();

        // Add roles and permissions if needed
//        $user->roles = $user->roles_array();        // Assuming roles_array() is a method in your User model
//        $user->permissions = $user->permissions_array(); // Assuming permissions_array() is a method in your User model

        return response()->json($user);
    }
}
