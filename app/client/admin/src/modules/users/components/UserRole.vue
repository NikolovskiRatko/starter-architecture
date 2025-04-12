<script setup lang="ts">
  import { capitalize } from "lodash";
  import { computed } from "vue";
  import { useUserPermissionsRoles } from "../composables";
  import type { UserRoleId } from "../types";

  const { userRoleId } = defineProps<{ userRoleId: UserRoleId }>();
  const { isLoading: isFetchingRoles, data } = useUserPermissionsRoles();

  const userRole = computed(() => {
    if (isFetchingRoles.value || !data.value?.roles) {
      return "User";
    }

    return (
      data.value.roles.find((role) => role.id === userRoleId)?.name ?? "User"
    );
  });
</script>
<template>
  {{ capitalize(userRole) }}
</template>
