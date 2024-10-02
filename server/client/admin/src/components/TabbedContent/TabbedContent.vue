<script lang="ts" setup>
  import {
    PortletComponent,
    PortletBody,
    PortletHead,
  } from "@starter-core/dash-ui";
  import type { TabbedContentProps } from "./types";
  import "./TabbedContent.scss";

  const { tabs, isLoading = false } = defineProps<TabbedContentProps>();
</script>
<template>
  <div class="tabbed-content">
    <PortletComponent :is-loading="isLoading">
      <PortletHead size="lg">
        <ul class="tabbed-content__tabs">
          <li v-for="tab in tabs" v-bind:key="tab.id">
            <a href="" class="tabbed-content__tab">
              {{ tab.label }}
            </a>
          </li>
        </ul>
      </PortletHead>
      <PortletBody>
        <div v-for="tab in tabs" v-bind:key="tab.id">
          <component :is="tab.content"></component>
        </div>
      </PortletBody>
    </PortletComponent>
  </div>
</template>
