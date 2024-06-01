import type { VueElement } from 'vue';
import type { SubMenu } from "../SubMenu/types";

export type BadgeType = {
  theme: string;
  label: string;
};

interface MenuItemRoute {
  name: string;
}

export interface MenuItem {
  label: string;
  route: MenuItemRoute;
  icon?: VueElement;
  badge?: BadgeType;
  submenu?: SubMenu;
}
