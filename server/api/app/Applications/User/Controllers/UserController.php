<?php

namespace App\Applications\User\Controllers;

use App\Applications\User\DTO\UserDTO;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Applications\User\Services\UserServiceInterface;
// use App\Applications\User\Requests\UserRequest;
use App\Applications\User\Requests\MyProfile;
use Illuminate\Support\Facades\Route;
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
        $data = $request->all();
        $usersDTO = $this->userService->draw($data);
        return response()->json($usersDTO);
    }

    /**
     * Get a JSON of User Roles.
     *
     * @return array
     */
    public function getUserRoles(): array
    {
        return $this->userService->getUserRoles();
    }

    /**
     * Get a JSON for the logged in user
     *
     * @return string
     */
    public function getMyProfile()
    {
        return $this->userService->get(Auth::user()->id)->toJson();
    }

    /**
     * Update logged user
     *
     * @param  MyProfile  $request
     * @return void
     */
    public function updateMyProfile(MyProfile $request)
    {
        $this->userService->updateMyProfile($request);
    }
}
