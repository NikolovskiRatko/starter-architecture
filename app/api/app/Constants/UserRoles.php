<?php

namespace App\Constants;

class UserRoles
{
    // Admin-context roles (existing)
    public const ADMIN = 'admin';
    public const EDITOR = 'editor';
    public const COLLABORATOR = 'collaborator';

    // Added by auth-access-architecture task.
    public const SUPER_ADMIN = 'super-admin';
    public const PUBLIC_USER = 'public-user';
}
