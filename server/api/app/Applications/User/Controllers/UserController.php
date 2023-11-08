<?php

namespace App\Applications\User\Controllers;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Applications\User\Services\UserServiceInterface;
use App\Applications\User\Requests\UserRequest;
use App\Applications\User\Requests\MyProfile;
use App\Applications\User\Requests\NewUserRequest;

/**
 * @property UserServiceInterface $userService
 */
class UserController extends Controller
{
    public function __construct(
        UserServiceInterface $userService
    ){
        $this->userService = $userService;
    }

    /**
     * Get a JSON with all the users
     *
     * @return Collection
     */
    public function getAll(){
        return $this->userService->getAll();
    }

    /**
     * Get a JSON with a user by ID
     *
     * @param  integer  $id
     * @return string
     */
    public function get($id){
        return $this->userService->get($id)->toJson();
    }

    /**
     * Store user and get JSON with a user response
     *
     * @param  NewUserRequest  $request
     * @return string
     */
    public function create(NewUserRequest $request){
        return $this->userService->create($request)->toJson();
    }

    /**
     * Update user
     *
     * @param  UserRequest  $request
     * @param  integer  $id
     * @return void
     */
    public function update(UserRequest $request, $id){
        $this->userService->update($request, $id);
    }

    /**
     * Delete user
     *
     * @return string
     */
    public function delete($id){
        return $this->userService->delete($id);
    }

    /**
     * Get a paginated, filtered and sorted array of Users.
     * This endpoint requires some data in the request.
     *
     * @param  Request  $request
     * @return array
     */
    public function draw(Request $request){
        return $this->userService->draw($request);
    }

    /**
     * Get a JSON of User Roles.
     *
     * @return string
     */
    public function getUserRoles(){
        return $this->userService->getUserRoles();
    }

    /**
     * Get a JSON for the logged in user
     *
     * @return string
     */
    public function getMyProfile(){
        return $this->userService->get(Auth::user()->id)->toJson();
    }

    /**
     * Update logged user
     *
     * @param  MyProfile  $request
     * @return void
     */
    public function updateMyProfile(MyProfile $request){
        $this->userService->updateMyProfile($request);
    }
}
