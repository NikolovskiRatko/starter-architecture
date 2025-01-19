<script setup lang="ts">
  import { computed, ref, inject } from "vue";
  import { MENU_TYPE, MENU_THEME } from "../../../constants";
  import { useOnClickOutside } from "../../../composables";
  import { useBEMBuilder } from "../../../helpers";
  import MenuLink from "../MenuLink/MenuLink.vue";
  import SubMenu from "../SubMenu/SubMenu.vue";
  import { menuTypeKey, menuThemeKey, isMenuMinimizedKey } from "../constants";
  import type { MenuItemProps } from "./types";

  import "./MenuItem.scss";

  const {
    isTopLevelItem = false,
    isActive = false,
    level = 1,
    style = 'none',
    item
  } = defineProps<MenuItemProps>()

  const isSubmenuVisible = ref(false);
  const menuType = inject(menuTypeKey);
  const menuTheme = inject(menuThemeKey);
  const isMinimized = inject(isMenuMinimizedKey);
  const itemRef = ref();
  const submenu = computed(() => item.submenu ?? null);

  const [block] = useBEMBuilder("kt-menu__item", ref({
    [`${menuType}`]: true,
    [`level-${level}`]: true,
    minimized: isMinimized,
    submenu: submenu.value,
    rel: submenu.value && menuTheme === MENU_THEME.classic,
    hover: submenu.value && isSubmenuVisible,
    'top-level': level === 1,
    'submenu-item': level > 1,
    active: isActive
  }));

  const hasTogglableSubmenu = computed(() => {
    return (menuType === MENU_TYPE.horizontal && submenu && isTopLevelItem)
      || (menuType === MENU_TYPE.vertical && submenu)
  })

  const toggleSubmenu = (visibility?: boolean, delay?: number) => {
    const valueToSet =
      visibility !== undefined ? visibility : !isSubmenuVisible.value;
    if (delay) {
      setTimeout(() => {
        isSubmenuVisible.value = valueToSet;
      }, delay);
    } else {
      isSubmenuVisible.value = valueToSet;
    }
  };

  const menuClickHandler = () => {
    if (hasTogglableSubmenu.value) {
      toggleSubmenu();
    }
  };

  const mouseOverHandler = () => {
    if (submenu && !isTopLevelItem && menuType === MENU_TYPE.horizontal) {
      toggleSubmenu(true);
    }
  };

  const mouseLeaveHandler = () => {
    if (submenu && !isTopLevelItem && menuType === MENU_TYPE.horizontal) {
      toggleSubmenu(false, 300);
    }
  };

  useOnClickOutside(itemRef, () => {
    if (isSubmenuVisible.value && menuType === MENU_TYPE.horizontal) {
      toggleSubmenu(false);
    }
  }, !hasTogglableSubmenu.value);
</script>

<template>
  <li
    :class="block"
    aria-haspopup="true"
    @mouseover="mouseOverHandler"
    @mouseleave="mouseLeaveHandler"
    ref="itemRef"
  >
    <MenuLink
      :route="item.route"
      :icon="item.icon"
      :list-style="style"
      :label="item.label"
      :badge="item.badge"
      :is-active="isActive"
      :has-submenu="!!submenu"
      :is-submenu-link="!isTopLevelItem"
      :level="level"
      :is-expanded="isSubmenuVisible"
      @click="menuClickHandler"
    />
    <SubMenu
      v-if="!!submenu"
      :items="submenu.items"
      :stick-to-side="submenu.stickToSide"
      :is-mega-menu="submenu.isMegaMenu"
      :is-visible="isSubmenuVisible"
      :style="submenu.listStyle"
      :level="level"
    />
  </li>
</template>
