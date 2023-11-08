<?php

namespace App\Applications\User\Repositories;

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
    ){
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

    public function getAll(){
        return $this->user::all();
    }

    public function get($id){
        /** @var User $user */
        $user = $this->user::findOrFail($id);
//        $user['roles_array'] = $user->roles->pluck('name')->toArray();
        return $user;
    }

    public function create($input){
        /** @var User */
        $user = $this->user->create($input);
        return $user;
    }

    public function update($user, $input){
        return $user->update($input);
    }

    public function delete($id){
        return $this->user
            ->where('id', $id)
            ->delete();
    }

    public function draw($data){
        $paginator = $this->prepareDatatableQuery($data, [User::ADMIN, User::EDITOR, User::COLLABORATOR]);
        return $this->prepareDatatablesData($paginator, $data);
    }

    private function prepareDatatablesData($paginator, $data){
        $last_page = $paginator->lastPage();
        $limit = $paginator->perPage();
        $current_page = $paginator->currentPage();
        $total = $paginator->total();
        $pagination = [
            'lastPage' => $last_page,
            'currentPage' => $current_page,
            'total' => $total,
            'dataLength' => $limit,
            'options' => $paginator->getOptions(),
        ];

        return [
            'data' => $paginator,
            'records' => $paginator->items(),
            'pagination' => $pagination,
            'draw' => $data['draw']
        ];
    }

    private function prepareDatatableQuery($data, array $roles) {
        // TODO: Refactor this segment
        $query = DB::table('users')
            ->select(
                DB::raw('users.id as id'),
                DB::raw('users.first_name as first_name'),
                DB::raw('users.last_name as last_name'),
                DB::raw("users.email as email"),
                DB::raw('GROUP_CONCAT(DISTINCT roles.name) AS roles')
            )
            ->leftJoin('model_has_roles', 'model_has_roles.model_id', '=', 'users.id')
            ->leftJoin('roles', 'model_has_roles.role_id', '=', 'roles.id')
            ->whereIn('roles.name', $roles);

        $search = $data['search'];
        if($search){
            $query->where(function($subquery) use ($search) {
                $subquery->where('users.first_name', 'like', '%'.$search.'%');
                $subquery->orWhere('users.last_name', 'like', '%'.$search.'%');
                $subquery->orWhere('users.email', 'like', '%'.$search.'%');
                $subquery->orWhere('roles.name', 'like', '%'.$search.'%');
            });
        }

        $query->groupBy('users.id', 'users.first_name', 'users.last_name', 'users.email');

        if (array_key_exists($data['column'], self::COLUMNS_MAP)) {
            $query->orderBy(self::COLUMNS_MAP[$data['column']], $data['dir']);
        }
        $query->whereNull('users.deleted_at');

        $paginator = $query->paginate($data['length']);
        return $paginator;
    }

    public function getUserRoles(){
        return $this->role->select('id', 'name')->get();
    }

    public function setPassword($user, $password){
        $pass = Hash::make($password);
        $user->password = $pass;
        $user->save();
    }
}
