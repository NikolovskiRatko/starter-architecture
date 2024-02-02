import type { SubMenu } from "../SubMenu/types";

export type BadgeType = {
  theme: string;
  label: string;
};

export interface MenuItem {
  label: string;
  route: string;
  icon?: string;
  badge?: BadgeType;
  submenu?: SubMenu;
}
