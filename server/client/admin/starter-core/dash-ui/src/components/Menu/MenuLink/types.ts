import type { VueElement } from 'vue';
import type { RouteLocationRaw } from 'vue-router';
import type { MenuListStyle, SubMenu } from '../SubMenu/types';

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

export interface MenuLinkProps {
  label: string;
  route: RouteLocationRaw;
  icon?: VueElement;
  listStyle?: MenuListStyle | null;
  hasSubmenu?: boolean;
  badge?: BadgeType | null;
  isActive?: boolean;
  isSubmenuLink?: boolean;
  level?: number;
}
