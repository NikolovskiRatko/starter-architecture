import type { VueElement } from 'vue';
import type { SubMenu } from "../SubMenu/types";

export type BadgeType = {
  theme: string;
  label: string;
};

export interface MenuItem {
  label: string;
  route: string;
  icon?: VueElement;
  badge?: BadgeType;
  submenu?: SubMenu;
}
