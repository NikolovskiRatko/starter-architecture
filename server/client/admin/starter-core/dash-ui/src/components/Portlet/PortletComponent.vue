<script setup lang="ts">
import { provide, computed } from "vue";
import type { PropType } from "vue";
import { portletIsLoadingKey, portletThemeKey } from "./types";

import "./PortletComponent.scss";

const props = defineProps({
  isBordered: {
    default: false,
  },
  isUnpadded: {
    default: false,
  },
  theme: {
    type: String as PropType<DashUIComponentThemes>,
    required: false,
  },
  isEqualHeight: {
    default: false,
  },
  isEqualHalfHeight: {
    default: false,
  },
  hasStickyHeader: {
    default: false,
  },
  isLoading: {
    default: false,
  },
});

provide("isUnpadded", props.isUnpadded);
provide("hasStickyHeader", props.hasStickyHeader);
provide(portletThemeKey, props.theme);
provide(
  portletIsLoadingKey,
  computed(() => props.isLoading),
);

const headClassed = {
  hasNoBorder: false,
};
</script>

<template>
  <div
    class="kt-portlet kt-portlet--mobile"
    :class="{
      'kt-portlet--bordered': props.isBordered,
      'kt-portlet--height-fluid': props.isEqualHeight,
      'kt-portlet--height-fluid-half': props.isEqualHalfHeight,
      'kt-portlet--sticky-header': props.hasStickyHeader,
      'kt-portlet--loading': props.isLoading,
      [`kt-portlet--theme-${props.theme}`]: props.theme,
    }"
  >
    <slot></slot>
  </div>
</template>
