<?php

namespace App\Applications\User\DTO;

use Spatie\Permission\Models\Role;

class UserRoleDTO
{
    public function __construct(
        public int $id,
        public string $name,
        public string $guard_name,
    ) {
    }

    public static function fromArray(array $data): self
    {
        return new self(
            $data['id'],
            $data['name'],
            $data['guard_name']
        );
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'guard_name' => $this->guard_name,
        ];
    }

    public static function fromCollection(iterable $roles): array
    {
        return array_map(function ($role) {
            // Ensure $role is of type Role
            if (!$role instanceof Role) {
                throw new \InvalidArgumentException('Expected instance of Role.');
            }

            return self::fromArray($role->toArray());
        }, $roles->all());
    }
}
