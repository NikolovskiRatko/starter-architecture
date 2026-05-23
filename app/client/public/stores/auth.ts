import { defineStore } from 'pinia';
import type { AuthMe, LoginCredentials, SignUpCredentials } from '~/types/auth';

/**
 * Public-frontend auth store. Mirrors the admin SPA store API while
 * speaking exclusively to the new /api/auth/me payload (AuthMeDTO).
 *
 * Designed to be safe on SSR: `fetchMe()` reads the inbound request
 * cookie via composables/useApi.ts so the first paint already knows
 * whether the visitor is authenticated.
 */
export const useAuthStore = defineStore('auth', () => {
  const user = ref<AuthMe | null>(null);
  const isInitialised = ref(false);
  const isLoading = ref(false);

  const isAuthenticated = computed(() => user.value !== null);
  const permissions = computed<string[]>(() => user.value?.permissions ?? []);
  const roles = computed<string[]>(() => user.value?.roles ?? []);
  const contexts = computed(() => user.value?.contexts ?? { admin: false, public: false });

  async function fetchMe(): Promise<AuthMe | null> {
    const { api } = useApi();
    try {
      const data = await api<AuthMe>('/auth/me');
      user.value = data;
      return data;
    } catch {
      user.value = null;
      return null;
    } finally {
      isInitialised.value = true;
    }
  }

  async function login(credentials: LoginCredentials): Promise<AuthMe> {
    const { api, csrfCookie } = useApi();
    isLoading.value = true;
    try {
      await csrfCookie();
      await api('/auth/login', { method: 'POST', body: credentials });
      const me = await fetchMe();
      if (!me) {
        throw new Error('Login succeeded but /api/auth/me did not return a user.');
      }
      return me;
    } finally {
      isLoading.value = false;
    }
  }

  async function register(data: SignUpCredentials): Promise<AuthMe> {
    const { api, csrfCookie } = useApi();
    isLoading.value = true;
    try {
      await csrfCookie();
      await api('/auth/sign-up', { method: 'POST', body: data });
      const me = await fetchMe();
      if (!me) {
        throw new Error('Sign-up succeeded but /api/auth/me did not return a user.');
      }
      return me;
    } finally {
      isLoading.value = false;
    }
  }

  async function logout(): Promise<void> {
    const { api } = useApi();
    try {
      await api('/auth/logout', { method: 'POST' });
    } catch {
      // Best-effort — never block client-side state reset.
    }
    user.value = null;
  }

  function hasContext(ctx: 'admin' | 'public'): boolean {
    return Boolean(contexts.value?.[ctx]);
  }

  function hasPermission(p: string): boolean {
    return permissions.value.includes(p);
  }

  return {
    user,
    isInitialised,
    isLoading,
    isAuthenticated,
    permissions,
    roles,
    contexts,
    fetchMe,
    login,
    register,
    logout,
    hasContext,
    hasPermission,
  };
});
