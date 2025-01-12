<script setup lang="ts">
  import { BadgeComponent } from "@starter-core/dash-ui/src";

  const { isDisabled } = defineProps<{ isDisabled: boolean }>();
</script>
<template>
  <span>
    <BadgeComponent
      :theme="isDisabled ? 'danger' : 'success'"
      is-inline
      is-pill
    >
      {{
        isDisabled ? $t("users.status.disabled") : $t("users.status.enabled")
      }}
    </BadgeComponent>
  </span>
</template>
