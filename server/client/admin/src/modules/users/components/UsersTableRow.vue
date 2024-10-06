<script setup lang="ts">
  import { DashButton, DashLink } from "@starter-core/dash-ui";
  import { IconTrash, IconEdit } from "@starter-core/icons";
  import { useAuth } from "@websanova/vue-auth/src/v3.js";
  import { PropType, computed } from "vue";
  import type { GetUserResponse } from "../types";
  import UserRoleBadge from "./UserRoleBadge.vue";
  import UserStatusBadge from "./UserStatusBadge.vue";
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

  const avatarSource = computed(() => {
    if (props.user.avatar_thumbnail) {
      return props.user.avatar_thumbnail;
    }
    return new URL(
      `@/../assets/images/placeholders/avatar-placeholder.jpg`,
      import.meta.url,
    ).href;
  });
</script>

<template>
  <TableRow :section="'body'" :is-even="isEvenRow">
    <!--kt-datatable__row&#45;&#45;even-->

    <TableColumn>
      <img :style="{ width: '50px' }" :src="avatarSource" />
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
      <UserRoleBadge :user-role-id="user.role" />
    </TableColumn>

    <TableColumn>
      <UserStatusBadge :is-disabled="user.is_disabled" />
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
        size="sm"
        onclick="deleteUser(user, user.id)"
        is-pill
        is-icon
      />
    </TableColumn>
  </TableRow>
</template>
