<script lang="ts" setup>
  import { useBEMBuilder } from "@/helpers";
  import "./SubheaderTitle.scss";

  interface SubheaderTitleProps {
    title: string;
    description?: string;
  }

  const [block, element] = useBEMBuilder("subheader-title");

  const { title, description } = defineProps<SubheaderTitleProps>();
</script>
<template>
  <div :class="block">
    <h3 :class="element('title').value">{{ title }}</h3>
    <template v-if="description">
      <span :class="element('separator').value"></span>
      <span :class="element('description').value">{{ description }}</span>
    </template>
  </div>
</template>
