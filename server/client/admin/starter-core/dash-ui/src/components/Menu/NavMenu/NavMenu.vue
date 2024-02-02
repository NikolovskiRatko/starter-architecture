<script setup lang="ts">
import { provide, toRefs, type PropType } from "vue";
import MenuItem from "../MenuItem/MenuItem.vue";
import MenuSection from "../MenuSection/MenuSection.vue";
import type { NavMenuDataInterface } from "./types";
import type { MenuTheme, MenuType } from "../types";
import { isMenuMinimizedKey, menuThemeKey, menuTypeKey } from "../constants";
import "./NavMenu.scss";

const props = defineProps({
  data: {
    type: Object as PropType<NavMenuDataInterface>,
    required: true,
  },
  theme: {
    type: String as PropType<MenuTheme>,
    default: "classic",
  },
  type: {
    type: String as PropType<MenuType>,
    required: true,
  },
  isMinimized: {
    type: Boolean,
    default: false
  }
});
const { isMinimized } = toRefs(props);

provide(menuTypeKey, props.type);
provide(menuThemeKey, props.theme);
provide(isMenuMinimizedKey, isMinimized);
</script>
<template>
  <ul
    :class="[
      'kt-menu__nav',
      `kt-menu__nav--${props.type}`,
      'kt-menu--layout-default',
      {
        'kt-menu__nav--minimized': isMinimized
      }
    ]"
  >
    <MenuSection v-if="props.type === 'vertical'" />
    <MenuItem
      v-for="navMenuItem in data.items"
      :key="`${navMenuItem.label}-menu-item`"
      :item="navMenuItem"
      :is-top-level-item="true"
    />
  </ul>
</template>
