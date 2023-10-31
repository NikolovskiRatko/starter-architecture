<script setup lang="ts">
  import { computed } from 'vue';
  import { RouterLink } from "vue-router";
  import type { SkLinkProps } from './types';

  const props = withDefaults(defineProps<SkLinkProps>(), {
    class: ''
  });

  const isExternal = computed(() => {
    return typeof props.to === 'string' && props.to.startsWith('http')
  })
</script>
<template>
  <a v-if="isExternal" :href="props.to" :class="props.class">
    <slot />
  </a>
  <RouterLink v-else v-bind="props">
    <slot />
  </RouterLink>
</template>
