<script setup lang="ts">
  import { ref, useSlots, computed } from "vue";
  import { PAGE_WRAPPER_SLOTS } from "./constants";
  import type { PageWrapperSlot } from "./types";
  import { useBEMBuilder } from "@/helpers";

  import "./PageWrapper.scss";

  const slots = useSlots();
  const hasSubheaderSlot = computed(() => {
    return Object.keys(slots).some((slot) =>
      Object.values(PAGE_WRAPPER_SLOTS).includes(slot as PageWrapperSlot),
    );
  });

  const [block, element] = useBEMBuilder(
    "page-wrapper",
    ref({
      "sidebar-minimized": true,
    }),
  );
</script>
<template>
  <div :class="block">
    <div v-if="hasSubheaderSlot" :class="element('subheader').value">
      <div :class="element('subheader-main').value">
        <slot :name="PAGE_WRAPPER_SLOTS.subheaderMain" />
      </div>
      <div :class="element('subheader-toolbox').value">
        <slot :name="PAGE_WRAPPER_SLOTS.subheaderToolbox" />
      </div>
    </div>
    <div :class="element('content').value">
      <slot></slot>
    </div>
  </div>
</template>
