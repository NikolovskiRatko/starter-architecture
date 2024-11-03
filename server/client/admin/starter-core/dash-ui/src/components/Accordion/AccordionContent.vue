<script lang="ts" setup>
  import { provide, reactive, ref, type Ref, onMounted } from "vue";
  import {
    AddAccordionKey,
    ActiveAccordionIdKey,
    SetActiveAccordionKey,
  } from "./constants";
  import type { AccordionContentProps, AccordionItem } from "./types";
  import { useBEMBuilder } from "../../helpers";
  import "./AccordionContent.scss";

  const [block, element] = useBEMBuilder("accordion-content");

  const { isLoading = false } = defineProps<AccordionContentProps>();
  const accordions: AccordionItem[] = reactive([]);
  const activeAccordion: Ref<string> = ref("");

  provide(AddAccordionKey, (accordion) => {
    accordions.push(accordion);
  });

  provide(SetActiveAccordionKey, (id) => {
    activeAccordion.value = id;
  });

  provide(ActiveAccordionIdKey, activeAccordion);

  onMounted(() => {
    activeAccordion.value = accordions[0].id;
  });
</script>
<template>
  <div :class="block">
    <slot></slot>
  </div>
</template>
