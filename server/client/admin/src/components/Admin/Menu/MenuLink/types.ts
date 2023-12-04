import { SubMenu } from "@/components/Admin/Menu/SubMenu/types";

export type BadgeType = {
  theme: string;
  label: string;
};

export interface MenuLink {
  label: string;
  route?: string;
  icon?: string;
  badge?: BadgeType;
  submenu?: SubMenu;
}
