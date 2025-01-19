<script setup lang="ts">
import { inject } from "vue";
import MenuItem from "../MenuItem/MenuItem.vue";
import MegaMenu from "../MegaMenu/MegaMenu.vue";
import type { MenuListStyle, StickToSide, SubmenuItems } from "./types";
import { menuTypeKey, menuThemeKey } from "../constants";

import "./SubMenu.scss";

interface SubMenuProps {
  items: SubmenuItems;
  style?: MenuListStyle;
  stickToSide?: StickToSide;
  level?: number;
  isVisible?: boolean;
  isMegaMenu?: boolean;
}

const {
  items,
  stickToSide = "left",
  level = 1,
  isMegaMenu,
  isVisible,
  style
} = defineProps<SubMenuProps>();

const menuType = inject(menuTypeKey);
const menuTheme = inject(menuThemeKey);
</script>

<template>
  <div
    :class="[
      'kt-menu__submenu',
      `kt-menu__submenu--${menuType}`,
      `kt-menu__submenu--${menuTheme}`,
      `kt-menu__submenu--${stickToSide}`,
      {
        'kt-menu__submenu--visible': isVisible,
      },
    ]"
  >
    <ul v-if="isMegaMenu" :class="['kt-menu__subnav', `kt-menu__subnav--${menuType}`]">
      <MegaMenu />
    </ul>
    <ul v-else :class="['kt-menu__subnav', `kt-menu__subnav--${menuType}`]">
      <MenuItem
          v-for="item in items"
          :key="item.label"
          :item="item"
          :level="level + 1"
          :style="style"
          :is-active="item.isActive"
      />
    </ul>
  </div>
</template>
