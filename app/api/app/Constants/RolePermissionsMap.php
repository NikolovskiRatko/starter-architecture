<?php

namespace App\Constants;

use App\Constants\UserPermissions;
use App\Constants\UserRoles;

class RolePermissionsMap
{
    public const MAP = [
        UserRoles::SUPER_ADMIN => [
            UserPermissions::ADMIN_ACCESS,
            UserPermissions::PUBLIC_ACCESS,
            UserPermissions::READ_USERS,
            UserPermissions::WRITE_USERS,
            UserPermissions::DELETE_USERS,
            UserPermissions::READ_NAVIGATION,
            UserPermissions::WRITE_NAVIGATION,
            UserPermissions::DELETE_NAVIGATION,
            UserPermissions::PUBLIC_DASHBOARD_VIEW,
            UserPermissions::PUBLIC_PROFILE_UPDATE,
        ],
        UserRoles::ADMIN => [
            UserPermissions::ADMIN_ACCESS,
            UserPermissions::PUBLIC_ACCESS,
            UserPermissions::READ_USERS,
            UserPermissions::WRITE_USERS,
            UserPermissions::DELETE_USERS,
            UserPermissions::READ_NAVIGATION,
            UserPermissions::WRITE_NAVIGATION,
            UserPermissions::DELETE_NAVIGATION,
            UserPermissions::PUBLIC_DASHBOARD_VIEW,
            UserPermissions::PUBLIC_PROFILE_UPDATE,
        ],
        UserRoles::EDITOR => [
            UserPermissions::ADMIN_ACCESS,
            UserPermissions::READ_USERS,
            UserPermissions::READ_NAVIGATION,
            UserPermissions::WRITE_NAVIGATION,
        ],
        UserRoles::COLLABORATOR => [
            UserPermissions::ADMIN_ACCESS,
            UserPermissions::READ_NAVIGATION,
        ],
        UserRoles::PUBLIC_USER => [
            UserPermissions::PUBLIC_ACCESS,
            UserPermissions::PUBLIC_DASHBOARD_VIEW,
            UserPermissions::PUBLIC_PROFILE_UPDATE,
        ],
    ];
}
