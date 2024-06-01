<?php

namespace App\Applications\User\Services;

use App\Applications\User\Data\UserData;
use App\Applications\User\Data\UserUpdate;
use App\Applications\User\Data\UserCreateData;
use App\Applications\User\Model\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;

/**
 * Interface UserServiceInterface
 * @package App\Applications\User
 */

interface UserServiceInterface
{
    /**
     * @return Collection
     */
    public function getAll();

    /**
     * @param integer $id
     * @return UserData
     */
    public function get($id);

    /**
     * @param UserCreateData $userData
     * @return User
     */
    public function create(UserCreateData $userData);

    /**
     * @param int $userId
     * @param UserUpdate $userData
     * @return UserData
     */
    public function update(int $userId, UserUpdate $userData): UserData;

    /**
     * @param integer $id
     * @return boolean
     */
    public function delete(int $id);

    /**
     * @param Request $request
     * @return array
     */
    public function draw($request);

    /**
     * @param FormRequest $request
     * @return void
     */
    public function updateMyProfile($request);

    /**
     * @return Collection
     */
    public function getUserRoles();
}
