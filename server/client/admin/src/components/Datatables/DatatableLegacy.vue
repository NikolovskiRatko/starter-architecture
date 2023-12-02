<script lang="ts">
import { defineComponent } from "vue";

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
          v-if="column.sortable"
          :key="column.name"
          :style="'width:' + column.width + ';'"
        >
          {{ $t(column.label) }}
        </th>
        <th v-else :style="'width:' + column.width + ';'">
          {{ $t(column.label) }}
        </th>
      </tr>
    </thead>
    <slot />
  </table>
</template>
