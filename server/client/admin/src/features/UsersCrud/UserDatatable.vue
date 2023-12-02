<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import UsersTableRow from "@/features/UsersCrud/UsersTableRow.vue";
import { useDatatable, Datatable } from "@/components/Datatables";
import { useRootStore } from "@/store/root";
import { get, post } from "@/services/HTTP";

const props = defineProps(["columns"]);
const { homePath } = useRootStore();

const { records, loading, pagination, tableInfo, query, getData, setQuery } =
  useDatatable({
    endpoint: "user",
    redirectRoute: homePath,
    columns: props.columns,
    sortKey: "first_name",
  });

const roles: Ref<any[]> = ref([]);
const statuses: any[] = [
  { id: 3, name: "All status" },
  { id: 0, name: "Enabled" },
  { id: 1, name: "Disabled" },
];
const exportGeneration: boolean = false;

const fetchRoles = () => {
  get("user/roles/get")
    .then((response) => {
      roles.value = [
        ...response.data,
        { id: 0, display_name: "- All roles -" },
      ];
    })
    .catch((error) => {
      console.log(error);
    });
};

const deleteUser = async (user: User, index: number): Promise<void> => {
  // if (!await dialog('general.confirm.delete', true)) {
  //   return;
  // }
  post(endpoint + "/" + index + "/delete")
    .then((response) => {
      // dialog('strings.front.deleted_successfully', false);
      console.log("strings.front.deleted_successfully");
      getData();
    })
    .catch((error) => {
      // dialog(error.response.data.message, false);
      console.log(error.response.data.message);
    });
};
</script>
<template>
  <Datatable
    :tableInfo="tableInfo"
    :query="query"
    :loading="loading"
    :columns="columns"
    lang-key="users"
    add-route-name="add.user"
    :pagination="pagination"
    @onQueryUpdate="setQuery"
  >
    <users-table-row
      v-for="(user, index) in records.data"
      :index="index"
      :key="user.id"
      :columns="columns"
      :user="user"
    />
  </Datatable>
</template>
