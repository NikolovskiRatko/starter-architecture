<?php

use Laravel\Sanctum\Sanctum;

return [

    /*
    |--------------------------------------------------------------------------
    | Stateful Domains
    |--------------------------------------------------------------------------
    |
    | Requests from the following domains / hosts will receive stateful API
    | authentication cookies. Entries must be hostnames (optionally with a
    | port) — schemes like `http://` are stripped defensively so an env var
    | of `http://starter.test` keeps working.
    |
    | The default list covers both the admin SPA (served alongside Laravel
    | on APP_URL) and the Nuxt public frontend (NUXT_URL, default
    | `http://starter.test:3030`).
    |
    */

    'stateful' => collect(explode(',', (string) env('SANCTUM_STATEFUL_DOMAINS', sprintf(
        '%s,%s,%s',
        'localhost,localhost:3000,127.0.0.1,127.0.0.1:8000,::1',
        parse_url((string) env('APP_URL', 'http://starter.test'), PHP_URL_HOST) ?: 'starter.test',
        parse_url((string) env('NUXT_URL', 'http://starter.test:3030'), PHP_URL_HOST)
            . (parse_url((string) env('NUXT_URL', 'http://starter.test:3030'), PHP_URL_PORT)
                ? ':' . parse_url((string) env('NUXT_URL', 'http://starter.test:3030'), PHP_URL_PORT)
                : '')
    ))))
        ->map(fn ($entry) => trim($entry))
        ->map(fn ($entry) => preg_replace('#^https?://#', '', $entry))
        ->filter()
        ->values()
        ->all(),

    /*
    |--------------------------------------------------------------------------
    | Sanctum Guards
    |--------------------------------------------------------------------------
    |
    | This array contains the authentication guards that will be checked when
    | Sanctum is trying to authenticate a request. If none of these guards
    | are able to authenticate the request, Sanctum will use the bearer
    | token that's present on an incoming request for authentication.
    |
    */

    'guard' => ['web'],

    /*
    |--------------------------------------------------------------------------
    | Expiration Minutes
    |--------------------------------------------------------------------------
    |
    | This value controls the number of minutes until an issued token will be
    | considered expired. If this value is null, personal access tokens do
    | not expire. This won't tweak the lifetime of first-party sessions.
    |
    */

    'expiration' => null,

    /*
    |--------------------------------------------------------------------------
    | Sanctum Middleware
    |--------------------------------------------------------------------------
    |
    | When authenticating your first-party SPA with Sanctum you may need to
    | customize some of the middleware Sanctum uses while processing the
    | request. You may change the middleware listed below as required.
    |
    */

    'middleware' => [
        'verify_csrf_token' => App\Http\Middleware\VerifyCsrfToken::class,
        'encrypt_cookies' => App\Http\Middleware\EncryptCookies::class,
    ],

];
