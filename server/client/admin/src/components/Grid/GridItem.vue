<script setup>
  const props = defineProps({
    isFluid: {
      type: Boolean,
      default: false,
    },
    className: {
      type: String,
      default: "",
    },
  });
</script>
<template>
  <div
    class="kt-grid__item"
    :class="[
      className,
      {
        'kt-grid__item--fluid': isFluid,
      },
    ]"
  >
    <slot />
  </div>
</template>
