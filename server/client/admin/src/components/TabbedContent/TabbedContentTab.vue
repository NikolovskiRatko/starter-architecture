<script lang="ts" setup>
  import { onBeforeMount } from "vue";
  import { AddTabKey } from "./constants";
  import type { TabbedContentTabProps } from "./types";
  import { injectStrict } from "@/helpers";

  const { label, id } = defineProps<TabbedContentTabProps>();
  const addTab = injectStrict(AddTabKey);

  onBeforeMount(() => {
    addTab({ label, id });
  });
</script>
<template>
  <slot></slot>
</template>
