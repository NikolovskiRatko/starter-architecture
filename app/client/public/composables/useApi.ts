import type { $Fetch, FetchOptions } from 'ofetch';

/**
 * Authenticated API client for the Nuxt frontend.
 *
 * Wraps Nuxt's $fetch with:
 *   - `credentials: 'include'` so the Sanctum session cookie flows
 *     (browser and SSR).
 *   - `baseURL` resolved from runtime config (`NUXT_PUBLIC_API_BASE`).
 *   - On SSR, the inbound request's `cookie` header is forwarded so the
 *     dashboard renders authenticated on first paint.
 *   - `Accept: application/json` so Laravel returns JSON 401s instead of
 *     HTML redirects.
 *
 * Pair with `useApi().csrfCookie()` before any state-changing request to
 * warm up the XSRF-TOKEN cookie. Once a cookie is present, ofetch reads
 * it automatically and adds the `X-XSRF-TOKEN` header on the next call.
 */
export function useApi() {
  const config = useRuntimeConfig();
  const requestHeaders = import.meta.server ? useRequestHeaders(['cookie']) : {};
  const cookieToken = useCookie('XSRF-TOKEN');

  const buildHeaders = (extra: Record<string, string> = {}): Record<string, string> => {
    const headers: Record<string, string> = {
      Accept: 'application/json',
      ...extra,
    };
    if (import.meta.server && requestHeaders.cookie) {
      headers.cookie = requestHeaders.cookie;
    }
    if (cookieToken.value && !headers['X-XSRF-TOKEN']) {
      headers['X-XSRF-TOKEN'] = decodeURIComponent(cookieToken.value);
    }
    return headers;
  };

  const api: $Fetch = $fetch.create({
    baseURL: config.public.apiBase as string,
    credentials: 'include',
    onRequest({ options }) {
      options.headers = {
        ...(options.headers as Record<string, string> | undefined),
        ...buildHeaders(options.headers as Record<string, string> | undefined),
      };
    },
  });

  const csrfCookie = async (): Promise<void> => {
    // The Sanctum CSRF endpoint lives on the Laravel root, not under /api.
    await $fetch(`${config.public.sanctumBase}/sanctum/csrf-cookie`, {
      credentials: 'include',
      headers: buildHeaders(),
    }).catch(() => {
      // First call may 419 in some configurations; the cookie is still set.
    });
  };

  return {
    api,
    csrfCookie,
    request: <T>(path: string, opts: FetchOptions = {}) => api<T>(path, opts),
  };
}
