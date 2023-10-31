<script setup lang="ts">
  import { inject } from "vue";
  import { portletThemeKey } from '../types';

  import './PortletFoot.scss';

  const isUnpdaddedPortlet = inject('isUnpadded');
  const theme = inject(portletThemeKey);
</script>

<template>
  <div class="kt-portlet__foot" :class="{
    'kt-portlet__foot--fit': isUnpdaddedPortlet,
    [`kt-portlet__foot--theme-${theme}`]: theme,
  }">
    <slot></slot>
  </div>
</template>
