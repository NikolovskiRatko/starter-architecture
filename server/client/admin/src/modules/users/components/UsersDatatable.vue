<script setup lang="ts">
  import { PropType } from "vue";
  // import { ref } from "vue";
  // import type { Ref } from "vue";
  import UsersTableRow from "./UsersTableRow.vue";
  import {
    useDatatable,
    DatatableComponent,
    DatatablePagination,
    DatatableFilters,
    DatatableHeader,
  } from "@/components/Datatables";
  import { useRootStore } from "@/store/root";
  import type { UserRecord } from "../types";
  import type { DatatableColumns } from "@/components/Datatables/typings";
  // import { get, post } from "@/services/HTTP";

  const props = defineProps({
    columns: {
      type: Array as PropType<DatatableColumns>,
      required: true,
    },
  });
  const { homePath } = useRootStore();

  const { records, loading, pagination, tableInfo, query, getData, setQuery } =
    useDatatable<UserRecord>({
      endpoint: "user",
      redirectRoute: homePath,
      columns: props.columns,
      sortKey: "firstName",
    });

  // const roles: Ref<any[]> = ref([]);
  // const statuses: any[] = [
  //   { id: 3, name: "All status" },
  //   { id: 0, name: "Enabled" },
  //   { id: 1, name: "Disabled" },
  // ];
  // const exportGeneration: boolean = false;

  // const fetchRoles = () => {
  //   get("user/roles/get")
  //     .then((response) => {
  //       roles.value = [
  //         ...response.data,
  //         { id: 0, display_name: "- All roles -" },
  //       ];
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // const deleteUser = async (user: User, index: number): Promise<void> => {
  //   // if (!await dialog('general.confirm.delete', true)) {
  //   //   return;
  //   // }
  //   post(endpoint + "/" + index + "/delete")
  //     .then((response) => {
  //       // dialog('strings.front.deleted_successfully', false);
  //       console.log("strings.front.deleted_successfully");
  //       getData();
  //     })
  //     .catch((error) => {
  //       // dialog(error.response.data.message, false);
  //       console.log(error.response.data.message);
  //     });
  // };
</script>
<template>
  <DatatableComponent
    :tableInfo="tableInfo"
    :query="query"
    :loading="loading"
    :columns="columns"
    lang-key="users"
    add-route-name="add.user"
    @onQueryUpdate="setQuery"
  >
    <template #header>
      <DatatableHeader lang-key="users" add-route-name="add.user" />
      <DatatableFilters />
    </template>
    <template #default>
      <users-table-row
        v-for="(user, index) in records"
        :key="user.id"
        :columns="columns"
        :user="user"
        :is-even-row="index % 2 === 0"
      />
    </template>
    <template #pagination>
      <DatatablePagination
        v-if="!tableInfo.noRecords"
        :pagination="pagination"
      />
    </template>
  </DatatableComponent>
</template>
