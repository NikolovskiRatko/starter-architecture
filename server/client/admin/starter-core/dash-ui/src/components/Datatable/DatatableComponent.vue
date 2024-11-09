<script setup lang="ts">
  import { computed, provide } from "vue";
  import TableRow from "./TableRow.vue";
  import TableHead from "./TableHead.vue"
  import TableLoader from "./TableLoader.vue"
  import TableColumn from "./TableColumn.vue"
  import type { DatatableColumns, TableQuery } from "./types";
  import { PortletComponent, PortletBody } from "../Portlet";
  import "./DatatableComponent.scss";

  interface DatatableComponentProps {
    columns: DatatableColumns;
    query?: TableQuery;
    isLoading?: boolean;
    error?: string;
  }

  const { query, columns, isLoading, error } =
    defineProps<DatatableComponentProps>();

  defineSlots<{
    default: () => void;
    header: () => void;
    pagination: () => void;
  }>();

  const hasError = computed(() => !!error);

  provide("hasError", hasError);
  provide(
    "isLoading",
    computed(() => isLoading),
  );
</script>

<template>
  <PortletComponent>
    <slot name="header"></slot>
    <PortletBody :is-unpdadded="true">
      <div
        class="kt-datatable kt-datatable--default kt-datatable--brand"
        :class="{
          'kt-datatable--loading': isLoading,
          'kt-datatable--loaded': !isLoading,
        }"
      >
        <table
          class="kt-datatable__table kt-datatable__table--portlet"
          :class="{
            'kt-datatable__table--loaded': !isLoading,
          }"
        >
          <TableHead :columns="columns" :query="query" />

          <tbody
            class="kt-datatable__body"
            :class="{
              'kt-datatable__body--error': hasError,
              'kt-datatable__body--loaded': !isLoading,
            }"
          >
            <TableRow v-if="!isLoading && !$slots.default?.()?.length">
              <TableColumn>
                <span class="datatable-error">No records found</span>
              </TableColumn>
            </TableRow>

            <TableRow v-if="hasError">
              <TableColumn>
                <span class="datatable-error">{{ error }}</span>
              </TableColumn>
            </TableRow>

            <slot name="default"></slot>
          </tbody>
        </table>

        <slot name="pagination"></slot>

        <TableLoader v-if="isLoading" />
      </div>
    </PortletBody>
  </PortletComponent>
</template>
