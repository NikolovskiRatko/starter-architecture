<script setup lang="ts">
  interface DemoGridProps {
    columns: 2 | 3 | 4 | 5 | 6 | 7 | 8;
  }

  const { columns } = withDefaults(defineProps<DemoGridProps>(), {
    columns: 4,
  });
</script>

<template>
  <div class="demo-grid" :class="[`demo-grid--${columns}-columns`]">
    <slot />
  </div>
</template>

<style scoped lang="scss">
  .demo-grid {
    display: grid;

    @for $i from 1 through 10 {
      &--#{$i}-columns {
        grid-template-columns: repeat($i, minmax(0, 1fr));
        gap: 10px;
      }
    }
  }
</style>
