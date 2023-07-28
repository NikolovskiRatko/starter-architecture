import { RouteConfig } from 'vue-router'

import BaseAuth from '../pages/Auth/BaseAuth.vue'
import Login from '../pages/Auth/Login.vue'

export const authPaths: RouteConfig = {
  path: '/',
  component: BaseAuth,
  children: [
    {
      path: 'login',
      name: 'auth.login',
      component: Login,
    },
  ]
}
