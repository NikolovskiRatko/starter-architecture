<script setup lang="ts">
  import { computed } from "vue";
  import { RouterLink } from "vue-router";
  import type { DashLinkProps } from './types';
  import DashButton from '../Button/DashButton.vue';

  const { to, ...props } = defineProps<DashLinkProps>();

  const isExternalLink = computed(() => {
    return typeof to === 'string' && to.startsWith('http');
  });
</script>
<template>
  <dash-button
      v-if="isExternalLink"
      v-bind="props"
      :class="className"
      :href="to as string"
  >
    <slot />
  </dash-button>
  <router-link
    v-else
    :to="to"
    v-slot="{ navigate }"
  >
    <dash-button v-bind="props" @click="navigate">
      <slot />
    </dash-button>
  </router-link>
</template>
