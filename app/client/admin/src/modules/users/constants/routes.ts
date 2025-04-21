import { USER_PERMISSIONS } from '@/modules/users/constants';
import type { ModulesRoutesData } from '@/types/routes';

export const USERS_ROUTES = {
  main: 'main',
  add: 'add',
  edit: 'edit',
  myProfile: 'myProfile',
  myProfilePersonalInfo: 'myProfilePersonalInfo',
  myProfileChangePassword: 'myProfileChangePassword',
} as const;

type UsersRoutes = (typeof USERS_ROUTES)[keyof typeof USERS_ROUTES];

export const USER_ROUTES_DATA: ModulesRoutesData<UsersRoutes> = {
  main: {
    path: 'users',
    name: 'users',
    translationKey: 'users',
    authRoles: [USER_PERMISSIONS.readUsers],
  },
  add: {
    path: 'user/add',
    name: 'add.user',
    translationKey: 'users.add',
    authRoles: [USER_PERMISSIONS.writeUsers],
  },
  edit: {
    path: 'user/:userId',
    name: 'edit.user',
    translationKey: 'users.edit_user',
    authRoles: [USER_PERMISSIONS.writeUsers],
  },
  myProfile: {
    path: 'my-profile',
    name: 'my-profile',
    translationKey: 'users.my-profile.label',
    authRoles: true,
  },
  myProfilePersonalInfo: {
    path: 'personal-info',
    name: 'my-profile-personal-info',
    translationKey: 'users.personal-information.label',
    authRoles: true,
  },
  myProfileChangePassword: {
    path: 'change-password',
    name: 'my-profile-change-password',
    translationKey: 'users.my-profile.label',
    authRoles: true,
  },
};
