<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\PermissionRegistrar;
use Tests\TestCase;

/**
 * Phase 2 sub-slice C — verifies the building blocks of the Sanctum
 * SPA-cookie flow are wired:
 *   1. /sanctum/csrf-cookie endpoint is reachable and Set-Cookies XSRF-TOKEN
 *   2. CORS config exposes credentials + explicit origin allowlist
 *   3. SANCTUM_STATEFUL_DOMAINS is parsed cleanly even if env values
 *      contain a scheme (e.g. `http://starter.test`)
 *
 * Full browser cookie round-trip is exercised manually; phpunit covers the
 * configuration contract here.
 */
class CsrfFlowTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->app->make(PermissionRegistrar::class)->forgetCachedPermissions();
        $this->seed();
    }

    public function test_sanctum_csrf_cookie_endpoint_returns_204_with_xsrf_token(): void
    {
        $response = $this->get('/sanctum/csrf-cookie');

        $response->assertNoContent();
        $this->assertNotNull(
            $response->headers->getCookies(),
            'Expected Set-Cookie headers on /sanctum/csrf-cookie response.'
        );

        $cookieNames = collect($response->headers->getCookies())->map->getName()->all();
        $this->assertContains('XSRF-TOKEN', $cookieNames, 'Expected XSRF-TOKEN cookie.');
    }

    public function test_cors_config_supports_credentials_with_explicit_origins(): void
    {
        $this->assertTrue(config('cors.supports_credentials'), 'CORS must allow credentials for SPA-cookie auth.');

        $origins = config('cors.allowed_origins');
        $this->assertIsArray($origins);
        $this->assertNotContains('*', $origins, 'Wildcard origins are incompatible with credentials.');
        $this->assertNotEmpty($origins, 'Allowed origins list must not be empty when credentials are supported.');
    }

    public function test_cors_exposes_authorization_header(): void
    {
        // Bearer-token clients receive the token in the Authorization header on
        // login. Browsers can only read this header if it's in exposed_headers.
        $this->assertContains('Authorization', config('cors.exposed_headers'));
    }

    public function test_sanctum_stateful_domains_strip_scheme_prefix(): void
    {
        // Defensive parse: even if the env var accidentally contains
        // `http://starter.test`, the resolved config holds just `starter.test`.
        $stateful = config('sanctum.stateful');

        $this->assertIsArray($stateful);
        foreach ($stateful as $entry) {
            $this->assertDoesNotMatchRegularExpression(
                '#^https?://#',
                $entry,
                "Stateful entry [{$entry}] must not include a scheme."
            );
        }
    }
}
