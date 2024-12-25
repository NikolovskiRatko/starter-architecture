<script setup lang="ts">
  import { computed, ref } from "vue";
  import { useUserRoles } from "../composables";
  import type { UserRoleId } from "../types";
  import { useBEMBuilder } from "@/helpers";

  const { userRoleId } = defineProps<{ userRoleId: UserRoleId }>();
  const { isLoading: isFetchingRoles, data: roles } = useUserRoles();

  const [block] = useBEMBuilder(
    "kt-badge",
    ref({
      danger: userRoleId === 1,
      success: userRoleId === 2,
      primary: userRoleId >= 3,
      inline: true,
      pill: true,
    }),
  );

  const userRole = computed(() => {
    if (isFetchingRoles.value || !roles.value) {
      return "User";
    }

    return roles.value.find((role) => role.id === userRoleId)?.name ?? "User";
  });
</script>
<template>
  <span>
    <span :style="{ textTransform: 'capitalize' }" :class="block">{{
      userRole
    }}</span>
  </span>
</template>
