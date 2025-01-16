import {
  IconLayout4blocks,
  IconUser,
  IconArrowright,
} from "@starter-core/icons";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useInitialData } from "@/composables";
import useAuthComp from "@/composables/useAuthComp";
import type { NavMenuDataInterface } from "@starter-core/dash-ui/src/components/Menu/NavMenu/types";

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

export default function useSideMenu() {
  const { permissionsArray } = useAuthComp();
  const { t } = useI18n();
  const { data, isLoading } = useInitialData();

  // TODO: Implement legacy logic to new menu
  // const isActiveClass = (input) => {
  //     let path = input.link;
  //     let curPath = this.$route.name;
  //     return path === curPath;
  // }
  // const setInitialExpanded = () => {
  //     const currentRoute = this.$route.name;
  //     const isSubcategoryActive =
  //         this.item.subcategories?.some((menuItem) => {
  //             const firstLevelIsActive = menuItem.link === currentRoute;
  //             if (firstLevelIsActive) {
  //                 return true;
  //             } else {
  //                 return (
  //                     menuItem.subcategories?.some(
  //                         (secondLevelMenuItem) =>
  //                             secondLevelMenuItem.link === currentRoute,
  //                     ) || false
  //                 );
  //             }
  //         }) || false;
  //
  //     this.isExpanded = this.item.expanded || isSubcategoryActive;
  // }

  const mainMenu = computed<NavMenuDataInterface>(() => {
    if (isLoading && !data.value?.mainMenu) {
      return [];
    }

    return {
      listStyle: "icons",
      items: data.value.mainMenu
        .filter((menuItem) =>
          permissionsArray.value.includes(menuItem.permission),
        )
        .map(({ label, link, subcategories }) => ({
          label: t(label),
          route: {
            name: link,
          },
          icon: getItemIcon(link),
          ...(subcategories && {
            submenu: {
              listStyle: "dot",
              stickToSide: "left",
              items: subcategories
                .filter((subitem) =>
                  permissionsArray.value.includes(subitem.permission),
                )
                .map(({ label, link }) => ({
                  label: t(label),
                  route: {
                    name: link,
                  },
                  icon: getItemIcon(link),
                })),
            },
          }),
        })),
    };
  });

  return {
    mainMenu,
  };
}
