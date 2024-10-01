import type { ModulesRoutesData } from "@/types/routes";

const USERS_ROUTES = {
  main: 'main',
  add: 'add',
  edit: 'edit',
  myProfile: 'myProfile'
} as const;

type UsersRoutes = typeof USERS_ROUTES[keyof typeof USERS_ROUTES];

export const USER_ROUTES_DATA: ModulesRoutesData<UsersRoutes> = {
  main: {
    path: "users",
    name: "users"
  },
  add: {
    path: "user/add",
    name: "add.user",
    translationKey: "users.add"
  },
  edit: {
    path: "user/:userId",
    name: "edit.user",
    translationKey: "users.edit_user"
  },
  myProfile: {
    path: "myprofile",
    name: "myprofile",
    translationKey: "strings.myprofile"
  }
}
