import { useAuth as useAuthWebsanova } from "@websanova/vue-auth/src/v3.js";
import type { AxiosResponse, AxiosError } from "axios";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { getAPIErrorMessage } from "@/helpers";
import { AuthUser } from "@/modules/users/types";
import type { SignUpQuery, UseAuthLoginParams } from "@/types";

export default function useAuth() {
  const auth = useAuthWebsanova();
  const router = useRouter();
  const isLoading = ref(false);

  const user = computed<AuthUser>(() => auth.user());
  const permissionsArray = computed<Array<string>>(
    () => user.value.permissions_array,
  );

  function fetch(data) {
    return auth.fetch(data);
  }

  function refresh(data) {
    return auth.refresh(data);
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
                }),
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
            router.push("/admin/dashboard");
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
        name: "login",
      },
    });
  }

  return {
    fetch,
    refresh,
    login,
    register,
    logout,
    isLoading,
    user,
    permissionsArray,
  };
}
