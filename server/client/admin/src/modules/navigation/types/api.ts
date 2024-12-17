export interface Navigation {
  id: number;
  title: string;
  slug: string;
  authorized: boolean;
  parent_id: number | null;
  visible: number;
  livedate: string;
  enddate: string | null;
  parent_path: string;
  path: string;
  static: boolean;
}

export type NavigationsResponse = Navigation[];

export interface NavigationMenuItem {
  id: number;
  label: string;
  menu_id: number;
  order: number;
  navigation_id?: number | null;
  external_url?: string | null;
}

export interface NavigationMenu {
  id: number;
  name: string;
  description: string | null;
  items: NavigationMenuItem[];
}

export type NavigationMenus = NavigationMenu[];

export interface NavigationMenuQuery {
  name: string;
  description?: string;
}

export interface NavigationMenuResult extends NavigationMenuQuery {
  id: number;
}

export interface NavigationMenuItemQuery {
  menu_id: number;
  label: string;
  navigation_id?: number;
  external_url?: string;
}

export type NavigationQuery = Pick<
  Navigation,
  "title" | "slug" | "parent_id" | "visible"
>;

export interface NavigationDeleteResult {
  success: boolean;
}

export interface ReorderNavigationItemQuery {
  menuId: number;
  item_id: number;
  order: number;
}
