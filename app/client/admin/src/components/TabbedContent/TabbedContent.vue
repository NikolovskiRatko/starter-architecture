<script lang="ts" setup>
  import {
    PortletComponent,
    PortletBody,
    PortletHead,
  } from "@starter-core/dash-ui/src";
  import { provide, reactive, ref, type Ref, onMounted } from "vue";
  import { AddTabKey, ActiveTabIdKey } from "./constants";
  import type { TabbedContentProps, TabbedContentTab } from "./types";
  import "./TabbedContent.scss";

  const { isLoading = false } = defineProps<TabbedContentProps>();
  const tabs: TabbedContentTab[] = reactive([]);
  const activeTab: Ref<string> = ref("");

  const onTabClik = (tabId: string) => {
    activeTab.value = tabId;
  };

  provide(AddTabKey, (tab) => {
    tabs.push(tab);
  });

  provide(ActiveTabIdKey, activeTab);

  onMounted(() => {
    activeTab.value = tabs[0].id;
  });
</script>
<template>
  <div class="tabbed-content">
    <PortletComponent :is-loading="isLoading">
      <PortletHead size="lg">
        <ul class="tabbed-content__tabs">
          <li v-for="tab in tabs" v-bind:key="tab.id">
            <a
              href=""
              :class="[
                'tabbed-content__tab',
                {
                  'tabbed-content__tab--active': activeTab === tab.id,
                },
              ]"
              @click.prevent="onTabClik(tab.id)"
            >
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
