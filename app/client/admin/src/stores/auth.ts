import axios from 'axios';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { AuthUser } from '@/modules/users/types';

/**
 * Single source of truth for admin SPA authentication.
 *
 * Replaces the previous @websanova/vue-auth dependency. Holds the current
 * user payload returned by GET /auth/user (legacy UserDTO shape, keeps
 * `permissions_array` and `role` fields existing consumers expect) and
 * derives a `contexts` flag from the new admin.access / public.access
 * permissions so router guards can express access-context requirements.
 */
export const useAuthStore = defineStore('auth', () => {
  const user = ref<AuthUser | null>(null);
  const isInitialised = ref(false);
  const isLoading = ref(false);
  const bearerToken = ref<string | null>(null);

  const isAuthenticated = computed(() => user.value !== null);
  const permissionsArray = computed<string[]>(() => user.value?.permissions_array ?? []);
  const roleId = computed<number | null>(() => user.value?.role ?? null);

  const contexts = computed(() => ({
    admin: permissionsArray.value.includes('admin.access'),
    public: permissionsArray.value.includes('public.access'),
  }));

  function applyBearer(token: string | null): void {
    bearerToken.value = token;
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common.Authorization;
    }
  }

  async function fetchMe(): Promise<AuthUser | null> {
    try {
      const { data } = await axios.get<AuthUser>('/auth/user');
      user.value = data;
      return data;
    } catch {
      user.value = null;
      return null;
    } finally {
      isInitialised.value = true;
    }
  }

  async function login(credentials: { email: string; password: string }): Promise<AuthUser> {
    isLoading.value = true;
    try {
      // Warm up the Sanctum CSRF cookie before posting credentials. Harmless
      // for bearer-token mode; required once the SPA flips to cookie mode.
      await axios.get('/sanctum/csrf-cookie').catch(() => null);

      const response = await axios.post<AuthUser>('/auth/login', credentials);
      const authHeader = response.headers?.authorization ?? response.headers?.Authorization;
      if (typeof authHeader === 'string' && authHeader.length > 0) {
        applyBearer(authHeader);
      }
      const me = await fetchMe();
      if (!me) {
        throw new Error('Login succeeded but /auth/user did not return a user.');
      }
      return me;
    } finally {
      isLoading.value = false;
    }
  }

  async function register(data: { first_name: string; last_name: string; email: string; password: string }): Promise<AuthUser> {
    isLoading.value = true;
    try {
      await axios.get('/sanctum/csrf-cookie').catch(() => null);

      const response = await axios.post<AuthUser>('/auth/sign-up', data);
      const authHeader = response.headers?.authorization ?? response.headers?.Authorization;
      if (typeof authHeader === 'string' && authHeader.length > 0) {
        applyBearer(authHeader);
      }
      const me = await fetchMe();
      if (!me) {
        throw new Error('Sign-up succeeded but /auth/user did not return a user.');
      }
      return me;
    } finally {
      isLoading.value = false;
    }
  }

  async function logout(): Promise<void> {
    try {
      await axios.post('/auth/logout');
    } catch {
      // Server-side logout best-effort; never block client-side state reset.
    }
    user.value = null;
    applyBearer(null);
  }

  return {
    user,
    isInitialised,
    isLoading,
    bearerToken,
    isAuthenticated,
    permissionsArray,
    roleId,
    contexts,
    fetchMe,
    login,
    register,
    logout,
    applyBearer,
  };
});
