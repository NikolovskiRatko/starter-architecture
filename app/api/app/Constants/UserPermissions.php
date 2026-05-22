<?php

namespace App\Constants;

class UserPermissions
{
    // Users module (existing — admin context)
    public const READ_USERS = 'read_users';
    public const WRITE_USERS = 'write_users';
    public const DELETE_USERS = 'delete_users';

    // Navigation module (existing — admin context)
    public const READ_NAVIGATION = 'read_navigation';
    public const WRITE_NAVIGATION = 'write_navigation';
    public const DELETE_NAVIGATION = 'delete_navigation';

    // Access-context gates — added by auth-access-architecture task.
    // A user with ADMIN_ACCESS may sign into the admin SPA.
    // A user with PUBLIC_ACCESS may sign into authenticated public-frontend pages.
    // A user may hold both, either, or neither.
    public const ADMIN_ACCESS = 'admin.access';
    public const PUBLIC_ACCESS = 'public.access';

    // Public-frontend capabilities (additive — used by future Nuxt dashboard).
    public const PUBLIC_DASHBOARD_VIEW = 'public.dashboard.view';
    public const PUBLIC_PROFILE_UPDATE = 'public.profile.update';
}
