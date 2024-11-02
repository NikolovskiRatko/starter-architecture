export const NAVIGATIONS_QUERY_KEY = "navigations";
export const NAVIGATION_MENUS_QUERY_KEY = "navigation-menus";
export const NAVIGATION_MENU_QUERY_KEY = "navigation-menu";

export const NAVIGATION_MENU_API_ENDPOINTS = {
  getAll: "navigation-menu/all",
  get: (id: number) => `navigation-menu/${id}`,
  create: "navigation-menu/create",
};
