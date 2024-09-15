<script setup lang="ts">
  import { inject } from "vue";
  import type { TableLoader } from "@/types";
  import "./TableLoader.scss";

  const isVisible = inject("isLoading");
  const { hasNoShadow = false } = defineProps<TableLoader>();
</script>

<template>
  <div v-show="isVisible" class="kt-datatable__loader">
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
