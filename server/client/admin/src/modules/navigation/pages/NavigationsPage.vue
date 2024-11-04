<script lang="ts" setup>
  import { useNavigations } from "../composables";
  import { NAVIGATIONS_TABLE_COLUMNS } from "../constants";
  import { PageWrapper } from "@/components";
  import {
    useDatatable,
    DatatableComponent,
    DatatablePagination,
    DatatableFilters,
    DatatableHeader,
    TableRow,
    TableColumn,
    INITIAL_TABLE_INFO,
  } from "@/components/Datatables";
  import { useBEMBuilder } from "@/helpers";

  const [block, element] = useBEMBuilder("navigations-page");

  const { isLoading, data: navigations } = useNavigations();
</script>
<template>
  <div :class="block">
    <PageWrapper>
      <DatatableComponent
        :table-info="INITIAL_TABLE_INFO"
        :columns="NAVIGATIONS_TABLE_COLUMNS"
      >
        <template #default>
          <TableRow
            v-for="navigation in navigations"
            v-bind:key="navigation.id"
          >
            <TableColumn>
              {{ navigation.title }}
            </TableColumn>
            <TableColumn>
              {{ navigation.slug }}
            </TableColumn>
            <TableColumn>
              {{ navigation.livedate }}
            </TableColumn>
            <TableColumn>
              {{ navigation.enddate }}
            </TableColumn>
          </TableRow>
        </template>
      </DatatableComponent>
    </PageWrapper>
  </div>
</template>
