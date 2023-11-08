import { RouteConfig } from 'vue-router'

// Layouts
const AuthBase = () => import(
    /* webpackChunkName: "auth-base" */
    /* webpackPrefetch: true */
    '@/layouts/Auth/AuthBase.vue'
    );

// Pages
const Login = () => import(
    /* webpackChunkName: "login" */
    /* webpackPrefetch: true */
    '@/pages/Auth/Login.vue'
    );




export const authPaths: RouteConfig =
//  AUTHENTICATION
{
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
  ]
}