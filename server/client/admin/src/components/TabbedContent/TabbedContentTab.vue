<script lang="ts" setup>
  import { onBeforeMount } from "vue";
  import { AddTabKey, ActiveTabIdKey } from "./constants";
  import type { TabbedContentTabProps } from "./types";
  import { injectStrict } from "@/helpers";

  const { label, id } = defineProps<TabbedContentTabProps>();
  const addTab = injectStrict(AddTabKey);
  const activeTab = injectStrict(ActiveTabIdKey);

  onBeforeMount(() => {
    addTab({ label, id });
  });
</script>
<template>
  <slot v-if="activeTab === id"></slot>
</template>
