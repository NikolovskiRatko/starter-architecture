import { useAuth as useAuthWebsanova } from '@websanova/vue-auth/src/v3.js';
import type { AxiosResponse, AxiosError } from 'axios';
import { computed, ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { getAPIErrorMessage } from '@/helpers';
import type { AuthUser } from '@/modules/users/types';
import type { SignUpQuery, UseAuthLoginParams } from '@/types';

export default function useAuth() {
  const auth = useAuthWebsanova();
  const router = useRouter();
  const isLoading = ref(false);

  const user = reactive<AuthUser>(auth.user());
  const permissionsArray = computed<Array<string>>(() => user.permissions_array);

  async function fetch(): Promise<AuthUser> {
    const updatedUser: AxiosResponse<AuthUser> = await auth.fetch();
    Object.assign(user, updatedUser.data);

    return updatedUser.data;
  }

  function refreshUserData(): void {
    fetch().then((newUserData) => {
      Object.assign(user, newUserData);
    });
  }

  async function refresh(): Promise<any> {
    return auth.refresh();
  }

  function login(params: UseAuthLoginParams): Promise<AuthUser> {
    const { data, remember, staySignedIn } = params;
    isLoading.value = true;

    return new Promise((resolve, reject) => {
      auth
        .login({
          data,
          remember,
          staySignedIn,
        })
        .then((response: AxiosResponse<AuthUser>) => {
          if (response.status === 200) {
            const { first_name, last_name } = response.data;

            if (remember) {
              auth.remember(
                JSON.stringify({
                  name: `${first_name} ${last_name}`,
                })
              );
            }

            resolve(response.data);
          }
        })
        .catch((error: AxiosError) => {
          reject(getAPIErrorMessage(error));
        })
        .finally(() => {
          isLoading.value = false;
        });
    });
  }

  function register(data: SignUpQuery): Promise<AuthUser> {
    isLoading.value = true;

    return new Promise((resolve, reject) => {
      auth
        .register({ data })
        .then((response: AxiosResponse<AuthUser>) => {
          const token = response.headers?.authorization;
          auth.token(token);
          auth.fetch().then(() => {
            router.push('/admin/dashboard');
            resolve(response.data);
          });
        })
        .catch((error: AxiosError) => {
          reject(getAPIErrorMessage(error));
        })
        .finally(() => {
          isLoading.value = false;
        });
    });
  }

  function logout() {
    return auth.logout({
      redirect: {
        name: 'login',
      },
    });
  }

  const avatar = computed(() => {
    if (user?.avatar_thumbnail) {
      return user.avatar_thumbnail;
    }

    return null;
  });

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
