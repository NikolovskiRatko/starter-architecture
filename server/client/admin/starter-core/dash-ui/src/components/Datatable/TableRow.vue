<script setup lang="ts">
  import { inject, ref, provide, computed } from "vue";
  import type { TableSections } from "./types";
  import "./TableRow.scss";

  interface TableRowProps {
    section?: TableSections,
    isEven?: boolean;
  }

  const { isEven = false, section = "body" } = defineProps<TableRowProps>();

  provide("isEvenRow", computed(() => isEven));

  const isHovering = ref(false);
  const isLoading = inject("isLoading");
  const toggleHover = () => {
    isHovering.value = !isHovering.value;
  };
</script>

<template>
  <tr
    class="kt-datatable__row"
    :class="[
      `kt-datatable__row--${section}`,
      {
        'kt-datatable__row--hover': isHovering,
        'kt-datatable__row--loaded': !isLoading,
      },
    ]"
    @mouseover="toggleHover"
    @mouseout="toggleHover"
  >
    <slot />
  </tr>
</template>
