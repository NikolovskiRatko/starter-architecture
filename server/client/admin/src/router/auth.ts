import type { RouteRecordRaw } from "vue-router";

// Layouts
const AuthBase = () =>
  import(
    /* webpackChunkName: "auth-base" */
    /* webpackPrefetch: true */
    "@/layouts/Auth/AuthBase.vue"
  );

// Pages
const Login = () =>
  import(
    /* webpackChunkName: "login" */
    /* webpackPrefetch: true */
    "@/pages/Auth/LoginPage.vue"
  );

export const authPaths: RouteRecordRaw = {
  path: "/",
  component: AuthBase,
  children: [
    {
      path: "",
      name: "home",
      component: Login,
    },
    {
      path: "login",
      name: "login",
      component: Login,
    },
  ],
};
