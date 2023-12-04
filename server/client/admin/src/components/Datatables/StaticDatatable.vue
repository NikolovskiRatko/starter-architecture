<template>
  <table class="table is-bordered data-table">
    <thead>
      <tr>
        <th
          v-for="column in columns"
          :key="column.name"
          :style="'width:' + column.width + ';'"
        >
          {{ $t(column.label) }}
        </th>
      </tr>
    </thead>
    <slot />
  </table>
</template>

<script lang="ts">
export default {
  props: ["columns"],
};
</script>
