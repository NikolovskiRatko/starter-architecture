<script lang="ts" setup>
  import { onBeforeMount, ref } from "vue";
  import {
    AddAccordionKey,
    ActiveAccordionIdKey,
    SetActiveAccordionKey,
  } from "./constants";
  import type { AccordionItemProps } from "./types";
  import { injectStrict, useBEMBuilder } from "../../helpers";
  import "./AccordionItem.scss";

  const [block, element] = useBEMBuilder("accordion-item");
  const { label, id, icon } = defineProps<AccordionItemProps>();
  const addAccordion = injectStrict(AddAccordionKey);
  const setActiveAccordion = injectStrict(SetActiveAccordionKey);
  const activeTab = injectStrict(ActiveAccordionIdKey);

  onBeforeMount(() => {
    addAccordion({ label, id });
  });
</script>
<template>
  <div :class="block">
    <div :class="element('header').value">
      <a
        href=""
        @click.prevent="setActiveAccordion(id)"
        :class="
          element(
            'title',
            ref({
              active: activeTab === id,
            }),
          ).value
        "
      >
        <span v-if="!!icon" :class="element('icon').value">
          <component :is="icon"></component>
        </span>
        {{ label }}
      </a>
    </div>
    <div
      :class="
        element(
          'content',
          ref({
            active: activeTab === id,
          }),
        ).value
      "
    >
      <slot></slot>
    </div>
  </div>
</template>
