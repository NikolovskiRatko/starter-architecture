import type { RouteLocationNormalizedLoaded } from 'vue-router';
import type { NavSubmenuData } from '@/types';

export function findActiveCategory(
  categories: NavSubmenuData,
  routeName: RouteLocationNormalizedLoaded['name'],
  activePath: string[] = []
) {
  for (const category of categories) {
    if (category.route === routeName) {
      activePath.push(category.route);
      return activePath;
    }

    if (category.submenu) {
      const submenuActiveCategories = findActiveCategory(category.submenu, routeName, activePath);
      if (submenuActiveCategories.length > 0) {
        activePath = [category.route, ...activePath, ...submenuActiveCategories];
        return activePath;
      }
    }
  }

  return activePath;
}
