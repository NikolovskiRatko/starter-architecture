<script setup lang="ts">
import { provide, computed } from "vue";
import MenuItem from "../MenuItem/MenuItem.vue";
import MenuSection from "../MenuSection/MenuSection.vue";
import type { NavMenuDataInterface } from "./types";
import type { MenuTheme, MenuType } from "../types";
import { isMenuMinimizedKey, menuThemeKey, menuTypeKey } from "../constants";
import { MENU_THEME, MENU_TYPE } from "../../../constants";
import "./NavMenu.scss";

interface NavMenuProps {
  data: NavMenuDataInterface;
  theme?: MenuTheme;
  type: MenuType;
  isMinimized: boolean;
}

const {
  data,
  type,
  theme = MENU_THEME.classic,
  isMinimized = false
} = defineProps<NavMenuProps>();

provide(menuTypeKey, type);
provide(menuThemeKey, theme);
provide(isMenuMinimizedKey, computed(() => isMinimized));
</script>
<template>
  <ul
    :class="[
      'kt-menu__nav',
      `kt-menu__nav--${type}`,
      'kt-menu--layout-default',
      {
        'kt-menu__nav--minimized': isMinimized
      }
    ]"
  >
    <MenuSection v-if="type === MENU_TYPE.vertical" />
    <MenuItem
      v-for="navMenuItem in data.items"
      :key="`${navMenuItem.label}-menu-item`"
      :item="navMenuItem"
      :is-top-level-item="true"
      :style="data.listStyle"
    />
  </ul>
</template>
