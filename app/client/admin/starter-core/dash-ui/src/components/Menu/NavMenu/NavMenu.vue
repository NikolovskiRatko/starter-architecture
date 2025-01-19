<script setup lang="ts">
import { provide, computed } from "vue";
import type { MenuTheme, MenuType } from "../types";
import { isMenuMinimizedKey, menuThemeKey, menuTypeKey } from "../constants";
import { MENU_THEME } from "../../../constants";

import "./NavMenu.scss";

interface NavMenuProps {
  type: MenuType;
  theme?: MenuTheme;
  isMinimized?: boolean;
}

const {
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
    <slot />
  </ul>
</template>
