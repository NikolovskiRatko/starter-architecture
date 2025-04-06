<script setup lang="ts">
  import { computed } from "vue";
  import { useUserPermissionsRoles } from "../composables";
  import type { UserRoleId } from "../types";
  import { BadgeComponent } from "@starter-core/dash-ui/src";

  const { userRoleId } = defineProps<{ userRoleId: UserRoleId }>();
  const { isLoading: isFetchingRoles, data } = useUserPermissionsRoles();

  const badgeTheme = computed(() => {
    switch (userRoleId) {
      case 1:
        return "danger";
      case 2:
        return "success";
      case 3:
        return "primary";
      default:
        return "";
    }
  });

  const userRole = computed(() => {
    if (isFetchingRoles.value || !data.value?.roles) {
      return "User";
    }

    return data.value.roles.find((role) => role.id === userRoleId)?.name ?? "User";
  });
</script>
<template>
  <span>
    <BadgeComponent :theme="badgeTheme" is-inline is-pill>
      {{ userRole }}
    </BadgeComponent>
  </span>
</template>
