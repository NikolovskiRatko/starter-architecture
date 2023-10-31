import { RouteConfig } from 'vue-router';

// Layouts
import AdminLayout from '@/layouts/Admin/AdminLayout.vue'

// Pages
import Dashboard from '@/pages/Dashboard/Dashboard.vue'
import Users from '@/pages/Users/Users.vue'

/*INSERT NEW IMPORTS HERE*/

export let adminPaths: RouteConfig =
//  ADMIN PANEL
{
  path: '/admin',
  component: AdminLayout,
  children: [
    {
      path: "dashboard",
      name: "dashboard",
      component: Dashboard,
      meta: {
        auth: true,
      },
    },
    {
      path: "users",
      name: "users",
      component: Users,
      meta: {
        auth: {
          roles: ['read_users']
        }
      },
    },
    /*INSERT NEW CONFIGURATOR OPTIONS HERE*/
  ]
};
