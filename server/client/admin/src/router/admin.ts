import { RouteConfig } from 'vue-router'
import { i18n } from '@/plugins/i18n';
const { t } = i18n.global;

// Layouts
import AdminLayout from '@/layouts/Admin/AdminLayout.vue'

// Pages
import Dashboard from '@/pages/Dashboard/Dashboard.vue'
import Users from '@/pages/Users/Users.vue'
import UserForm from '@/pages/Users/UserForm.vue'

// Admin Components
import MyProfile from '@/pages/Admin/MyProfile.vue'
import NotFound from '@/pages/Admin/NotFound.vue'
import Portlets from '@/pages/Components/Portlets.vue'
import Buttons from '@/pages/Components/Buttons.vue'

/*INSERT NEW IMPORTS HERE*/

export let adminPaths: RouteConfig =
//  ADMIN PANEL
{
  path: '/admin',
  component: AdminLayout,
  meta: {
    title: t('strings.home', null),
    auth: {
      roles: ['read_users']
    }
  },
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
    }, {
      path: 'usersadd',
      name: 'add.user',
      component: UserForm,
      meta: {
        title: t('users.add', null),
        auth: {
          roles: ['write_users']
        }
      }
    }, {
      path: 'usersedit/:userId/edit',
      name: 'edit.user',
      component: UserForm,
      meta: {
        title: t('users.edit_user', null),
        auth: {
          roles: ['write_users']
        }
      }
    }, {
      path: 'myprofile',
      name: 'myprofile',
      component: MyProfile,
      meta: {
        title: t('strings.myprofile', null),
        auth: {
          roles: ['read_users']
        }
      }
    },
    {
      path: 'components/portlets',
      name: 'components.portlets',
      component: Portlets,
      meta: {
        title: t('components.portlets.label', null),
        auth: {
          roles: ['read_users'],
          forbiddenRedirect: '/'
        }
      }
    }, {
      path: 'components/buttons',
      name: 'components.buttons',
      component: Buttons,
      meta: {
        title: t('components.portlets.label', null),
        auth: {
          roles: ['read_users'],
          forbiddenRedirect: '/'
        }
      }
    },
    {
      path:  "/:catchAll(.*)",
      name: 'adminnotfound',
      component: NotFound,
      meta: {
        title: t('page.not_found', null),
        auth: {
          roles: ['write_users']
        }
      }
    },
    /*INSERT NEW CONFIGURATOR OPTIONS HERE*/
  ]
};
