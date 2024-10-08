<script lang="ts" setup>
  import { inject } from "vue";
  import { menuTypeKey } from "../constants";
  import type { MenuLinkIconProps } from "./types";

  const { isActive, icon } = defineProps<MenuLinkIconProps>();
  const menuType = inject(menuTypeKey);
</script>
<template>
    <span
      v-if="icon"
      :class="[
      'kt-menu__link-icon',
      `kt-menu__link-icon--${menuType}`,
      {
        'kt-menu__link-icon--active': isActive,
      },
    ]"
    >
      <component :is="icon" />
    </span>
</template>
