<script lang="ts" setup>
  import { useI18n } from "vue-i18n";
  import { useUserPermissionsRoles } from "../composables";
  import { FormDropdown } from "@starter-core/dash-ui/src";

  const { t } = useI18n();

  const { isLoading: isFetchingRoles, data } = useUserPermissionsRoles();
  const role = defineModel("role", { required: true });
</script>
<template>
  <form-dropdown
    v-if="!isFetchingRoles"
    v-model="role"
    id="role"
    :options="data?.roles"
    :label="t('users.roles.label')"
    is-inline
  />
</template>
