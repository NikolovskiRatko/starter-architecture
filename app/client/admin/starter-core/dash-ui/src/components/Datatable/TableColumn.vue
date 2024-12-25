<script setup lang="ts">
  import { inject } from "vue";
  import type { TableSections } from "./types";
  import "./TableColumn.scss";

  interface TableColumnProps {
    section?: TableSections;
  }

  const { section = "body" } = defineProps<TableColumnProps>();

  const isLoading = inject("isLoading");
  const hasError = inject("hasError");
  const isEvenRow = inject("isEvenRow");
</script>

<template>
  <td
    class="kt-datatable__cell"
    :class="[
      `kt-datatable__cell--${section}`,
      {
        'kt-datatable__cell--loaded': !isLoading,
        'kt-datatable__cell--error': hasError,
        'kt-datatable__cell--even': isEvenRow,
      },
    ]"
  >
    <slot />
  </td>
</template>
