<script setup lang="ts">
  import { inject, PropType, computed } from "vue";
  import { TableSections } from "@/components/Datatables/typings";

  interface TableColumnProps {
    section?: TableSections;
  }

  const { section = "body" } = defineProps<TableColumnProps>();

  const isLoading = inject("isLoading");
  const hasError = inject("hasError");
  const isEvenRow = inject("isEvenRow");

  import "./TableColumn.scss";
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
