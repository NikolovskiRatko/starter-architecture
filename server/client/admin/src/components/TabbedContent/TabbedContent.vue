<script lang="ts" setup>
  import {
    PortletComponent,
    PortletBody,
    PortletHead,
  } from "@starter-core/dash-ui";
  import type { TabbedContentProps } from "./types";

  const { tabs, isLoading = false } = defineProps<TabbedContentProps>();
</script>
<template>
  <PortletComponent :is-loading="isLoading">
    <PortletHead size="lg">
      <ul>
        <li v-for="tab in tabs" v-bind:key="tab.id">
          {{ tab.label }}
        </li>
      </ul>
    </PortletHead>
    <PortletBody>
      <div v-for="tab in tabs" v-bind:key="tab.id">
        <component :is="tab.content"></component>
      </div>
    </PortletBody>
  </PortletComponent>
</template>
