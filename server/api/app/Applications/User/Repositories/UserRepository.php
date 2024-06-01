<?php

namespace App\Applications\User\Repositories;

use App\Applications\User\Data\UserData;
use App\Applications\User\Data\UserUpdate;
use App\Applications\User\Data\UserRole;
use Illuminate\Support\Facades\DB;
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

    public function getAll()
    {
        return UserData::collect($this->user::all());
    }

    public function get($id)
    {
        return UserData::from($this->user::findOrFail($id));
    }

    public function create($input)
    {
        /** @var User */
        $user = $this->user->create($input);
        return $user;
    }

    public function update(int $userId, UserUpdate $userData): UserData
    {
        $user = $this->user->findOrFail($userId);
        $user->update($userData->toArray());
        return UserData::from($user);
    }

    public function delete(int $id)
    {
        return $this->user::findOrFail($id)->delete();
    }

    public function draw($data)
    {
        $newData = $this->prepareDatatableQuery($data, [User::ADMIN, User::EDITOR, User::COLLABORATOR]);
        return UserData::tableData($newData);
    }

    private function prepareDatatableQuery($data, array $roles)
    {
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

    public function getUserRoles()
    {
        $roles = $this->role->all();
        return UserRole::collect($roles);
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
