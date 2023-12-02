<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "DashboardDatatable",
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
  },
});
</script>

<template>
  <table class="table is-bordered data-table">
    <thead>
      <tr>
        <th
          v-for="column in columns"
          :key="column.name"
          :style="'width:' + column.width + ';'"
          :class="{ sortable: column.sortable }"
        >
          {{ $t(column.label) }}
        </th>
      </tr>
    </thead>
    <slot />
  </table>
</template>
