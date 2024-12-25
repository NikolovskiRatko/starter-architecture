<script setup lang="ts">
import { inject, type PropType } from "vue";
import MenuItem from "../MenuItem/MenuItem.vue";
import MegaMenu from "../MegaMenu/MegaMenu.vue";
import type { StickToSide, SubmenuItems } from "../SubMenu/types";
import { menuTypeKey, menuThemeKey } from "../constants";
import "./SubMenu.scss";

const props = defineProps({
  stickToSide: {
    type: String as PropType<StickToSide>,
    default: "left",
  },
  items: {
    type: Array as PropType<SubmenuItems>,
    required: true,
  },
  isExpanded: {
    type: Boolean,
    default: false,
  },
  isVisible: {
    type: Boolean,
    default: false,
  },
  isMegaMenu: {
    type: Boolean,
    default: false,
  },
  level: {
    type: Number,
    default: 1
  }
});

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
    <ul v-if="props.isMegaMenu" :class="['kt-menu__subnav', `kt-menu__subnav--${menuType}`]">
      <MegaMenu />
    </ul>
    <ul v-else :class="['kt-menu__subnav', `kt-menu__subnav--${menuType}`]">
      <MenuItem
          v-for="item in items"
          :key="item.label"
          :item="item"
          :level="props.level + 1"
      />
    </ul>
  </div>
</template>
