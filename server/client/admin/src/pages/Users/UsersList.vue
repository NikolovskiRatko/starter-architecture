<script setup lang="ts">
  import { onMounted } from "vue";
  import { useRootStore } from "@/store/root";
  import { ColumnObject } from "@/components/Datatables/typings";
  import UserDatatable from "@/features/UsersCrud/UserDatatable.vue";

  const { setBackUrl, setActiveClasses } = useRootStore();

  onMounted(() => {
    setBackUrl("/");
    setActiveClasses({
      main: "users",
      sub: "users",
      title: "users.title",
      hasFilters: "users",
    });
  });

  const columns: ColumnObject[] = [
    {
      id: 0,
      width: "15%",
      label: "admin.datatable.first_name",
      name: "first_name",
      sortable: true,
    },
    {
      id: 1,
      width: "15%",
      label: "admin.datatable.last_name",
      name: "last_name",
      sortable: true,
    },
    {
      id: 2,
      width: "20%",
      label: "admin.datatable.email",
      name: "email",
      sortable: true,
    },
    {
      id: 3,
      width: "10%",
      label: "admin.datatable.user_role",
      name: "roles",
      sortable: true,
    },
    {
      id: 4,
      width: "5%",
      label: "admin.datatable.status",
      name: "status",
      sortable: true,
    },
    {
      id: 5,
      width: "5%",
      label: "strings.actions",
      name: "actions",
      sortable: false,
    },
    {
      id: 6,
      width: "5%",
      label: "strings.delete",
      name: "actions",
      sortable: false,
    },
  ];
</script>
<template>
  <user-datatable :columns="columns" />
</template>
