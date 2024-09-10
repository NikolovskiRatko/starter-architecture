<?php

namespace App\Applications\User\Services;

use Illuminate\Database\Eloquent\Collection;
use App\Applications\User\DTO\UserDTO;
use App\Applications\User\DTO\UserRoleDTO;
// use App\Applications\User\Data\UserRole;
use App\Applications\User\Repositories\UserRepositoryInterface;

use Illuminate\Support\Facades\Auth;

/**
 * @property UserRepositoryInterface $userRepository
 */
class UserService implements UserServiceInterface
{
    public function __construct(
        UserRepositoryInterface $userRepository
    ) {
        $this->userRepository = $userRepository;
    }

    public function getAll(): array
    {
        return $this->userRepository->getAll();
    }

    public function get($id): UserDTO
    {
        return $this->userRepository->get($id);
    }

    public function create(UserDTO $userData, string $password): UserDTO
    {
        $user = $this->userRepository->create($userData, $password);

        $roleIds = [$userData->role];
        $user->roles()->attach($roleIds);

        return UserDTO::fromModel($user);
    }

    public function update(int $userId, UserDTO $userData): UserDTO
    {
        $this->userRepository->changeRole($userId, $userData->role);
        $user = $this->userRepository->update($userId, $userData);
        return UserDTO::fromModel($user);
    }

    public function delete(int $id)
    {
        return $this->userRepository->delete($id);
    }

    public function draw(array $data): array
    {
        $data['columns'] = ['users.first_name', 'users.last_name', 'email', 'roles.id', 'users.is_disabled'];
        $data['length'] = $data['length'] ?? 10;
        $data['column'] = $data['column'] ?? 'users.first_name';
        $data['dir'] = $data['dir'] ?? 'asc';
        $data['search'] = $data['search'] ?? '';
        $data['draw'] = $data['draw'] ?? 1;

        $usersCollection = $this->userRepository->draw($data);

        $usersDTOs = $usersCollection->getCollection()->map(function ($user) {
            return UserDTO::fromModel($user);
        });

        return [
            'data' => $usersDTOs,
            'pagination' => $usersCollection->toArray()['pagination'],
        ];
    }

    public function updateMyProfile($request)
    {
        $request_array = $request->all();
        $user = $this->userRepository->get(Auth::user()->id);
        $data['first_name'] = $request_array['first_name'];
        $data['last_name'] = $request_array['last_name'];
        $data['email'] = $request_array['email'];
        $this->userRepository->update($user, $data);
        if ($request_array['password'] != null)
            $this->userRepository->setPassword($user, $request_array['password']);
    }

    public function getUserRoles(): array
    {
        $rolesCollection = $this->userRepository->getUserRoles();
        return UserRoleDTO::fromCollection($rolesCollection);
    }
}
