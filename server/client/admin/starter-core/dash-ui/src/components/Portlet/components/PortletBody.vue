<script setup lang="ts">
import { inject, PropType } from "vue";
import { PortletBodyAlignment } from "@/components/Portlet/types";
import ContentLoader from "@/components/ContentLoader/ContentLoader.vue";
import { portletThemeKey, portletIsLoadingKey } from "../types";

import "./PortletBody.scss";

const props = defineProps({
  isUnpdadded: {
    default: false,
  },
  alignment: {
    type: String as PropType<PortletBodyAlignment>,
    required: false,
  },
  isEqualHeight: {
    default: false,
  },
  isEqualHalfHeight: {
    default: false,
  },
});
const isUnpdaddedPortlet = inject("isUnpadded");
const theme = inject(portletThemeKey);
const isLoading = inject(portletIsLoadingKey);
</script>

<template>
  <div
    class="kt-portlet__body"
    :class="{
      'kt-portlet__body--fit': isUnpdadded || isUnpdaddedPortlet,
      'kt-portlet__body--height-fluid': isEqualHeight,
      'kt-portlet__body--height-fluid-half': isEqualHalfHeight,
      'kt-portlet__body--loading': isLoading,
      [`kt-portlet__body--theme-${theme}`]: theme,
      [`kt-portlet__body--${alignment}`]: alignment,
    }"
  >
    <ContentLoader
      v-if="isLoading"
      :full-cont="true"
      :heightClass="'mh-5'"
      :transparent="true"
    />
    <slot></slot>
  </div>
</template>
