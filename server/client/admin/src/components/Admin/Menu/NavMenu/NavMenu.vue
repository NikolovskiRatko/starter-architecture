<script setup lang="ts">
import { PropType } from "vue";
import MenuItem from "@/components/Admin/Menu/MenuItem/MenuItem.vue";
import { NavMenuDataInterface } from "./types";

const props = defineProps({
  data: {
    type: Object as PropType<NavMenuDataInterface>,
    required: true,
  },
});
</script>
<template>
  <ul class="kt-menu__nav">
    <MenuItem
      v-for="navMenuItem in data.items"
      :key="`${navMenuItem.label}-menu-item`"
      :item="navMenuItem"
      :theme="data.theme"
      :is-top-level-item="true"
    />
  </ul>
</template>
