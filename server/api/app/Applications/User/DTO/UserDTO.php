<?php

namespace App\Applications\User\DTO;

use App\Applications\User\Model\User;
use Illuminate\Http\Request;

class UserDTO
{
    public string $first_name;
    public string $last_name;
    public string $email;
    public int $role;
    public int $id;
    public int $is_disabled;
    public array $permissions_array;

    public function __construct(
        string $first_name,
        string $last_name,
        string $email,
        int $role,
        int $id = 0,
        int $is_disabled = 0,
        array $permissions_array = []
    ) {
        $this->first_name = $first_name;
        $this->last_name = $last_name;
        $this->email = $email;
        $this->role = $role;
        $this->id = $id;
        $this->is_disabled = $is_disabled;
        $this->permissions_array = $permissions_array;
    }

    public static function fromRequest(Request $request): self
    {
        return new self(
            $request->input('first_name'),
            $request->input('last_name'),
            $request->input('email'),
            $request->input('role'),
            $request->input('id', 0),
            $request->input('is_disabled', 0),
            $request->input('permissions_array', [])
        );
    }

    public static function fromRequestForCreate(Request $request): self
    {
        return new self(
            $request->input('first_name'),
            $request->input('last_name'),
            $request->input('email'),
            $request->input('role'),
            id: 0,
            is_disabled: 0,
            permissions_array: $request->input('permissions_array', [])
        );
    }

    public static function fromModel(User $user): self
    {
        return new self(
            $user->first_name,
            $user->last_name,
            $user->email,
            $user->role,
            $user->id,
            $user->is_disabled,
            $user->permissions_array
        );
    }

    public function jsonSerialize(): array
    {
        return $this->toArray();
    }

    public function toArray(): array
    {
        return [
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'email' => $this->email,
            'role' => $this->role,
            'id' => $this->id,
            'is_disabled' => $this->is_disabled,
            'permissions_array' => $this->permissions_array,
        ];
    }

    public static function fromCollection(iterable $users): array
    {
        return array_map(function (User $user) {
            return self::fromModel($user);
        }, $users->all());
    }
}

?>
