<?php

namespace Tests\Feature\Auth;

use App\Applications\User\Model\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Spatie\Permission\PermissionRegistrar;
use Tests\TestCase;

/**
 * Cross-context end-to-end coverage for the admin/public access matrix.
 *
 * The architecture defines two access contexts (`admin`, `public`). A
 * single user may hold either, both, or neither. These tests exercise
 * every combination against the new canonical /api/admin/* and
 * /api/public/* prefixes and against /api/auth/me to make the
 * relationships obvious at a glance.
 */
class CrossContextTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->app->make(PermissionRegistrar::class)->forgetCachedPermissions();
        $this->seed();
    }

    public function test_admin_and_public_user_can_reach_both_admin_and_public_endpoints(): void
    {
        $user = User::where('email', 'admin-and-public@example.com')->firstOrFail();
        Sanctum::actingAs($user);

        $this->getJson('/api/admin/users/all')->assertOk();
        $this->getJson('/api/public/dashboard')->assertOk();
        $this->getJson('/api/auth/me')
            ->assertOk()
            ->assertJsonPath('contexts.admin', true)
            ->assertJsonPath('contexts.public', true);
    }

    public function test_admin_role_grants_both_contexts_by_design(): void
    {
        // admin@ holds only the `admin` role, but RolePermissionsMap grants
        // admin the public.access permission too (cross-context by design).
        $user = User::where('email', 'admin@example.com')->firstOrFail();
        Sanctum::actingAs($user);

        $this->getJson('/api/admin/users/all')->assertOk();
        $this->getJson('/api/public/dashboard')->assertOk();
    }

    public function test_super_admin_role_can_reach_everything(): void
    {
        $user = User::where('email', 'super-admin@example.com')->firstOrFail();
        Sanctum::actingAs($user);

        $this->getJson('/api/admin/users/all')->assertOk();
        $this->getJson('/api/public/dashboard')->assertOk();
    }

    public function test_editor_can_reach_admin_but_not_public(): void
    {
        $user = User::where('email', 'editor@example.com')->firstOrFail();
        Sanctum::actingAs($user);

        $this->getJson('/api/admin/users/all')->assertOk();
        $this->getJson('/api/public/dashboard')->assertStatus(403);
        $this->getJson('/api/auth/me')
            ->assertOk()
            ->assertJsonPath('contexts.admin', true)
            ->assertJsonPath('contexts.public', false);
    }

    public function test_collaborator_can_reach_admin_but_not_public(): void
    {
        $user = User::where('email', 'collaborator@example.com')->firstOrFail();
        Sanctum::actingAs($user);

        $this->getJson('/api/admin/users/all')->assertOk();
        $this->getJson('/api/public/dashboard')->assertStatus(403);
    }

    public function test_public_user_can_reach_public_but_not_admin(): void
    {
        $user = User::where('email', 'public-user@example.com')->firstOrFail();
        Sanctum::actingAs($user);

        $this->getJson('/api/admin/users/all')->assertStatus(403);
        $this->getJson('/api/public/dashboard')->assertOk();
        $this->getJson('/api/auth/me')
            ->assertOk()
            ->assertJsonPath('contexts.admin', false)
            ->assertJsonPath('contexts.public', true);
    }

    public function test_user_with_no_roles_can_reach_neither_context(): void
    {
        $user = User::create([
            'first_name' => 'Contextless',
            'last_name' => 'User',
            'email' => 'contextless@example.com',
            'password' => bcrypt('password'),
        ]);
        Sanctum::actingAs($user);

        $this->getJson('/api/admin/users/all')->assertStatus(403);
        $this->getJson('/api/public/dashboard')->assertStatus(403);
        $this->getJson('/api/auth/me')
            ->assertOk()
            ->assertJsonPath('contexts.admin', false)
            ->assertJsonPath('contexts.public', false);
    }

    public function test_unauthenticated_request_always_returns_401(): void
    {
        $this->getJson('/api/admin/users/all')->assertStatus(401);
        $this->getJson('/api/public/dashboard')->assertStatus(401);
        $this->getJson('/api/auth/me')->assertStatus(401);
    }
}
