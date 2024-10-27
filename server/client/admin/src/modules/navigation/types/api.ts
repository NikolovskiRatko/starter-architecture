export interface Navigation {
  id: number;
  title: string;
  slug: string;
  authorized: boolean;
  parent_id: number | null;
  visible: number;
  livedate: string;
  enddate: string | null;
}

export type NavigationsResponse = Navigation[];

export interface NavigationMenu {
  id: number;
  name: string;
  description: string | null;
}

export type NavigationMenus = NavigationMenu[];
