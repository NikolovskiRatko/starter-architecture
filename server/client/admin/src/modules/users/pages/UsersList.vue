<script setup lang="ts">
  import { onMounted } from "vue";
  import { UsersDatatable } from "../components";
  import { PageWrapper } from "@/components";
  import { DatatableColumns } from "@/components/Datatables/typings";
  import { useRootStore } from "@/store/root";

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

  const columns: DatatableColumns = [
    {
      id: 0,
      label: "users.datatable.avatar",
      name: "avatar",
      sortable: true,
    },
    {
      id: 1,
      label: "users.datatable.first_name",
      name: "first_name",
      sortable: true,
    },
    {
      id: 2,
      label: "users.datatable.last_name",
      name: "last_name",
      sortable: true,
    },
    {
      id: 3,
      label: "users.datatable.email",
      name: "email",
      sortable: true,
    },
    {
      id: 4,
      label: "users.datatable.user_role",
      name: "roles",
      sortable: true,
    },
    {
      id: 5,
      label: "users.datatable.status",
      name: "status",
      sortable: true,
    },
    {
      id: 6,
      label: "strings.actions",
      name: "actions",
      sortable: false,
    },
    {
      id: 7,
      label: "strings.delete",
      name: "actions",
      sortable: false,
    },
  ];
</script>
<template>
  <PageWrapper>
    <users-datatable :columns="columns" />
  </PageWrapper>
</template>
