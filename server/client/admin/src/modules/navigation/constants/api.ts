export const NAVIGATIONS_QUERY_KEY = "navigations";
export const NAVIGATION_QUERY_KEY = "navigation";
export const NAVIGATION_MENUS_QUERY_KEY = "navigation-menus";
export const NAVIGATION_MENU_QUERY_KEY = "navigation-menu";

export const NAVIGATION_MENU_API_ENDPOINTS = {
  getAll: "navigation-menu/all",
  get: (id: number) => `navigation-menu/${id}`,
  create: "navigation-menu/create",
} as const;

export const NAVIGATION_MENU_ITEM_API_ENDPOINTS = {
  create: "navigation-menu-item/create",
  delete: (id: number) => `navigation-menu-item/${id}`,
  reorder: (menuId: number) => `navigation-menu-item/${menuId}/reorder`,
} as const;

export const NAVIGATION_API_ENDPOINTS = {
  get: (id: number) => `navigation/${id}`,
  create: "navigation/create",
} as const;
