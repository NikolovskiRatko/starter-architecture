<?php

namespace App\Applications\User\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Applications\User\DTO\UserDTO;
use App\Constants\UserRoles;
use App\Applications\User\Services\LoginServiceInterface;
use App\Applications\User\Services\UserService;
use Illuminate\Validation\ValidationException;

/**
 * @property UserService $userService
 */
class LoginController extends Controller
{
    public function __construct(
        UserService $userService
    ) {
        $this->userService = $userService;
    }

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
                ->json(UserDTO::fromModel($data), 200)
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

    public function user(Request $request)
    {
        $user = UserDTO::fromModel($request->user());

        // Add roles and permissions if needed
        //        $user->roles = $user->roles_array();        // Assuming roles_array() is a method in your User model
        //        $user->permissions = $user->permissions_array(); // Assuming permissions_array() is a method in your User model

        return response()->json($user);
    }

    /**
     * Sign up user and get JSON with a user response
     *
     * @param  Request  $request
     * @return JsonResponse
     */
    public function signUp(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'email' => 'required|email|unique:users,email',
                'password' => 'required',
                'first_name' => 'required',
                'last_name' => 'required',
            ]);

            $password = $request->input('password');

            $role = $this->userService->getUserRoleByName(UserRoles::COLLABORATOR);

            if (!$role) {
                return response()->json([
                    'message' => 'User role not found. Please contact support.',
                ], 422);
            }

            $request->merge([
                'role' => $role->id,
            ]);

            $userDTO = UserDTO::fromRequestForCreate($request);
            $newUserDTO = $this->userService->create($userDTO, $password);
            $user = $newUserDTO->model();

            Auth::login($user);
            $token = Auth::user()->createToken('api-token')->plainTextToken;

            return response()
                ->json($newUserDTO->toArray(), 201)
                ->header('authorization', $token)
                ->header('Access-Control-Expose-Headers', 'Authorization');
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Throwable $e) {
            logger()->error('Sign up failed', ['exception' => $e]);

            return response()->json([
                'message' => 'An unexpected error occurred during sign up. Please try again later.',
            ], 500);
        }
    }
}
