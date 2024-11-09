<script lang="ts" setup>
  import { useNavigations } from "../composables";
  import { NAVIGATIONS_TABLE_COLUMNS } from "../constants";
  import { PageWrapper } from "@/components";
  import { useBEMBuilder } from "@/helpers";
  import {
    useDatatable,
    DatatableComponent,
    PaginationComponent,
    DatatableFilters,
    DatatableHeader,
    TableRow,
    TableColumn,
  } from "@starter-core/dash-ui/src";

  const [block, element] = useBEMBuilder("navigations-page");

  const { isLoading, data: navigations } = useNavigations();
  const { query } = useDatatable();
</script>
<template>
  <div :class="block">
    <PageWrapper>
      <DatatableComponent
        :isLoading="isLoading"
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
