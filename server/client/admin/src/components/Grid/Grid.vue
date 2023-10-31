<script setup lang="ts">
  import { PropType } from 'vue';
  import { GridDirection } from "./types";
  import './Grid.scss';

  const props = defineProps({
    direction: {
      type: String as PropType<GridDirection>,
    },
    isRoot: {
      type: Boolean,
      default: false
    }
  })
</script>
<template>
  <div class="kt-grid" :class="{
    [`kt-grid--${direction}`]: direction,
    'kt-grid--root': isRoot
  }">
    <slot />
  </div>
</template>
