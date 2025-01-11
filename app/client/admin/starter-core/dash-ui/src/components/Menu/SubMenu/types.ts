import type { MenuItem } from "../types";

export type StickToSide = "right" | "left";

export type MenuListStyle = "dot" | "line" | "icons" | "none";

export type SubmenuItems = MenuItem[];

export interface SubMenu {
  items: SubmenuItems;
  stickToSide: StickToSide;
  listStyle?: MenuListStyle;
  isExpanded?: boolean;
  isMegaMenu?: boolean;
}
