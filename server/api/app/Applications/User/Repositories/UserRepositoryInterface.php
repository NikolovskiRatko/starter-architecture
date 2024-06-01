<?php

namespace App\Applications\User\Repositories;

use App\Applications\User\Data\UserData;
use App\Applications\User\Data\UserUpdate;
use App\Applications\User\Model\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;

/**
 * Interface UserRepositoryInterface
 * @package App\Applications\User
 */

interface UserRepositoryInterface
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
     * @param FormRequest $request
     * @return User
     */
    public function create($request);

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
     * @return Collection
     */
    public function getUserRoles();

    /**
     * @param integer $id
     * @param integer $role_id
     * @return void
     */
    public function changeRole($id, $role_id);

    /**
     * @param User $user
     * @param string $password
     * @return void
     */
    public function setPassword($user, $password);
}
