<script setup lang="ts">
  import './KtForm.scss';
  const { className = '' } = defineProps<{ className?: string }>()
</script>
<template>
  <div :class="`kt-form ${className}`">
    <slot />
  </div>
</template>
