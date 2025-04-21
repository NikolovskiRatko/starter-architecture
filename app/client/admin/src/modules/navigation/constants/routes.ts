import { USER_PERMISSIONS } from '@/modules/users/constants';
import type { ModulesRoutesData } from '@/types/routes';

export const NAVIGATION_ROUTES = {
  main: 'main',
  menus: 'menus',
  menu: 'menu',
  addNavigation: 'addNavigation',
  editNavigation: 'editNavigation',
} as const;

type UsersRoutes = (typeof NAVIGATION_ROUTES)[keyof typeof NAVIGATION_ROUTES];

export const NAVIGATION_ROUTES_DATA: ModulesRoutesData<UsersRoutes> = {
  main: {
    path: 'navigations',
    name: 'navigations',
    translationKey: 'navigation.main',
    authRoles: [USER_PERMISSIONS.readNavigation],
  },
  menus: {
    path: 'navigations/menus',
    name: 'navigations.menus',
    translationKey: 'navigation.menu.plural',
    authRoles: [USER_PERMISSIONS.readNavigation],
  },
  menu: {
    path: 'navigations/menu/:menuId',
    name: 'navigations.menu',
    translationKey: 'navigation.menu.main',
    authRoles: [USER_PERMISSIONS.writeNavigation],
  },
  editNavigation: {
    path: 'navigation/:navigationId',
    name: 'navigation.edit',
    translationKey: 'navigation.main',
    authRoles: [USER_PERMISSIONS.writeNavigation],
  },
  addNavigation: {
    path: 'navigation/add',
    name: 'navigation.add',
    translationKey: 'navigation.main',
    authRoles: [USER_PERMISSIONS.writeNavigation],
  },
};
