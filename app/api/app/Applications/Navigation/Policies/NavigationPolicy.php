<?php

namespace App\Applications\Navigation\Policies;

use App\Applications\Navigation\Model\Navigation;
use App\Applications\User\Model\User;

class NavigationPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->isAdmin() || $user->isEditor();
    }

    public function view(User $user, Navigation $navigation): bool
    {
        return $user->isAdmin() || $user->isEditor();
    }

    public function create(User $user): bool
    {
        return $user->isAdmin();
    }

    public function update(User $user, Navigation $navigation): bool
    {
        return $user->isAdmin();
    }

    public function delete(User $user, Navigation $navigation): bool
    {
        return $user->isAdmin();
    }
}
