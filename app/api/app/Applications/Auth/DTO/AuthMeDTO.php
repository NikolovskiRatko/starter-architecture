<?php

namespace App\Applications\Auth\DTO;

use App\Applications\User\Model\User;
use App\Constants\UserPermissions;
use JsonSerializable;

/**
 * Normalised identity payload returned by GET /api/auth/me.
 *
 * Exposes everything a frontend client needs to (a) recognise the user, (b)
 * determine which access contexts (`admin`, `public`) they may enter, and
 * (c) gate UI by individual capabilities (`permissions`). Roles are included
 * for convenience but should not be the unit of authorisation.
 */
class AuthMeDTO implements JsonSerializable
{
    public function __construct(
        public readonly int $id,
        public readonly string $email,
        public readonly string $first_name,
        public readonly string $last_name,
        public readonly ?string $avatar_url,
        public readonly ?string $avatar_thumbnail,
        /** @var string[] */
        public readonly array $roles,
        /** @var string[] */
        public readonly array $permissions,
        /** @var array{admin: bool, public: bool} */
        public readonly array $contexts,
        public readonly string $token_type,
    ) {
    }

    public static function fromModel(User $user, string $tokenType = 'sanctum-pat'): self
    {
        $permissions = $user->getAllPermissions()->pluck('name')->all();
        $roles = $user->getRoleNames()->all();

        return new self(
            id: (int) $user->id,
            email: (string) $user->email,
            first_name: (string) $user->first_name,
            last_name: (string) $user->last_name,
            avatar_url: $user->avatar_url,
            avatar_thumbnail: $user->avatar_thumbnail,
            roles: array_values($roles),
            permissions: array_values($permissions),
            contexts: [
                'admin' => in_array(UserPermissions::ADMIN_ACCESS, $permissions, true),
                'public' => in_array(UserPermissions::PUBLIC_ACCESS, $permissions, true),
            ],
            token_type: $tokenType,
        );
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'email' => $this->email,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'avatar_url' => $this->avatar_url,
            'avatar_thumbnail' => $this->avatar_thumbnail,
            'roles' => $this->roles,
            'permissions' => $this->permissions,
            'contexts' => $this->contexts,
            'token_type' => $this->token_type,
        ];
    }

    public function jsonSerialize(): array
    {
        return $this->toArray();
    }
}
