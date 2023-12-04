<script setup lang="ts">
import { PropType } from "vue";
import MenuItem from "@/components/Admin/Menu/MenuItem/MenuItem.vue";

import { MenuTheme } from "@/components/Admin/Menu/types";
import {
  StickToSide,
  SubmenuItems,
} from "@/components/Admin/Menu/SubMenu/types";

const props = defineProps({
  stickToSide: {
    type: String as PropType<StickToSide>,
    default: "left",
  },
  theme: {
    type: String as PropType<MenuTheme>,
    default: "classic",
  },
  items: {
    type: Array as PropType<SubmenuItems>,
    required: true,
  },
  isExpanded: {
    type: Boolean,
  },
});
</script>

<template>
  <div
    :class="[
      'kt-menu__submenu',
      `kt-menu__submenu--${theme}`,
      `kt-menu__submenu--${stickToSide}`,
    ]"
  >
    <ul class="kt-menu__subnav">
      <MenuItem
        v-for="item in items"
        :key="item.label"
        :item="item"
        :theme="theme"
      />
    </ul>
  </div>
</template>
