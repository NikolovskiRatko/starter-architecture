<script setup lang="ts">
  import { ref } from "vue";
  import { useBEMBuilder } from "@/helpers";

  const { isDisabled } = defineProps<{ isDisabled: boolean }>();

  const [block] = useBEMBuilder(
    "kt-badge",
    ref({
      danger: isDisabled,
      success: !isDisabled,
      inline: true,
      pill: true,
    }),
  );
</script>
<template>
  <span>
    <span :style="{ textTransform: 'capitalize' }" :class="block">{{
      isDisabled ? $t("users.status.disabled") : $t("users.status.enabled")
    }}</span>
  </span>
</template>
