# Authentication & Access Architecture

This document describes how `starter-architecture` authenticates users and
authorises access across three clients: the Laravel API, the Vue admin SPA,
and the Nuxt public frontend. It also covers how to add new gated routes on
each layer and how to extend the model for future clients (mobile, CLI).

> Status: **stable** as of the `ai/auth-access-architecture` work
> (Phases 2–5). The previous `@websanova/vue-auth` plugin is removed.

## 1. Mental model in one paragraph

There is **one identity** (a `User` row) and **one authoritative permission
set** per user (Spatie roles → permissions). Two **access contexts** —
`admin` and `public` — define which client a user is allowed to sign into.
A user can hold either, both, or neither. The contexts are themselves just
permissions: `admin.access` for the admin SPA, `public.access` for the
Nuxt frontend. Browser clients authenticate via Sanctum SPA cookies;
non-browser clients (future mobile, CLI) use Sanctum personal access
tokens with abilities. The same `/api/auth/me` endpoint serves every
client and exposes identity, roles, permissions, contexts, and token type.

## 2. Roles and permissions

Roles (Spatie, seeded by `RolesAndPermissionsSeeder` through
`database/seeders/DatabaseSeeder.php`):

| Role | Holds | Notes |
| --- | --- | --- |
| `super-admin` | every permission | Bootstrap / emergency account. |
| `admin` | admin + public (cross-context) | Default operator role. |
| `editor` | admin only, subset of admin capabilities | No `public.access`. |
| `collaborator` | admin only, minimal capabilities | No `public.access`. |
| `public-user` | public only | Public dashboard user. |

Permissions are defined in `app/api/app/Constants/UserPermissions.php` and
mapped to roles in `app/api/app/Constants/RolePermissionsMap.php`. The
access-context gates (`admin.access`, `public.access`) are the load-bearing
ones — every middleware in `routes/admin/*` and `routes/public/*` checks
exactly one of them.

## 3. Transport modes

| Mode | Used by | How | Implementation |
| --- | --- | --- | --- |
| Sanctum **SPA cookie** | Admin SPA, Nuxt frontend | `withCredentials` + `XSRF-TOKEN` cookie | `config/cors.php` `supports_credentials: true`; `config/sanctum.php` `stateful` allowlist |
| Sanctum **Personal Access Token** | Future mobile/CLI; current admin SPA fallback | `Authorization: Bearer …` header | `LoginController::login()` mints a token via `createToken('api-token')` and returns it in the response `Authorization` header |

Both modes coexist. Browser clients get a cookie session AND a bearer
token on `POST /api/auth/login`; they use whichever is convenient. Mobile
clients use the bearer token exclusively.

## 4. Seeded accounts

Created by `make migrate_seed`. All passwords are `password`.

| Email | Roles | Sign in to admin SPA? | Sign in to Nuxt dashboard? |
| --- | --- | --- | --- |
| `super-admin@example.com` | super-admin | Yes (full) | Yes |
| `admin@example.com` | admin | Yes | Yes (cross-context) |
| `editor@example.com` | editor | Yes (limited UI) | No (403) |
| `collaborator@example.com` | collaborator | Yes (minimal UI) | No (403) |
| `public-user@example.com` | public-user | No (403) | Yes |
| `admin-and-public@example.com` | admin + public-user | Yes | Yes |

Plus 100 faker users with one random role.

## 5. API route layout

```
/api/auth/csrf-cookie         — proxied by Sanctum, no auth, no permission
/api/auth/login               — guest, accepts {email, password}
/api/auth/sign-up             — guest, creates a public-user
/api/auth/logout              — auth:sanctum
/api/auth/me                  — auth:sanctum, returns AuthMeDTO
/api/auth/refresh             — auth:sanctum, mints a new bearer token
/api/auth/user                — auth:sanctum, LEGACY shape; kept until Phase 6

/api/me/profile               — auth:sanctum (context-neutral current-user)
/api/me/password              — auth:sanctum

/api/admin/users/*            — auth:sanctum + permission:admin.access
/api/admin/navigation/*       — auth:sanctum + permission:admin.access

/api/public/dashboard         — auth:sanctum + permission:public.access

/api/public-content/*         — unauthenticated content for Nuxt menus
/api/nuxt/*                   — DEPRECATED alias of /api/public-content/*
/api/user/*                   — LEGACY alias of /api/admin/users/*
/api/navigations/*            — LEGACY alias of /api/admin/navigation/*
```

