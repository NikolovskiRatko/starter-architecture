<?php

namespace App\Applications\User\Controllers;

use App\Applications\User\Data\UserData;
use App\Applications\User\Data\UserUpdate;
use App\Applications\User\Data\UserCreateData;
use App\Applications\User\Model\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Applications\User\Services\UserServiceInterface;
// use App\Applications\User\Requests\UserRequest;
use App\Applications\User\Requests\MyProfile;
use Illuminate\Support\Facades\Route;

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
     * @return Collection
     */
    public function getAll()
    {
        return $this->userService->getAll();
    }

    /**
     * Get a JSON with a user by ID
     *
     * @param  integer  $id
     * @return UserData
     */
    public function get($id)
    {
        return $this->userService->get($id);
    }

    /**
     * Store user and get JSON with a user response
     *
     * @param  Request  $request
     * @return UserData
     */
    public function create(Request $request)
    {
        return $this->userService->create(
            UserCreateData::from($request->all())
        );
    }

    /**
     * Update user
     *
     * @param  Request  $request
     * @return UserData
     */
    public function update(Request $request)
    {
        $userId = Route::current()->parameter('id');
        return $this->userService->update(
            $userId,
            UserUpdate::from($request->all())
        );
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
     * @return array
     */
    public function draw(Request $request)
    {
        return $this->userService->draw($request);
    }

    /**
     * Get a JSON of User Roles.
     *
     * @return Collection
     */
    public function getUserRoles()
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
