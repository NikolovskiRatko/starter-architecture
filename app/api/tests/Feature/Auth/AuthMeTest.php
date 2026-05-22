<?php

namespace Tests\Feature\Auth;

use App\Applications\User\Model\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class AuthMeTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
    }

    public function test_unauthenticated_request_returns_401(): void
    {
        $this->getJson('/api/auth/me')->assertStatus(401);
    }

    public function test_admin_user_has_both_admin_and_public_contexts(): void
    {
        Sanctum::actingAs(User::where('email', 'admin@example.com')->firstOrFail());

        $response = $this->getJson('/api/auth/me');

        $response->assertOk();
        $response->assertJsonPath('email', 'admin@example.com');
        $response->assertJsonPath('contexts.admin', true);
        $response->assertJsonPath('contexts.public', true);
        $response->assertJsonStructure([
            'id',
            'email',
            'first_name',
            'last_name',
            'avatar_url',
            'avatar_thumbnail',
            'roles',
            'permissions',
            'contexts' => ['admin', 'public'],
            'token_type',
        ]);
    }

    public function test_editor_user_has_admin_context_only(): void
    {
        Sanctum::actingAs(User::where('email', 'editor@example.com')->firstOrFail());

        $response = $this->getJson('/api/auth/me');

        $response->assertOk();
        $response->assertJsonPath('contexts.admin', true);
        $response->assertJsonPath('contexts.public', false);
    }

    public function test_collaborator_user_has_admin_context_only(): void
    {
        Sanctum::actingAs(User::where('email', 'collaborator@example.com')->firstOrFail());

        $response = $this->getJson('/api/auth/me');

        $response->assertOk();
        $response->assertJsonPath('contexts.admin', true);
        $response->assertJsonPath('contexts.public', false);
    }

    public function test_public_user_has_public_context_only(): void
    {
        Sanctum::actingAs(User::where('email', 'public-user@example.com')->firstOrFail());

        $response = $this->getJson('/api/auth/me');

        $response->assertOk();
        $response->assertJsonPath('contexts.admin', false);
        $response->assertJsonPath('contexts.public', true);
    }

    public function test_admin_and_public_user_has_both_contexts(): void
    {
        Sanctum::actingAs(User::where('email', 'admin-and-public@example.com')->firstOrFail());

        $response = $this->getJson('/api/auth/me');

        $response->assertOk();
        $response->assertJsonPath('contexts.admin', true);
        $response->assertJsonPath('contexts.public', true);
    }

    public function test_super_admin_user_has_both_contexts(): void
    {
        Sanctum::actingAs(User::where('email', 'super-admin@example.com')->firstOrFail());

        $response = $this->getJson('/api/auth/me');

        $response->assertOk();
        $response->assertJsonPath('contexts.admin', true);
        $response->assertJsonPath('contexts.public', true);
    }

    public function test_user_without_roles_has_no_contexts(): void
    {
        $user = User::create([
            'first_name' => 'Roleless',
            'last_name' => 'User',
            'email' => 'roleless@example.com',
            'password' => bcrypt('password'),
        ]);

        Sanctum::actingAs($user);

        $response = $this->getJson('/api/auth/me');

        $response->assertOk();
        $response->assertJsonPath('contexts.admin', false);
        $response->assertJsonPath('contexts.public', false);
        $response->assertJsonPath('roles', []);
        $response->assertJsonPath('permissions', []);
    }
}
