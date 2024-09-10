<?php

namespace App\Applications\User\Services;

use App\Applications\User\DTO\UserDTO;
use App\Applications\User\DTO\UserRoleDTO;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Foundation\Http\FormRequest;

/**
 * Interface UserServiceInterface
 * @package App\Applications\User
 */

interface UserServiceInterface
{
    /**
     * @return array
     */
    public function getAll(): array;

    /**
     * @param integer $id
     * @return UserDTO
     */
    public function get(int $id): UserDTO;

    /**
     * @param UserDTO $userData
     * @param string $password
     * @return UserDTO
     */
    public function create(UserDTO $userData, string $password): UserDTO;

    /**
     * @param int $userId
     * @param UserDTO $userData
     * @return UserDTO
     */
    public function update(int $userId, UserDTO $userData): UserDTO;

    /**
     * @param integer $id
     * @return boolean
     */
    public function delete(int $id);

    /**
     * @param array $data
     * @return array
     */
    public function draw(array $data): array;

    /**
     * @param FormRequest $request
     * @return void
     */
    public function updateMyProfile($request);

    /**
     * @return array
     */
    public function getUserRoles(): array;
}
