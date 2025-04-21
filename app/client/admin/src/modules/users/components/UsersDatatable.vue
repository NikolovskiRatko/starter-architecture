<script setup lang="ts">
  import { computed } from 'vue';
  import { useUsersTable } from '../composables';
  import { USERS_DATATABLE_COLUMNS } from '../constants';
  import UsersTableHeader from './UsersTableHeader.vue';
  import UsersTableRow from './UsersTableRow.vue';
  import {
    useDatatable,
    DatatableComponent,
    DatatableFilters,
    DatatableHeader,
    PaginationComponent,
  } from '@starter-core/dash-ui/src';

  const { query, onPaginationChange } = useDatatable();

  const { data, isLoading, isFetching, error } = useUsersTable(query);

  const pagination = computed(() => data.value?.pagination ?? null);
  const users = computed(() => data.value?.data ?? null);
</script>
<template>
  <DatatableComponent
    :query="query"
    :isLoading="isLoading || isFetching"
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
      />
    </template>
    <template v-if="pagination" #pagination>
      <PaginationComponent :pagination="pagination" :isLoading="isLoading" @change="onPaginationChange" />
    </template>
  </DatatableComponent>
</template>
