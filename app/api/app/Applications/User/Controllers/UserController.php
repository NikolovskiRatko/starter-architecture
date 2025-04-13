<?php

namespace App\Applications\User\Controllers;

use App\Applications\User\DTO\UserDTO;
use Illuminate\Http\Request;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Applications\User\Services\UserServiceInterface;
use App\Applications\User\Requests\MyProfileRequest;
use App\Applications\User\Requests\UpdatePasswordRequest;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * @property UserServiceInterface $userService
 */
class UserController extends Controller
{
    public function __construct(
        UserServiceInterface $userService
    ) {
        $this->userService = $userService;
    }

    /**
     * Get a JSON with all the users
     *
     * @return JsonResponse
     */
    public function getAll(): JsonResponse
    {
        $userDTOs = $this->userService->getAll();
        return response()->json($userDTOs);
    }

    /**
     * Get a JSON with a user by ID
     *
     * @param  integer  $id
     * @return JsonResponse
     */
    public function get(int $id): JsonResponse
    {
        $userDTO = $this->userService->get($id);
        return response()->json($userDTO);
    }

    /**
     * Store user and get JSON with a user response
     *
     * @param  Request  $request
     * @return JsonResponse
     */
    public function create(Request $request): JsonResponse
    {
        $password = $request->input('password');
        $userDTO = UserDTO::fromRequestForCreate($request);
        $newUserDTO = $this->userService->create($userDTO, $password);

        return response()->json($newUserDTO);
    }

    /**
     * Update user
     *
     * @param  Request  $request
     * @return JsonResponse
     */
    public function update(Request $request): JsonResponse
    {
        $userId = Route::current()->parameter('id');
        $dto = UserDTO::fromRequest($request);
        $userDTO = $this->userService->update(
            $userId,
            $dto
        );
        return response()->json($userDTO);
    }

    /**
     * Delete user
     *
     * @return string
     */
    public function delete()
    {
        $userId = Route::current()->parameter('id');
        return $this->userService->delete($userId);
    }

    /**
     * Get a paginated, filtered and sorted array of Users.
     * This endpoint requires some data in the request.
     *
     * @param  Request  $request
     * @return JsonResponse
     */
    public function draw(Request $request): JsonResponse
    {
        try {
            $data = $request->all();
            $usersDTO = $this->userService->draw($data);

            return response()->json($usersDTO);
        } catch (\InvalidArgumentException $e) {
            // Handle specific exceptions like InvalidArgumentException
            return response()->json([
                'error' => 'Invalid Argument',
                'message' => $e->getMessage(),
            ], 400); // Bad Request status code
        } catch (\ValidationException $e) {
            // Handle validation exceptions
            return response()->json([
                'error' => 'Validation Error',
                'message' => $e->getMessage(),
                'errors' => $e->errors(),
            ], 422); // Unprocessable Entity status code
        } catch (\Exception $e) {
            // Handle any other general exceptions
            return response()->json([
                'error' => 'Server Error',
                'message' => $e->getMessage(),
            ], 500); // Internal Server Error status code
        }
    }

    /**
     * Get a JSON of User Roles and Permissions.
     *
     * @return JsonResponse
     */
    public function getUserPermissionsRoles(): JsonResponse
    {
        $permissionsAndRoles = $this->userService->getUserPermissionsAndRoles();

        return response()->json($permissionsAndRoles);
    }

    /**
     * Get a JSON for the logged in user
     *
     * @return string
     */
    public function getMyProfile()
    {
        $userDTO = $this->userService->get(
            Auth::user()->id
        );
        return response()->json($userDTO);
    }

    /**
     * Update logged user
     *
     * @param MyProfileRequest $request
     * @return JsonResponse
     */
    public function updateMyProfile(MyProfileRequest $request): JsonResponse
    {
        try {
            $userDTO = $this->userService->updateMyProfile($request->validated());

            return response()->json($userDTO, 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'message' => 'User not found.',
            ], 404);
        } catch (\Throwable $e) {
            Log::error('Profile update failed', [
                'error' => $e->getMessage(),
                'user_id' => Auth::id(),
            ]);

            return response()->json([
                'message' => 'An unexpected error occurred while updating your profile. Please try again later.',
            ], 500);
        }
    }

    /**
     * Handle the avatar upload for the authenticated user.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function uploadAvatar(Request $request): JsonResponse
    {
        try {
            $userId = Route::current()->parameter('id');
            $userId = (is_numeric($userId) && (int)$userId > 0)
                ? (int)$userId
                : Auth::id();

            $userDTO = $this->userService->uploadAvatar($userId, $request, Auth::user());

            return response()->json($userDTO, 200);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation error.',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Symfony\Component\HttpKernel\Exception\NotFoundHttpException $e) {
            return response()->json([
                'message' => 'User not found.',
            ], 404);
        } catch (AuthorizationException $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 403);
        } catch (\Exception $e) {
            Log::error('Error uploading avatar: ' . $e->getMessage(), ['exception' => $e]);

            return response()->json([
                'message' => 'An error occurred while uploading the avatar. Please try again later.',
            ], 500);
        }
    }

    /**
     * Update password for the currently authenticated user.
     *
     * @param UpdatePasswordRequest $request
     * @return JsonResponse
     */
    public function updatePassword(UpdatePasswordRequest $request): JsonResponse
    {
        try {
            $this->userService->updatePassword(Auth::id(), $request->validated());

            return response()->json(['message' => 'Password updated successfully.']);
        } catch (\Throwable $e) {
            \Log::error('Password update failed', [
                'user_id' => Auth::id(),
                'error' => $e->getMessage(),
            ]);

            return response()->json(['message' => 'An error occurred while updating the password.'], 500);
        }
    }
}
