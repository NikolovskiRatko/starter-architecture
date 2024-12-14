import type { VueElement } from "vue";
import type { RouteLocation } from 'vue-router';
import type { SubMenu } from "./SubMenu/types";
import type { BadgeType } from "./MenuLink/types";
import type { MENU_TYPE, MENU_THEME } from "../../constants";

export type MenuTheme = typeof MENU_THEME[keyof typeof MENU_THEME];
export type MenuType = typeof MENU_TYPE[keyof typeof MENU_TYPE];

export interface MenuItem {
  label: string;
  route: string | RouteLocation;
  icon?: VueElement;
  badge?: BadgeType;
  submenu?: SubMenu;
}
