<?php

namespace App\Applications\User\Repositories;

use App\Applications\User\DTO\UserDTO;
use App\Applications\Pagination\StarterPaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Hash;
use App\Applications\User\Model\User;
use Spatie\Permission\Models\Role;


/**
 * @property User $user
 * @property Role $role
 */
class UserRepository implements UserRepositoryInterface
{
    public function __construct(
        User $user,
        Role $role
    ) {
        $this->user = $user;
        $this->role = $role;
    }

    private const COLUMNS_MAP = [
        'first_name' => 'users.first_name',
        'last_name' => 'users.last_name',
        'email' => 'users.email',
        'roles' => 'roles.id',
        'status' => 'users.is_disabled'
    ];

    public function getAll(): array
    {
        $users = $this->user::all();
        return UserDTO::fromCollection($users);
    }

    public function get($id): UserDTO
    {
        $user = $this->user::findOrFail($id);
        return UserDTO::fromModel($user);
    }

    public function create(UserDTO $userDTO, string $password): User
    {
        $attributes = $userDTO->toArray();
        unset($attributes['password']);

        $user = new User($attributes);
        $user->password = Hash::make($password);
        $user->save();

        return $user;
    }

    public function update(int $userId, UserDTO $userData): User
    {
        $user = $this->user->findOrFail($userId);
        $attributes = $userData->toArray();
        $user->update($attributes);
        return $user;
    }

    public function delete(int $id)
    {
        return $this->user::findOrFail($id)->delete();
    }

    public function draw($data): StarterPaginator
    {
//        $paginatedUsers = $this->prepareDatatableQuery($data, [User::ADMIN, User::EDITOR, User::COLLABORATOR]);

        $query = $this->user->query();

        // $query->whereIn('roles.name', $roles);

        if (array_key_exists($data['column'], self::COLUMNS_MAP)) {
            $query->orderBy(self::COLUMNS_MAP[$data['column']], $data['dir']);
        }

        $search = $data['search'];
        if ($search) {
            $query->where(function ($subquery) use ($search) {
                $subquery->where('users.first_name', 'like', '%' . $search . '%');
                $subquery->orWhere('users.last_name', 'like', '%' . $search . '%');
                $subquery->orWhere('users.email', 'like', '%' . $search . '%');
                $subquery->orWhere('roles.name', 'like', '%' . $search . '%');
            });
        }

        $query->whereNull('deleted_at');

        return $query->paginate($data['length']);
    }

//    private function prepareDatatableQuery($data, array $roles)
//    {
//        $query = $this->user->query();
//
//        // $query->whereIn('roles.name', $roles);
//
//        if (array_key_exists($data['column'], self::COLUMNS_MAP)) {
//            $query->orderBy(self::COLUMNS_MAP[$data['column']], $data['dir']);
//        }
//
//        $search = $data['search'];
//        if ($search) {
//            $query->where(function ($subquery) use ($search) {
//                $subquery->where('users.first_name', 'like', '%' . $search . '%');
//                $subquery->orWhere('users.last_name', 'like', '%' . $search . '%');
//                $subquery->orWhere('users.email', 'like', '%' . $search . '%');
//                $subquery->orWhere('roles.name', 'like', '%' . $search . '%');
//            });
//        }
//
//        $query->whereNull('deleted_at');
//
//        return $query->paginate($data['length']);
//    }

    public function getUserRoles(): Collection
    {
        return $this->role->all();
    }

    public function changeRole($id, $role_id)
    {
        $this->user
            ->where('id', $id)
            ->first()
            ->syncRoles($role_id);
    }

    public function setPassword($user, $password)
    {
        $pass = Hash::make($password);
        $user->password = $pass;
        $user->save();
    }
}
