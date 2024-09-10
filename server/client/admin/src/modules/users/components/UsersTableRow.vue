<script setup lang="ts">
  import { PropType } from "vue";
  import { useAuth } from "@websanova/vue-auth/src/v3.js";
  import { TableColumn, TableRow } from "@/components/Datatables";
  import { IconTrash, IconEdit } from "@starter-core/icons";
  import { DashButton, DashLink } from "@starter-core/dash-ui";
  import type { DatatableColumns } from "@/components/Datatables/typings";
  import type { UserRecord } from "../types";

  const props = defineProps({
    user: {
      type: Object as PropType<UserRecord>,
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
</script>

<template>
  <TableRow :section="'body'" :is-even="isEvenRow">
    <!--kt-datatable__row&#45;&#45;even-->

    <TableColumn :width="columns[0].width">
      {{ user.first_name }}
    </TableColumn>

    <TableColumn :width="columns[1].width">
      {{ user.last_name }}
    </TableColumn>

    <TableColumn :width="columns[2].width">
      {{ user.email }}
    </TableColumn>

    <TableColumn :width="columns[3].width">
      {{ user.roles }}
    </TableColumn>

    <TableColumn :width="columns[4].width">
      <template v-if="user.is_disabled">
        {{ $t("users.status.disabled") }}
      </template>
      <template v-else>
        {{ $t("users.status.enabled") }}
      </template>
    </TableColumn>

    <TableColumn :width="columns[5].width">
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

    <TableColumn :width="columns[6].width">
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
