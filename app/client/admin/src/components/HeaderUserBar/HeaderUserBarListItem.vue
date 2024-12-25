<script lang="ts" setup>
  import { computed, type VueElement } from "vue";
  import type { RouterLinkProps } from "vue-router";

  interface HeaderUserBarListItemProps {
    icon?: VueElement;
    title: string;
    subtitle: string;
    to: string | RouterLinkProps;
  }

  const { title, subtitle } = defineProps<HeaderUserBarListItemProps>();

  const isExternalLink = computed(() => {
    return typeof to === "string" && to.startsWith("http");
  });
</script>
<template>
  <component
    :is="isExternalLink ? 'a' : 'router-link'"
    v-bind="isExternalLink ? { href: to } : { to }"
    class="kt-notification__item"
  >
    <div class="kt-notification__item-icon">
      <component :is="icon"></component>
    </div>
    <div class="kt-notification__item-details">
      <div class="kt-notification__item-title kt-font-bold">
        {{ title }}
      </div>
      <div class="kt-notification__item-time">
        {{ subtitle }}
      </div>
    </div>
  </component>
</template>
