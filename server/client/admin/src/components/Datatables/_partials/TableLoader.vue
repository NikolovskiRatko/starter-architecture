<script setup lang="ts">
  import { inject } from "vue";

  const isVisible = inject('isLoading');
  const props = defineProps({
    hasNoShadow: {
      type: Boolean,
      default: false
    }
  });

  import './TableLoader.scss';
</script>

<template>
  <div
    v-show="isVisible"
    class="kt-datatable__loader"
  >
    <div
      class="kt-datatable__loader__message"
      :class="{
        'kt-datatable__loader__message--no-shadow': hasNoShadow
      }"
    >
      Loading
      <i class="fa fa-spinner" />
    </div>
  </div>
</template>
