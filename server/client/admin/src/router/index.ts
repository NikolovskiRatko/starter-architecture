import { createRouter, createWebHistory, Router } from 'vue-router'
// Layouts
import AdminLayout from '@/layouts/Admin/AdminLayout.vue'

// Pages
import Dashboard from '@/pages/Dashboard/Dashboard.vue'
import Login from '@/pages/Auth/Login.vue'

const routes = [
  //  AUTHENTICATION
  {
    path: "/",
    name: "home",
    component: Login,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  //  ADMIN PANEL
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: Dashboard,
        meta: {
          auth: true,
        },
      }
    ]
  }
];

const history = createWebHistory()
const router: Router = createRouter({
  history,
  routes
})

export default router