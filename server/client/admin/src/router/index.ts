import { createRouter, createWebHistory, Router } from 'vue-router'

import HomeView from '../pages/Homepage/HomeView.vue'

import { authPaths } from './auth'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  authPaths,
];

const history = createWebHistory()
const router: Router = createRouter({
  history,
  routes
})

export default router