import { createRouter, createWebHistory, Router } from 'vue-router'

import { adminPaths } from './admin';
import { authPaths } from './auth';

const routes =
[
  authPaths,
  adminPaths,
  // {
  //   path: "/:catchAll(.*)",
  //   name: 'errorpage',
  //   component : Error
  // },
];

const history = createWebHistory()
const router: Router = createRouter({
  history,
  routes
})

export default router