The legacy aliases stay alive until the admin SPA's `USER_API_ENDPOINTS`
constants are migrated to the new prefixes (separate task).

## 6. The `/api/auth/me` response

```json
{
  "id": 1,
  "email": "admin@example.com",
  "first_name": "Admin",
  "last_name": "Doe",
  "avatar_url": null,
  "avatar_thumbnail": null,
  "roles": ["admin"],
  "permissions": ["admin.access", "public.access", "read_users", ...],
  "contexts": { "admin": true, "public": true },
  "token_type": "sanctum-pat"
}
```

Implementation: `app/api/app/Applications/Auth/DTO/AuthMeDTO.php`,
returned by `LoginController::me()`. `token_type` is `sanctum-pat` when the
request carried a bearer token, `cookie` when it carried a session
cookie — detected via `request()->user()->currentAccessToken()`.

## 7. Adding a new gated route — backend

1. Create the route file under the right group: `routes/admin/*.php` for
   admin-context routes, `routes/public/*.php` for public-context ones.
   The parent group in `routes/api.php` already wires the right
   middleware:
   ```php
   Route::prefix('admin')
       ->middleware(['auth:sanctum', 'permission:admin.access'])
       ->group(function () { require base_path('routes/admin/users.php'); });
   ```
2. Add a feature test under `tests/Feature/Auth/` exercising at least:
   unauthenticated → 401, wrong context → 403, right context → 200.
   See `tests/Feature/Auth/CrossContextTest.php` for the pattern.
3. (Optional) If you need finer-grained gating, add a
   `permission:<your.permission>` middleware to the inner route:
   ```php
   Route::post('users/create', [UserController::class, 'create'])
       ->middleware('permission:admin.users.create');
   ```

## 8. Adding a new gated route — admin SPA

1. Add the route definition to the relevant `modules/*/routes/index.ts`.
2. Use the existing `meta.auth` shape — the explicit `router.beforeEach`
   in `src/router/index.ts` interprets it:
   ```ts
   meta: {
     auth: true,                          // any authenticated user
     // OR
     auth: { roles: ['admin.users.view'] },// at least one of these perms
   }
   ```
3. In components, gate UI via `useCan()`:
   ```ts
   const { hasPermission, hasContext } = useCan();
   // <button v-if="hasPermission('admin.users.delete')">…
   ```
4. Pinia auth store: `src/stores/auth.ts` is the single source of truth.
   Don't read the user from anywhere else.

## 9. Adding a new gated page — Nuxt frontend

1. Create the page under `pages/`.
2. Declare its access requirements with `definePageMeta`:
   ```ts
   definePageMeta({
     requireContext: 'public',                // ← most common
     // OR
     requireAuth: true,                       // ← any authenticated user
     // OR
     requirePermissions: ['public.dashboard.view'],
   });
   ```
3. Use `useApi()` to talk to the Laravel API. It forwards the SSR
   request's cookie header so the page renders authenticated on first
   paint.
4. The global middleware (`middleware/auth.global.ts`) initialises the
   store, gates the route, and redirects unauthenticated visitors to
   `/login?redirect=<original>`. No per-page middleware required.

## 10. Environment variables

Required (or recommended) keys in `app/api/.env`:

