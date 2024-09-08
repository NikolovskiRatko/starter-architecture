import type { VueElement } from "vue";
import type { RouteLocation } from 'vue-router';
import type { SubMenu } from "@/components/Menu/SubMenu/types";
import type { BadgeType } from "@/components/Menu/MenuLink/types";

export type MenuTheme = "classic";
export type MenuType = "horizontal" | "vertical";

export interface MenuItem {
  label: string;
  route: string | RouteLocation;
  icon?: VueElement;
  badge?: BadgeType;
  submenu?: SubMenu;
}
