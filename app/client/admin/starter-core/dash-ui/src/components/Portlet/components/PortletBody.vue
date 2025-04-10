<script setup lang="ts">
import {inject, ref} from "vue";
import ContentLoader from "../../ContentLoader/ContentLoader.vue";
import type { PortletBodyAlignment } from "../types";
import { portletThemeKey, portletIsLoadingKey } from '../constants'
import { useBEMBuilder } from "../../../helpers";

import "./PortletBody.scss";

interface PortletBodyProps {
  alignment?: PortletBodyAlignment;
  isUnpdadded?: boolean;
  isEqualHeight?: boolean;
  isEqualHalfHeight?: boolean;
  size?: "small" | "medium" | "large";
}

const {
  isEqualHeight, isEqualHalfHeight, size, isUnpdadded, alignment
} = defineProps<PortletBodyProps>();

const isUnpdaddedPortlet = inject("isUnpadded");
const theme = inject(portletThemeKey);
const isLoading = inject(portletIsLoadingKey);

const [block] = useBEMBuilder(
    "kt-portlet__body",
    ref({
      fit: isUnpdadded || isUnpdaddedPortlet,
      'height-fluid': isEqualHeight,
      'height-fluid-half': isEqualHalfHeight,
      loading: isLoading,
      [`theme-${theme}`]: theme,
      [`${alignment}`]: alignment,
      [`${size}`]: size,
    }),
);
</script>

<template>
  <div :class="block">
    <ContentLoader
      v-if="isLoading"
      :full-cont="true"
      :heightClass="'mh-5'"
      :transparent="true"
    />
    <slot></slot>
  </div>
</template>
