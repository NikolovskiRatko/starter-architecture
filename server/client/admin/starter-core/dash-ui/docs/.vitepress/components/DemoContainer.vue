<script setup>
  const props = defineProps({
    backgroundColor: {
      type: String,
      default: '#f6f6f7'
    }
  })
</script>
<template>
  <div class="demo-container" :style="{ backgroundColor }">
    <slot></slot>
  </div>
</template>
