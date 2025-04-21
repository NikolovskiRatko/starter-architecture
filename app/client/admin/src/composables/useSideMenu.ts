import { IconArrowright } from '@starter-core/icons';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { useInitialData, useAuth } from '@/composables';
import { SIDEMENU_ICONS_MAP } from '@/constants';
import { findActiveCategory } from '@/helpers/composables';
import type { NavSubmenuData } from '@/types';
import type { SubMenu, SubmenuItems } from '@starter-core/dash-ui/src/components/Menu/SubMenu/types';
import type { MenuItem, MenuItems } from '@starter-core/dash-ui/src/components/Menu/types';

export default function useSideMenu() {
  const { permissionsArray } = useAuth();
  const { t } = useI18n();
  const { data, isLoading } = useInitialData();
  const route = useRoute();

  const activeRoutes = computed(() => {
    if (isLoading.value || !data.value?.mainMenu) {
      return [];
    }

    return findActiveCategory(data.value.mainMenu, route.name);
  });

  const parseSubmenu = (submenuData?: NavSubmenuData): SubMenu | null => {
    if (!submenuData) {
      return null;
    }

    const items: SubmenuItems = submenuData
      .filter((subitem) => permissionsArray.value.includes(subitem.permission))
      .map(({ label, route }) => ({
        label: t(label),
        route: {
          name: route,
        },
        isActive: activeRoutes.value.includes(route),
        icon: SIDEMENU_ICONS_MAP[route] ?? IconArrowright,
      }));

    return {
      listStyle: 'dot',
      stickToSide: 'left',
      items,
    };
  };

  return computed<MenuItems>(() => {
    if (isLoading.value || !data.value?.mainMenu) {
      return [];
    }

    const filteredItems = data.value.mainMenu.filter((menuItem) => permissionsArray.value.includes(menuItem.permission));

    return filteredItems.map(({ label, route, submenu }) => {
      const item: MenuItem = {
        label: t(label),
        route: {
          name: route,
        },
        icon: SIDEMENU_ICONS_MAP[route] ?? IconArrowright,
        isActive: activeRoutes.value.includes(route),
        submenu: parseSubmenu(submenu),
      };

      return item;
    });
  });
}
