<script setup lang="ts">
  import { ContentLoader } from "@starter-core/dash-ui";
  import { useSlots } from "vue";

  import "./AdminSection.scss";

  const slots = useSlots();
  const props = defineProps(["loading", "sticky", "footerAlign"]);
  const hasFooterSlot = () => !!slots.footer;
</script>

<template>
  <div
    class="admin-section card"
    :class="{
      'admin-section--sticky': sticky,
    }"
  >
    <div class="admin-section__header card-header">
      <slot name="header" />
    </div>
    <div class="admin-section__body card-body">
      <ContentLoader
        v-if="loading"
        :height-class="'mh-10'"
        :full-cont="true"
        :transparent="false"
      />
      <slot name="content" />
    </div>
    <div
      v-if="hasFooterSlot()"
      class="admin-section__footer card-footer"
      :class="[footerAlign ? footerAlign : '']"
    >
      <slot name="footer" />
    </div>
  </div>
</template>
