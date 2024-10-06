<script setup lang="ts">
  import { DashButton, DashLink } from "@starter-core/dash-ui";
  import { IconTrash, IconEdit } from "@starter-core/icons";
  import { useAuth } from "@websanova/vue-auth/src/v3.js";
  import { PropType, computed } from "vue";
  import { useUserRoles } from "../composables";
  import type { GetUserResponse } from "../types";
  import { TableColumn, TableRow } from "@/components/Datatables";
  import type { DatatableColumns } from "@/components/Datatables/typings";

  const props = defineProps({
    user: {
      type: Object as PropType<GetUserResponse>,
      required: true,
    },
    isEvenRow: {
      type: Boolean,
      default: false,
    },
    columns: {
      type: Array as PropType<DatatableColumns>,
      required: true,
    },
  });
  const isEvenRow = props.index % 2 === 0;
  const auth = useAuth();
  const { isLoading: isFetchingRoles, data: roles } = useUserRoles();

  const userRole = computed(() => {
    if (isFetchingRoles.value || !roles.value) {
      return "User";
    }

    return (
      roles.value.find((role) => role.id === props.user.role)?.name ?? "User"
    );
  });
</script>

<template>
  <TableRow :section="'body'" :is-even="isEvenRow">
    <!--kt-datatable__row&#45;&#45;even-->

    <TableColumn>
      <img :style="{ width: '50px' }" :src="user.avatar_thumbnail ?? ''" />
    </TableColumn>

    <TableColumn>
      {{ user.first_name }}
    </TableColumn>

    <TableColumn>
      {{ user.last_name }}
    </TableColumn>

    <TableColumn>
      {{ user.email }}
    </TableColumn>

    <TableColumn>
      {{ userRole }}
    </TableColumn>

    <TableColumn>
      <template v-if="user.is_disabled">
        {{ $t("users.status.disabled") }}
      </template>
      <template v-else>
        {{ $t("users.status.enabled") }}
      </template>
    </TableColumn>

    <TableColumn>
      <dash-link
        v-if="auth.user().permissions_array.includes('write_users')"
        :to="{ name: 'edit.user', params: { userId: user.id } }"
        theme="primary"
        theme-mod="outline-hover"
        :icon="IconEdit"
      >
        {{ $t("buttons.edit") }}
      </dash-link>
    </TableColumn>

    <TableColumn>
      <DashButton
        v-if="auth.user().permissions_array.includes('delete_users')"
        :icon="IconTrash"
        theme="danger"
        onclick="deleteUser(user, user.id)"
        is-pill
      />
    </TableColumn>
  </TableRow>
</template>
