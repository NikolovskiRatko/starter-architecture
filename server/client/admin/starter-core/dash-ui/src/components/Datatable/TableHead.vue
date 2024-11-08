<script setup lang="ts">
  import { inject } from "vue";
  import { useI18n } from "vue-i18n";
  import { useRoute, useRouter } from "vue-router";
  import { DATATABLE_ORDER_DIRECTIONS } from "./constants";
  import type {
    ColumnName,
    ColumnObject,
    DatatableColumns,
    OrderDirection,
    TableQuery,
  } from "./types";
  import TableRow from "./TableRow.vue";

  interface TableHeadProps {
    columns: DatatableColumns;
    query: TableQuery;
  }

  const { columns, query } = defineProps<TableHeadProps>();
  const { t } = useI18n();
  const router = useRouter();
  const route = useRoute();

  const isLoading = inject("isLoading");

  const getOrderDirection = (columnName: ColumnName): OrderDirection => {
    const { column, dir } = query;
    if (column !== columnName) {
      return DATATABLE_ORDER_DIRECTIONS.desc;
    }

    return dir === DATATABLE_ORDER_DIRECTIONS.desc
      ? DATATABLE_ORDER_DIRECTIONS.asc
      : DATATABLE_ORDER_DIRECTIONS.desc;
  };

  const triggerSort = (columnName: ColumnName) => {
    router.push({
      path: route.path,
      query: {
        ...route.query,
        column: columnName,
        dir: getOrderDirection(columnName),
      },
    });
  };

  const isArrowVisible = (
    direction: OrderDirection,
    column: ColumnObject,
  ): boolean => {
    const { sortable, name } = column;
    const { dir, column: sortKey } = query;
    return !!(sortable && name === sortKey && dir === direction);
  };
</script>

<template>
  <thead
    class="kt-datatable__head"
    :class="{
      'kt-datatable__head--loaded': !isLoading,
    }"
  >
    <TableRow>
      <template v-for="column in columns">
        <th
          v-if="column.sortable"
          :key="`sortable-${column.name}`"
          :title="t(column.label)"
          class="kt-datatable__cell kt-datatable__cell--head"
          :class="{
            'kt-datatable__cell--sort': column.sortable,
          }"
        >
          <span @click="triggerSort(column.name)">
            {{ t(column.label) }}
            <i
              v-show="isArrowVisible(DATATABLE_ORDER_DIRECTIONS.desc, column)"
              class="la la-arrow-down"
            />
            <i
              v-show="isArrowVisible(DATATABLE_ORDER_DIRECTIONS.asc, column)"
              class="la la-arrow-up"
            />
          </span>
        </th>
        <th
          v-else
          :key="column.name"
          class="kt-datatable__cell"
          :title="t(column.label)"
        >
          <span>
            {{ t(column.label) }}
          </span>
        </th>
      </template>
    </TableRow>
  </thead>
</template>
