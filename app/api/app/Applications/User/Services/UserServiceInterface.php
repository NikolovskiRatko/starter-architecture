<?php

namespace App\Applications\User\Services;

use App\Applications\User\DTO\UserDTO;
use Illuminate\Foundation\Http\FormRequest;
use App\Applications\User\Model\User;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

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
     * @param array $data
     * @return UserDTO
     */
    public function updateMyProfile(array $data): UserDTO;

    /**
     * @return array
     */
    public function getUserPermissionsAndRoles(): array;

    /**
     * Get a user role by its name.
     *
     * @param string $name
     * @return Role|null
     */
    public function getUserRoleByName(string $name): ?Role;

    /**
     * Handle the avatar upload for a user.
     *
     * @param int $userId
     * @param Request $request
     * @param User $user
     * @return UserDTO
     */
    public function uploadAvatar(int $userId, Request $request, User $user): UserDTO;

    /**
     * Update the password for a specific user.
     *
     * @param int $userId
     * @param array $data
     * @return void
     */
    public function updatePassword(int $userId, array $data): void;
}
