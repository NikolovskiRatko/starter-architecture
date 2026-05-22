<?php

namespace Tests\Feature\Auth;

use App\Applications\User\Model\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Spatie\Permission\PermissionRegistrar;
use Tests\TestCase;

/**
 * Verifies that the `permission:admin.access` middleware on the existing
 * /api/user/* and /api/navigations/* groups gates the admin context.
 *
 * Seeded admin/editor/collaborator all hold `admin.access` (granted by this
 * sub-slice's additive permission map), so they continue to reach the
 * existing admin endpoints. The new `public-user` role does NOT hold
 * `admin.access` and must be rejected with 403.
 */
class AccessGateTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        // Spatie keeps a permission cache between test methods within a class.
        // Reset it so role/permission lookups hit a fresh DB after RefreshDatabase.
        $this->app->make(PermissionRegistrar::class)->forgetCachedPermissions();
        $this->seed();
    }

    public function test_unauthenticated_user_is_rejected_from_admin_endpoint(): void
    {
        $this->getJson('/api/user/all')->assertStatus(401);
    }

    public function test_admin_user_can_reach_admin_endpoint(): void
    {
        Sanctum::actingAs(User::where('email', 'admin@example.com')->firstOrFail());

        $this->getJson('/api/user/all')->assertOk();
    }

    public function test_editor_user_can_reach_admin_endpoint(): void
    {
        Sanctum::actingAs(User::where('email', 'editor@example.com')->firstOrFail());

        $this->getJson('/api/user/all')->assertOk();
    }

    public function test_collaborator_user_can_reach_admin_endpoint(): void
    {
        Sanctum::actingAs(User::where('email', 'collaborator@example.com')->firstOrFail());

        $this->getJson('/api/user/all')->assertOk();
    }

    public function test_public_user_is_rejected_from_admin_endpoint_with_403(): void
    {
        Sanctum::actingAs(User::where('email', 'public-user@example.com')->firstOrFail());

        $this->getJson('/api/user/all')->assertStatus(403);
    }

    public function test_admin_and_public_user_can_reach_admin_endpoint(): void
    {
        Sanctum::actingAs(User::where('email', 'admin-and-public@example.com')->firstOrFail());

        $this->getJson('/api/user/all')->assertOk();
    }

    public function test_public_user_can_still_reach_own_profile_endpoint(): void
    {
        // /api/me/* is NOT gated by admin.access — current-user actions are
        // context-neutral. A public-user must be able to read their own profile.
        Sanctum::actingAs(User::where('email', 'public-user@example.com')->firstOrFail());

        $this->getJson('/api/me/profile')->assertOk();
    }
}
