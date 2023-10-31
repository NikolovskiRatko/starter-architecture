<script setup lang="ts">
  import { PropType, inject } from "vue";
  import { PortletHeadSizes } from "@/components/Portlet/types/components";
  import { layoutConfigKey } from '@/views/types/WrapperPage';
  import { portletThemeKey } from '../types';

  import './PortletHead.scss';

  const props = defineProps({
    size: {
      type: String as PropType<PortletHeadSizes>,
      default: 'default',
    }
  })

  const headClassed = {
    hasNoBorder: false
  };

  const isUnpdaddedPortlet = inject('isUnpadded');
  const theme = inject(portletThemeKey);
  const isSticky = inject('hasStickyHeader');
  const layoutConfig = inject(layoutConfigKey);
</script>

<template>
  <div
    class="kt-portlet__head"
    :class="[`kt-portlet__head--${size}-size`,{
        'kt-portlet__head--noborder': headClassed.hasNoBorder,
        'kt-portlet__head--fit': isUnpdaddedPortlet,
        'kt-portlet__head--sticky': isSticky,
        'kt-portlet__head--main-header-fixed': layoutConfig.hasFixedHeader,
        [`kt-portlet__head--theme-${theme}`]: theme,
      }]">
    <slot></slot>
  </div>
</template>
