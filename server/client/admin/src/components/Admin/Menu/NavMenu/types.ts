import { MenuTheme } from '@/components/Admin/Menu/types';
import { MenuListStyle } from '@/components/Admin/Menu/SubMenu/types';
import { MenuLink } from '@/components/Admin/Menu/MenuLink/types';

interface NavMenuItems extends Array<MenuLink> { }

export interface NavMenuDataInterface {
  theme: MenuTheme;
  listStyle: MenuListStyle;
  items: NavMenuItems;
}
