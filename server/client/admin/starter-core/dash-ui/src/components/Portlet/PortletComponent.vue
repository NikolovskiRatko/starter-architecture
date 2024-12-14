<script setup lang="ts">
import { provide, computed } from "vue";
import { portletIsLoadingKey, portletThemeKey } from "./constants";

import "./PortletComponent.scss";

interface PortletComponentProps {
  isBordered?: boolean;
  isUnpadded?: boolean;
  theme?: DashUIComponentThemes;
  isEqualHeight?: boolean;
  isEqualHalfHeight?: boolean;
  hasStickyHeader?: boolean;
  isLoading?: boolean;
}

const props = defineProps<PortletComponentProps>();

provide("isUnpadded", props.isUnpadded);
provide("hasStickyHeader", props.hasStickyHeader);
provide(portletThemeKey, props.theme);
provide(
  portletIsLoadingKey,
  computed(() => props.isLoading),
);

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
