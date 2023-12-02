<script setup lang="ts">
import { PropType, provide, computed } from "vue";
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
    type: String as PropType<ComponentThemes>,
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
      'kt-portlet--bordered': isBordered,
      'kt-portlet--height-fluid': isEqualHeight,
      'kt-portlet--height-fluid-half': isEqualHalfHeight,
      'kt-portlet--sticky-header': hasStickyHeader,
      'kt-portlet--loading': isLoading,
      [`kt-portlet--theme-${theme}`]: theme,
    }"
  >
    <slot></slot>
  </div>
</template>