| Var | Example | Purpose |
| --- | --- | --- |
| `APP_URL` | `http://starter.test` | Used by CORS + Sanctum stateful defaults. |
| `NUXT_URL` | `http://starter.test:3030` | Adds the Nuxt host to CORS + stateful defaults. |
| `SANCTUM_STATEFUL_DOMAINS` | `starter.test,starter.test:3030,localhost` | Override the auto-derived list. Schemes (e.g. `http://`) are stripped defensively, but use bare hostnames. |
| `SESSION_DOMAIN` | `.starter.test` | Leading dot enables cookie sharing across subdomains. |
| `CORS_EXTRA_ORIGINS` | `https://staging.example.com` | Additional CORS origins beyond APP_URL + NUXT_URL. |

Required keys in `app/client/public/.env` (or shell env when running
`npm run dev`):

| Var | Example | Purpose |
| --- | --- | --- |
| `NUXT_PUBLIC_API_BASE` | `http://starter.test/api` | Base URL used by `useApi()`. |
| `NUXT_PUBLIC_SANCTUM_BASE` | `http://starter.test` | Used by `useApi().csrfCookie()` to fire `GET /sanctum/csrf-cookie`. |

The committed `.env.build` template carries safe defaults.

## 11. Adding mobile / CLI clients (future)

Sanctum's bearer-token mode already covers this — no architecture changes
needed. Recommended approach for mobile:

1. App calls `POST /api/auth/login` with credentials.
2. Server response carries the bearer token in the `Authorization`
   header.
3. App stores the token securely (iOS Keychain, Android Keystore).
4. App sends `Authorization: Bearer <token>` on every subsequent
   request.
5. Configure token abilities at mint time:
   `$user->createToken('mobile', ['mobile', 'read'])`. Middleware can
   then enforce `abilities:mobile,read` on specific routes.

`/api/auth/me` returns `token_type: 'sanctum-pat'` in this mode so the
client knows which transport it's using.

## 12. Test strategy

| Suite | File | Purpose |
| --- | --- | --- |
| AuthMe | `tests/Feature/Auth/AuthMeTest.php` | `/api/auth/me` payload shape per role combination |
| AccessGate | `tests/Feature/Auth/AccessGateTest.php` | Permission-gated route behaviour for /api/user/* |
| RouteReorganisation | `tests/Feature/Auth/RouteReorganisationTest.php` | New /api/admin/* + /api/public/* prefixes; legacy aliases still work |
| CsrfFlow | `tests/Feature/Auth/CsrfFlowTest.php` | `/sanctum/csrf-cookie`, CORS config, stateful parsing |
| CrossContext | `tests/Feature/Auth/CrossContextTest.php` | End-to-end admin/public combinations |

All tests use `RefreshDatabase` + `$this->seed()` and reset Spatie's
permission cache in `setUp()` so role assignments are honoured per test.

## 13. Known follow-ups

- Permission strings still mix legacy (`read_users`) and namespaced
  (`admin.access`) styles. A separate task should rename the legacy
  strings to `admin.users.view`, `admin.navigation.view`, etc., in a
  coordinated API + SPA + DB cutover.
- Forgot-password / password-reset flow is not wired (Laravel's defaults
  are in `config/auth.php` but no UI consumes them).
- Email verification is not wired (the User model doesn't `implement
  MustVerifyEmail`).
- The SPA `useUserCheck` still falls back to a hardcoded
  `ROLE_NAME_TO_ID` map for legacy `checkUser('roles', name)` calls. Once
  callers migrate to permission checks (preferred), the map can go.

## 14. References

- Architecture analysis (with problem catalogue and design rationale):
  `projects/starter-architecture/tasks/auth-access-architecture/ANALYSIS.md`
  in the ai-harness repo.
- Implementation prompt (re-feedable to a fresh session):
  `projects/starter-architecture/tasks/auth-access-architecture/AUTH_REFACTOR_IMPLEMENTATION_PROMPT.md`.
- Laravel Sanctum docs: <https://laravel.com/docs/11.x/sanctum>.
- Spatie Permission docs: <https://spatie.be/docs/laravel-permission>.
