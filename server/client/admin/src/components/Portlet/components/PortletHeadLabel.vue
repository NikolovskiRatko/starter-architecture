<script setup lang="ts">
  import { inject } from 'vue';
  import { briefcaseIcon } from '@/data/navMenu';
  import { portletThemeKey } from '../types';

  import './PortletHeadLabel.scss';

  const svgIcon = briefcaseIcon;

  const props = defineProps({
    hasIcon: {
      default: false,
    },
  })
  const theme = inject(portletThemeKey);
</script>

<template>
  <div class="kt-portlet__head__label">
    <span v-if="hasIcon"
          v-html="svgIcon"
          class="kt-portlet__head__label__icon"
          :class="{
            [`kt-portlet__head__label__icon--theme-${theme}`]: theme
          }" />
    <h3 class="kt-portlet__head__label__title"
        :class="{
          [`kt-portlet__head__label__title--theme-${theme}`]: theme
        }">
      <slot></slot>
    </h3>
  </div>
</template>
