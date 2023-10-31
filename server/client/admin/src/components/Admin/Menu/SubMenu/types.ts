import { MenuLink } from '@/components/Admin/Menu/MenuLink/types';

export type StickToSide = 'right' | 'left';

export type MenuListStyle = 'dot' | 'line' | 'icons';

export interface SubmenuItems extends Array<MenuLink> {};

export interface SubMenu {
  items: SubmenuItems;
  stickToSide: StickToSide;
  listStyle?: MenuListStyle;
  isExpanded?: Boolean;
}
