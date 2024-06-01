<?php

namespace App\Applications\User\Services;

use Illuminate\Database\Eloquent\Collection;
use App\Applications\User\Data\UserData;
use App\Applications\User\Data\UserUpdate;
use App\Applications\User\Data\UserCreateData;
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

    public function getAll()
    {
        return $this->userRepository->getAll();
    }

    public function get($id)
    {
        return $this->userRepository->get($id);
    }

    public function create(UserCreateData $userData)
    {
        $user = $this->userRepository->create($userData->toArray());
        $roleIds = [$userData->role];
        $user->roles()->attach($roleIds);

        return $this->get($user->id);
    }

    public function update(int $userId, UserUpdate $userData): UserData
    {
        $this->userRepository->changeRole($userId, $userData->role);
        return $this->userRepository->update($userId, $userData);
    }

    public function delete(int $id)
    {
        return $this->userRepository->delete($id);
    }

    public function draw($request)
    {
        $data['columns'] = array('users.first_name', 'users.last_name', 'email', 'roles.id', 'users.is_disabled');
        $data['length'] = $request->input('length');
        $data['column'] = $request->input('column'); //Index
        $data['dir'] = $request->input('dir');
        $data['search'] = $request->input('search');
        $data['draw'] = $request->input('draw');

        return $this->userRepository->draw($data);
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

    public function getUserRoles(): Collection
    {
        return $this->userRepository->getUserRoles();
    }
}
