import { VueElement } from "vue";
import type { RouteLocation } from "vue-router";
import type { MenuListStyle } from "../SubMenu/types";

export type BadgeType = {
  theme: string;
  label: string;
};

export type MenuLinkProps = {
  label: string;
  route: string | RouteLocation;
  icon?: VueElement | null;
  listStyle: MenuListStyle;
  badge?: BadgeType | null;
  hasSubmenu?: boolean;
  isSubmenuLink?: boolean;
  isActive?: boolean;
  isExpanded?: boolean;
  level?: number;
}

export type MenuLinkIconProps = {
  icon?: VueElement | null;
  isActive?: boolean;
}
