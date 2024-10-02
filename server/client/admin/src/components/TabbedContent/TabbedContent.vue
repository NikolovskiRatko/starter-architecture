<script lang="ts" setup>
  import {
    PortletComponent,
    PortletBody,
    PortletHead,
  } from "@starter-core/dash-ui";
  import { provide, reactive } from "vue";
  import { AddTabKey } from "./constants";
  import type { TabbedContentProps, TabbedContentTab } from "./types";
  import "./TabbedContent.scss";

  const { isLoading = false } = defineProps<TabbedContentProps>();
  const tabs: TabbedContentTab[] = reactive([]);

  provide(AddTabKey, (tab) => {
    tabs.push(tab);
  });
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
        <slot></slot>
      </PortletBody>
    </PortletComponent>
  </div>
</template>
