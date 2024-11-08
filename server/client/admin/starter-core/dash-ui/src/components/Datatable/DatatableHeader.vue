<script setup lang="ts">
  import type { VueElement } from "vue";
  import {
    PortletHead,
    PortletHeadLabel,
    PortletHeadToolbar,
  } from "../Portlet";

  interface DatatableHeaderProps {
    title: string;
    subtitle?: string;
    Icon?: VueElement;
  }

  const { title, subtitle } = defineProps<DatatableHeaderProps>();
</script>

<template>
  <PortletHead :size="'lg'">
    <PortletHeadLabel :icon="Icon">
      {{ title }}
      <small v-if="subtitle">{{ subtitle }}</small>
    </PortletHeadLabel>

    <PortletHeadToolbar>
      <!--TODO: Create custom component with basic function with the HTML above -->
      <!--        <b-dropdown-->
      <!--          id="dropdown-right"-->
      <!--          right-->
      <!--          variant="default"-->
      <!--          toggle-class="btn-icon-sm"-->
      <!--          menu-class="kt-nav"-->
      <!--          class="dropdown-inline"-->
      <!--        >-->
      <!--          <template #button-content>-->
      <!--            <i class="la la-download" /> Export-->
      <!--          </template>-->

      <!--          <b-dropdown-text-->
      <!--            class="kt-nav__section kt-nav__section&#45;&#45;first"-->
      <!--            tag="span"-->
      <!--          >-->
      <!--            Choose an option-->
      <!--          </b-dropdown-text>-->

      <!--          &lt;!&ndash;<b-dropdown-item-button class="kt-nav__section kt-nav__section&#45;&#45;first" button-class="kt-nav__section-text">-->
      <!--            Choose an option-->
      <!--          </b-dropdown-item-button>&ndash;&gt;-->

      <!--          <b-dropdown-item-->
      <!--            href="#"-->
      <!--            class="kt-nav__item"-->
      <!--            :link-class="'kt-nav__link'"-->
      <!--          >-->
      <!--            <i class="kt-nav__link-icon la la-print" />-->
      <!--            <span class="kt-nav__link-text">Print</span>-->
      <!--          </b-dropdown-item>-->

      <!--          <b-dropdown-item-->
      <!--            href="#"-->
      <!--            class="kt-nav__item"-->
      <!--            link-class="kt-nav__link"-->
      <!--          >-->
      <!--            <i class="kt-nav__link-icon la la-copy" />-->
      <!--            <span class="kt-nav__link-text">Copy</span>-->
      <!--          </b-dropdown-item>-->

      <!--          <b-dropdown-item-->
      <!--            href="#"-->
      <!--            class="kt-nav__item"-->
      <!--            link-class="kt-nav__link"-->
      <!--          >-->
      <!--            <i class="kt-nav__link-icon la la-file-excel-o" />-->
      <!--            <span class="kt-nav__link-text">Excel</span>-->
      <!--          </b-dropdown-item>-->
      <!--        </b-dropdown>-->
      <slot />
    </PortletHeadToolbar>
  </PortletHead>
</template>
