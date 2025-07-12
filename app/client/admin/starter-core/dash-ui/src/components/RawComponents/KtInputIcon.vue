<script setup lang="ts">
import './KtInputIcon.scss';
const { className = '' } = defineProps<{ className?: string }>()
</script>
<template>
  <div :class="`kt-input-icon ${className}`">
    <slot />
  </div>
</template>
