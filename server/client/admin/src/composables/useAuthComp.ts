import { computed } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "@websanova/vue-auth/src/v3.js";

export default function useAuthComp() {
  const auth = useAuth();
  const router = useRouter();

  const user = computed(() => auth.user());
  const permissionsArray = computed<Array<string>>(
    () => user.value.permissionsArray,
  );

  function fetch(data) {
    return auth.fetch(data);
  }

  function refresh(data) {
    return auth.refresh(data);
  }

  function login(data): Promise<any> {
    data = data || {};

    return new Promise((resolve, reject) => {
      auth
        .login({
          data: data.data,
          remember: data.remember,
          staySignedIn: data.staySignedIn,
          fetchUser: true,
          redirect: data.redirect,
        })
        .then((response) => {
          if (data.remember) {
            auth.remember(
              JSON.stringify({
                name: response.response.data.user.name,
              }),
            );
          }

          if (response.status === 200) {
            // Redirect to the desired route after successful login
            router.push("/admin/dashboard");
          }

          resolve(response);
        })
        .catch((error) => {
          reject(error?.message);
        });
    });
  }

  function register(data) {
    data = data || {};

    return new Promise((resolve, reject) => {
      auth
        .register({
          url: "auth/register",
          data: data.body,
          autoLogin: false,
        })
        .then((res) => {
          if (data.autoLogin) {
            login(data).then(resolve, reject);
          }
        }, reject);
    });
  }

  function impersonate(data) {
    return auth.impersonate({
      url: "auth/" + data.user.id + "/impersonate",
      redirect: {
        name: "user-account",
      },
    });
  }

  function unimpersonate() {
    return auth.unimpersonate({
      redirect: {
        name: "admin-users",
      },
    });
  }

  function logout() {
    return auth.logout({
      redirect: {
        name: "login",
      },
    });
  }

  function impersonating() {
    return auth.impersonating();
  }

  return {
    fetch,
    refresh,
    login,
    register,
    impersonate,
    unimpersonate,
    logout,
    impersonating,
    user,
    permissionsArray,
  };
}
