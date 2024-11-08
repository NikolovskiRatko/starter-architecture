<script setup lang="ts">
  import type { TableLoader } from "./types";
  import "./TableLoader.scss";

  const { hasNoShadow = false } = defineProps<TableLoader>();
</script>

<template>
  <div class="kt-datatable__loader">
    <div
      class="kt-datatable__loader__message"
      :class="{
        'kt-datatable__loader__message--no-shadow': hasNoShadow,
      }"
    >
      Loading
      <i class="la la-spinner"></i>
    </div>
  </div>
</template>
