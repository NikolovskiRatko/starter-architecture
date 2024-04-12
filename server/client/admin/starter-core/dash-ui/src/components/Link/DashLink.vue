<script setup lang="ts">
  import { computed } from "vue";
  import { RouterLink } from "vue-router";
  import type { DashLinkProps } from './types';
  import DashButton from '../Button/DashButton.vue';

  const props = withDefaults(defineProps<DashLinkProps>(), {
    to: ""
  });

  const isExternalLink = computed(() => {
    return typeof props.to === 'string' && props.to.startsWith('http');
  });
</script>
<template>
  <dash-button
      v-if="isExternalLink"
      v-bind="props"
      :class="className"
      :href="props.to as string"
  >
    <slot />
  </dash-button>
  <router-link
    v-else
    :to="props.to"
    v-slot="{ navigate }"
  >
    <dash-button v-bind="props" @click="navigate">
      <slot />
    </dash-button>
  </router-link>
</template>
