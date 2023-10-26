import { createRouter, createWebHistory, Router } from 'vue-router'

import HomeView from '@/pages/Homepage/HomeView.vue'
import LoginView from '@/pages/Auth/LoginView.vue'

const routes = [
  {
    path: "/",
    name: "home",
    component: LoginView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: HomeView,
    meta: {
      auth: true,
    },
  }
];

const history = createWebHistory()
const router: Router = createRouter({
  history,
  routes
})

export default router