import {
  IconLayout4blocks,
  IconUser,
  IconArrowright,
} from "@starter-core/icons";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, type RouteLocationNormalizedLoaded } from "vue-router";
import { useInitialData } from "@/composables";
import useAuthComp from "@/composables/useAuthComp";
import { NavSubmenuData } from "@/types";
import type {
  SubMenu,
  SubmenuItems,
} from "@starter-core/dash-ui/src/components/Menu/SubMenu/types";
import type {
  MenuItem,
  MenuItems,
} from "@starter-core/dash-ui/src/components/Menu/types";

const getItemIcon = (link: string) => {
  switch (link) {
    case "dashboard":
      return IconLayout4blocks;
    case "users":
      return IconUser;
    default:
      return IconArrowright;
  }
};

function findActiveCategory(
  categories: NavSubmenuData,
  routeName: RouteLocationNormalizedLoaded["name"],
  activePath: string[] = [],
) {
  for (const category of categories) {
    if (category.route === routeName) {
      activePath.push(category.route);
      return activePath;
    }

    if (category.submenu) {
      return findActiveCategory(category.submenu, routeName, activePath);
    }
  }

  return activePath;
}

export default function useSideMenu() {
  const { permissionsArray } = useAuthComp();
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
        icon: getItemIcon(route),
      }));

    return {
      listStyle: "dot",
      stickToSide: "left",
      items,
    };
  };

  return computed<MenuItems>(() => {
    if (isLoading.value || !data.value?.mainMenu) {
      return [];
    }

    const filteredItems = data.value.mainMenu.filter((menuItem) =>
      permissionsArray.value.includes(menuItem.permission),
    );

    return filteredItems.map(({ label, route, submenu }) => {
      const item: MenuItem = {
        label: t(label),
        route: {
          name: route,
        },
        icon: getItemIcon(route),
        isActive: activeRoutes.value.includes(route),
        submenu: parseSubmenu(submenu),
      };

      return item;
    });
  });
}
