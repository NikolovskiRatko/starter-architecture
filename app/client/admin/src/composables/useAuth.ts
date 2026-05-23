import { storeToRefs } from 'pinia';
import { computed, reactive, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import type { AuthUser } from '@/modules/users/types';
import { useAuthStore } from '@/stores/auth';
import type { SignUpQuery, UseAuthLoginParams } from '@/types';

/**
 * Thin compatibility shim over the new Pinia auth store. Preserves the
 * pre-existing public surface (login/logout/register/fetch/refresh/
 * refreshUserData/isLoading/user/avatar/permissionsArray) so call sites
 * across the SPA don't need to be touched.
 *
 * `user` is exposed as a reactive proxy object (not a Ref) so existing
 * consumers that read `user.first_name` directly in <script setup>
 * (e.g. UserProfileWidget) keep working without `.value` plumbing.
 */
export default function useAuth() {
  const store = useAuthStore();
  const router = useRouter();
  const { isLoading, permissionsArray } = storeToRefs(store);

  const user = reactive<Partial<AuthUser>>({});
  watchEffect(() => {
    Object.keys(user).forEach((key) => {
      delete user[key as keyof AuthUser];
    });
    if (store.user) {
      Object.assign(user, store.user);
    }
  });

  function login(params: UseAuthLoginParams): Promise<AuthUser> {
    const { email, password } = params.data;
    return store.login({ email, password });
  }

  function register(data: SignUpQuery): Promise<AuthUser> {
    return store.register(data).then(async (me) => {
      await router.push('/admin/dashboard');
      return me;
    });
  }

  async function logout(): Promise<void> {
    await store.logout();
    await router.push({ name: 'login' });
  }

  function fetch(): Promise<AuthUser | null> {
    return store.fetchMe();
  }

  function refreshUserData(): void {
    void store.fetchMe();
  }

  function refresh(): Promise<AuthUser | null> {
    return store.fetchMe();
  }

  const avatar = computed(() => store.user?.avatar_thumbnail ?? null);

  return {
    fetch,
    refresh,
    login,
    register,
    logout,
    refreshUserData,
    isLoading,
    user,
    avatar,
    permissionsArray,
  };
}
