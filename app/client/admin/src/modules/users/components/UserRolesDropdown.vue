<script lang="ts" setup>
  import { capitalize } from "lodash";
  import { computed } from "vue";
  import { useI18n } from "vue-i18n";
  import { useUserPermissionsRoles } from "../composables";
  import { FormDropdown } from "@starter-core/dash-ui/src";
  import type { FormDropdownOption } from "@starter-core/dash-ui/src/components/Form/types";

  const { t } = useI18n();

  const { isLoading: isFetchingRoles, data } = useUserPermissionsRoles();
  const role = defineModel("role", { required: true });

  const rolesOptions = computed<FormDropdownOption<number>[]>(() => {
    return isFetchingRoles.value || !data.value?.roles
      ? []
      : data.value.roles.map((role) => ({
          id: role.id,
          name: capitalize(role.name),
        }));
  });
</script>
<template>
  <form-dropdown
    v-if="!isFetchingRoles"
    v-model="role"
    id="role"
    :options="rolesOptions"
    :label="t('users.roles.label')"
    is-inline
  />
</template>
