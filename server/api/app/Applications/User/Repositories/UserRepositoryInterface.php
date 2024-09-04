<?php

namespace App\Applications\User\Repositories;

use App\Applications\Pagination\StarterPaginator;
use App\Applications\User\DTO\UserDTO;
use App\Applications\User\Model\User;
use Illuminate\Database\Eloquent\Collection;

/**
 * Interface UserRepositoryInterface
 * @package App\Applications\User
 */

interface UserRepositoryInterface
{
    /**
     * @return array
     */
    public function getAll(): array;

    /**
     * @param integer $id
     * @return UserDTO
     */
    public function get($id);

    /**
     * @param UserDTO $userDTO
     * @param string $password
     * @return User
     */
    public function create(UserDTO $userDTO, string $password): User;

    /**
     * @param int $userId
     * @param UserDTO $userData
     * @return User
     */
    public function update(int $userId, UserDTO $userData): User;

    /**
     * @param integer $id
     * @return boolean
     */
    public function delete(int $id);

    /**
     * @param array $data
     * @return StarterPaginator
     */
    public function draw(array $data): StarterPaginator;

    /**
     * @return Collection
     */
    public function getUserRoles(): Collection;

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
