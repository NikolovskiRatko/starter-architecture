<?php

namespace App\Applications\User\DTO;

use Spatie\Permission\Models\Permission;

class UserPermissionDTO
{
    public function __construct(
        public int $id,
        public string $name,
        public string $guard_name,
    ) {}

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

    public static function fromCollection(iterable $permissions): array
    {
        return array_map(function ($permission) {
            // Ensure $role is of type Role
            if (!$permission instanceof Permission) {
                throw new \InvalidArgumentException('Expected instance of Role.');
            }

            return self::fromArray($permission->toArray());
        }, $permissions->all());
    }
}
