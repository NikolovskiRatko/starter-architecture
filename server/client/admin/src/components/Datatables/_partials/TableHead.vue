<script setup lang="ts">
  import { PropType, inject } from "vue";
  import { useI18n } from "vue-i18n";
  import {
    ColumnName,
    ColumnObject,
    OrderDirection,
    TableInfo,
    TableQuery,
    onQueryUpdateKey,
  } from "@/components/Datatables/typings";
  import { TableRow } from "@/components/Datatables";

  const props = defineProps({
    columns: {
      type: Array as PropType<ColumnObject>,
      default: () => [],
    },
    tableInfo: {
      type: Object as PropType<TableInfo>,
      required: true,
    },
    query: {
      type: Object as PropType<TableQuery>,
      required: true,
    },
  });
  const { t } = useI18n();

  const isLoading = inject("isLoading");
  const onQueryUpdate = inject(onQueryUpdateKey, () => {});

  const triggerSort = (columnName: ColumnName) => {
    const getOrderDirection = (): OrderDirection => {
      const { column, dir } = props.query;
      if (column !== columnName) {
        return "desc";
      }
      return dir === "desc" ? "asc" : "desc";
    };

    onQueryUpdate({
      column: columnName,
      dir: getOrderDirection(),
    });
  };

  const isArrowVisible = (
    direction: OrderDirection,
    column: ColumnObject,
  ): boolean => {
    const { sortable, name } = column;
    const {
      query: { dir, column: sortKey },
    } = props;
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
          v-if="column.sortable && !props.tableInfo.noRecords"
          :key="`sortable-${column.name}`"
          :title="t(column.label)"
          class="kt-datatable__cell kt-datatable__cell--head"
          :class="{
            'kt-datatable__cell--sort': column.sortable,
          }"
          :style="`width:${column.width};`"
        >
          <span @click="triggerSort(column.name)">
            {{ t(column.label) }}
            <i
              v-show="isArrowVisible('desc', column)"
              class="la la-arrow-down"
            />
            <i v-show="isArrowVisible('asc', column)" class="la la-arrow-up" />
          </span>
        </th>
        <th
          v-else
          :key="column.name"
          class="kt-datatable__cell"
          :style="`width:${column.width};`"
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
