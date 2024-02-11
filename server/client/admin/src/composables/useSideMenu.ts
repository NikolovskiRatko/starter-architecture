import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import useAuthComp from "@/composables/useAuthComp";
import { useRootStore } from "@/store/root";
import type { NavMenuDataInterface } from "@starter-core/dash-ui/dist/components/Menu/NavMenu/types";
import { IconLayout4blocks, IconUser } from "@starter-core/icons";

export default function useSideMenu() {
  const { permissionsArray } = useAuthComp();
  const { t } = useI18n();
  const rootStore = useRootStore();

  const { mainMenu } = storeToRefs(rootStore);

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

  const items = computed<NavMenuDataInterface>(() => {
    if (!mainMenu.value) {
      return [];
    }

    return {
      listStyle: "dot",
      items: mainMenu.value
        .filter((menuItem) =>
          permissionsArray.value.includes(menuItem.permission),
        )
        .map(({ label, link, subcategories }) => ({
          label: t(label),
          route: {
            name: link,
          },
          icon: link === "dashboard" ? IconLayout4blocks : IconUser,
          ...(subcategories && {
            submenu: {
              listStyle: "icons",
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
                })),
            },
          }),
        })),
    };
  });

  return {
    items,
  };
}
