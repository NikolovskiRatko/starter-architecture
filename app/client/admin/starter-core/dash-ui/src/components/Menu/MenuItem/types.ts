import type { MenuItem } from '../types';
import type { MenuListStyle } from '../SubMenu/types';

export interface MenuItemProps {
  item: MenuItem;
  style?: MenuListStyle;
  isTopLevelItem?: boolean;
  isActive?: boolean;
  level?: number;
}
