export interface NavMenuDataItem {
  label: string;
  name: string;
  route: string;
  permission: string;
  submenu?: NavSubmenuData;
}

export type NavSubmenuData = NavMenuDataItem[];

export type NavMenuData = NavMenuDataItem[];
