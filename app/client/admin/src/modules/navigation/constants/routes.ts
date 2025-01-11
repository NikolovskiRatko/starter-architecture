import type { ModulesRoutesData } from "@/types/routes";

export const NAVIGATION_ROUTES = {
  main: "main",
  menus: "menus",
  addNavigation: "addNavigation",
  editNavigation: "editNavigation",
} as const;

type UsersRoutes = (typeof NAVIGATION_ROUTES)[keyof typeof NAVIGATION_ROUTES];

export const NAVIGATION_ROUTES_DATA: ModulesRoutesData<UsersRoutes> = {
  main: {
    path: "navigations",
    name: "navigations",
    translationKey: "navigation.main",
  },
  menus: {
    path: "navigations/menus",
    name: "navigations.menus",
    translationKey: "navigation.menu.plural",
  },
  editNavigation: {
    path: "navigation/:navigationId",
    name: "navigation.edit",
    translationKey: "navigation.main",
  },
  addNavigation: {
    path: "navigation/add",
    name: "navigation.add",
    translationKey: "navigation.main",
  },
};
