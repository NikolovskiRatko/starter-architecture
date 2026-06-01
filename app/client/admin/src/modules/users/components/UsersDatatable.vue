<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useDeleteUser, useUsersTable } from '../composables';
  import { USERS_DATATABLE_COLUMNS } from '../constants';
  import type { GetUserResponse } from '../types';
  import UsersTableHeader from './UsersTableHeader.vue';
  import UsersTableRow from './UsersTableRow.vue';
  import { ConfirmDialog } from '@/components';
  import { DatatableComponent, DatatableFilters, DatatableHeader, PaginationComponent } from '@starter-core/dash-ui/src';
  import { useDatatable } from '@starter-core/dash-ui/src/composables';

  const { t } = useI18n();
  const { query, onPaginationChange } = useDatatable();

  const { data, isLoading, isFetching, error } = useUsersTable(query);
  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();

  const pagination = computed(() => data.value?.pagination ?? null);
  const users = computed(() => data.value?.data ?? null);

  const userPendingDelete = ref<GetUserResponse | null>(null);

  const onRequestDelete = (user: GetUserResponse) => {
    userPendingDelete.value = user;
  };

  const onCancelDelete = () => {
    userPendingDelete.value = null;
  };

  const onConfirmDelete = () => {
    const user = userPendingDelete.value;
    if (!user) {
      return;
    }
    deleteUser(user.id, {
      onSettled: () => {
        userPendingDelete.value = null;
      },
    });
  };
</script>
<template>
  <DatatableComponent
    :query="query"
    :isLoading="isLoading || isFetching || isDeleting"
    :columns="USERS_DATATABLE_COLUMNS"
    :error="error?.message"
  >
    <template #header>
      <DatatableHeader title="Users" subtitle="List of users">
        <UsersTableHeader />
      </DatatableHeader>
      <DatatableFilters />
    </template>
    <template v-if="users" #default>
      <UsersTableRow
        v-for="(user, index) in users"
        :key="user.id"
        :columns="USERS_DATATABLE_COLUMNS"
        :user="user"
        :is-even-row="index % 2 === 0"
        @delete="onRequestDelete"
      />
    </template>
    <template v-if="pagination" #pagination>
      <PaginationComponent :pagination="pagination" :isLoading="isLoading" @change="onPaginationChange" />
    </template>
  </DatatableComponent>
  <ConfirmDialog
    :show="userPendingDelete !== null"
    :message="t('strings.confirm-delete-user')"
    variant="danger"
    @confirm="onConfirmDelete"
    @close="onCancelDelete"
  />
</template>
