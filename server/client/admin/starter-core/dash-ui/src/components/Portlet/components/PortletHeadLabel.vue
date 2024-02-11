<script setup lang="ts">
  import { inject, type VueElement } from "vue";
  import { portletThemeKey } from "../constants";
  import "./PortletHeadLabel.scss";

  interface PortletHeadLabelProps {
    icon?: VueElement;
  }

  const { icon } = defineProps<PortletHeadLabelProps>();
  const theme = inject(portletThemeKey);
</script>

<template>
  <div class="kt-portlet__head__label">
    <span
      v-if="icon"
      class="kt-portlet__head__label__icon"
      :class="{
        [`kt-portlet__head__label__icon--theme-${theme}`]: theme,
      }"
    >
      <component :is="icon"></component>
    </span>
    <h3
      class="kt-portlet__head__label__title"
      :class="{
        [`kt-portlet__head__label__title--theme-${theme}`]: theme,
      }"
    >
      <slot></slot>
    </h3>
  </div>
</template>
