<?php

/*
|--------------------------------------------------------------------------
| Cross-Origin Resource Sharing (CORS) Configuration
|--------------------------------------------------------------------------
|
| `supports_credentials` is enabled so browser SPAs (admin + Nuxt) can
| participate in Sanctum cookie-based auth. Because credentials are
| enabled, `allowed_origins` MUST be an explicit allowlist — wildcards are
| rejected by browsers in credentialed mode.
|
| Origins are derived from the `APP_URL` (admin SPA + Laravel) and
| `NUXT_URL` env vars by default. `CORS_EXTRA_ORIGINS` allows additional
| comma-separated origins (e.g. staging URLs) without code changes.
|
*/

$defaultOrigins = array_filter([
    env('APP_URL', 'http://starter.test'),
    env('NUXT_URL', 'http://starter.test:3030'),
]);

$extraOrigins = array_filter(array_map('trim', explode(',', (string) env('CORS_EXTRA_ORIGINS', ''))));

return [

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    'allowed_origins' => array_values(array_unique(array_merge($defaultOrigins, $extraOrigins))),

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => ['Authorization'],

    'max_age' => 0,

    'supports_credentials' => true,

];
