import type { RouteRecordRaw } from 'vue-router';

const Login = () =>
  import(
    /* webpackChunkName: "login" */
    /* webpackPrefetch: true */
    '@/pages/Auth/LoginPage.vue'
  );

const SignUp = () =>
  import(
    /* webpackChunkName: "login" */
    /* webpackPrefetch: true */
    '@/pages/Auth/SignUpPage.vue'
  );

export const authPaths: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: Login,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: SignUp,
  },
];
