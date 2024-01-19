<script setup lang="ts">
import { computed, provide } from "vue";
import {
  DatatablePagination,
  TableHead,
  TableLoader,
  DatatableHeader,
  DatatableFilters,
  TableColumn,
  TableRow,
} from "@/components/Datatables";
import { TableQuery, onQueryUpdateKey } from "@/components/Datatables/typings";
import "./DatatableComponent.scss";

const props = defineProps([
  "tableInfo",
  "query",
  "loading",
  "columns",
  "pagination",
  "langKey", //TODO: Find better solution to avoid duplications in translations
  "addRouteName", //TODO: Send all these as single object to be used by Datatable
]);

const emit = defineEmits(["onQueryUpdate"]);

const handleUpdateQuery = (query: TableQuery) => emit("onQueryUpdate", query);
const hasError = computed(() => !!props.tableInfo.error);
const isLoading = computed(() => props.loading);

provide("hasError", hasError);
provide("isLoading", isLoading);
provide(onQueryUpdateKey, handleUpdateQuery);
</script>

<template>
  <PortletComponent>
    <DatatableHeader :lang-key="langKey" :add-route-name="addRouteName" />
    <DatatableFilters />
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
          <TableHead
            :columns="columns"
            :table-info="tableInfo"
            :query="query"
          />

          <tbody
            class="kt-datatable__body"
            :class="{
              'kt-datatable__body--error': hasError,
              'kt-datatable__body--loaded': !isLoading,
            }"
          >
            <TableRow v-if="tableInfo.noRecords">
              <TableColumn>
                <span class="datatable-error">No records found</span>
              </TableColumn>
            </TableRow>

            <TableRow v-if="tableInfo.error">
              <TableColumn>
                <span
                  v-if="
                    tableInfo.errorMessage &&
                    typeof tableInfo.errorMessage !== 'undefined'
                  "
                  class="datatable-error"
                  >{{ tableInfo.errorMessage }}</span
                >
                <span v-else class="datatable-error">{{
                  $t("errors.generic_error")
                }}</span>
              </TableColumn>
            </TableRow>

            <slot />
          </tbody>
        </table>

        <DatatablePagination
          v-if="!tableInfo.noRecords"
          :pagination="pagination"
        />

        <TableLoader />
      </div>
    </PortletBody>
  </PortletComponent>
</template>
