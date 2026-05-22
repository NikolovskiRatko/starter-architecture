<?php

namespace Tests\Feature\Auth;

use App\Applications\User\Model\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Spatie\Permission\PermissionRegistrar;
use Tests\TestCase;

/**
 * Phase 2 sub-slice B — verifies the new canonical route prefixes are wired
 * and gated correctly while the legacy prefixes continue to work.
 */
class RouteReorganisationTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->app->make(PermissionRegistrar::class)->forgetCachedPermissions();
        $this->seed();
    }

    // ----- New /api/admin/users/* canonical prefix --------------------------

    public function test_admin_can_reach_new_admin_users_endpoint(): void
    {
        Sanctum::actingAs(User::where('email', 'admin@example.com')->firstOrFail());

        $this->getJson('/api/admin/users/all')->assertOk();
    }

    public function test_public_user_is_rejected_from_new_admin_users_endpoint(): void
    {
        Sanctum::actingAs(User::where('email', 'public-user@example.com')->firstOrFail());

        $this->getJson('/api/admin/users/all')->assertStatus(403);
    }

    public function test_unauthenticated_request_is_rejected_from_new_admin_users_endpoint(): void
    {
        $this->getJson('/api/admin/users/all')->assertStatus(401);
    }

    // ----- Legacy /api/user/* alias still alive -----------------------------

    public function test_legacy_user_alias_still_works_for_admin(): void
    {
        Sanctum::actingAs(User::where('email', 'admin@example.com')->firstOrFail());

        $this->getJson('/api/user/all')->assertOk();
    }

    public function test_legacy_user_alias_still_rejects_public_user(): void
    {
        Sanctum::actingAs(User::where('email', 'public-user@example.com')->firstOrFail());

        $this->getJson('/api/user/all')->assertStatus(403);
    }

    // ----- New /api/public/dashboard ----------------------------------------

    public function test_public_user_can_reach_public_dashboard(): void
    {
        Sanctum::actingAs(User::where('email', 'public-user@example.com')->firstOrFail());

        $this->getJson('/api/public/dashboard')
            ->assertOk()
            ->assertJsonPath('message', 'ok');
    }

    public function test_admin_can_reach_public_dashboard_via_cross_context_grant(): void
    {
        // The admin role has both admin.access AND public.access in this design.
        Sanctum::actingAs(User::where('email', 'admin@example.com')->firstOrFail());

        $this->getJson('/api/public/dashboard')->assertOk();
    }

    public function test_editor_is_rejected_from_public_dashboard(): void
    {
        // Editor only has admin.access, not public.access.
        Sanctum::actingAs(User::where('email', 'editor@example.com')->firstOrFail());

        $this->getJson('/api/public/dashboard')->assertStatus(403);
    }

    public function test_collaborator_is_rejected_from_public_dashboard(): void
    {
        Sanctum::actingAs(User::where('email', 'collaborator@example.com')->firstOrFail());

        $this->getJson('/api/public/dashboard')->assertStatus(403);
    }

    public function test_unauthenticated_request_is_rejected_from_public_dashboard(): void
    {
        $this->getJson('/api/public/dashboard')->assertStatus(401);
    }

    // ----- /api/public-content/* (renamed from /api/nuxt/*) -----------------

    public function test_public_content_endpoint_is_unauthenticated(): void
    {
        // No actingAs(); endpoint should be reachable without a token.
        $this->getJson('/api/public-content/navigation-routes')->assertStatus(200);
    }

    public function test_legacy_nuxt_alias_still_works(): void
    {
        $this->getJson('/api/nuxt/navigation-routes')->assertStatus(200);
    }
}
