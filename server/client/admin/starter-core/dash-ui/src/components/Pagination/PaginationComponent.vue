<script setup lang="ts">
  import { computed } from "vue";
  import PaginationLink from "./PaginationLink.vue";
  import type { PaginationObject, onPaginationChangeParams } from "./types";
  import "./PaginationComponent.scss";

  interface DatatablePagination {
    pagination: PaginationObject;
    limitOptions?: number[];
    isLoading?: boolean;
  }

  const { pagination, limitOptions = [10, 25, 50] } =
    defineProps<DatatablePagination>();

  const arrowNavigation = computed(() => {
    const { currentPage, lastPage, dataLength, total } = pagination;
    const from = currentPage * dataLength - dataLength + 1;
    const to = Math.min(from + dataLength - 1, total);

    return {
      firstPage: pagination.currentPage > 1 ? 1 : null,
      previousPage: currentPage > 1 ? currentPage - 1 : null,
      lastPage: currentPage < lastPage ? lastPage : null,
      nextPage: currentPage < lastPage ? currentPage + 1 : null,
      from,
      to,
    };
  });

  const emit = defineEmits<{
    (e: "change", params: onPaginationChangeParams): void
  }>();

  const handleLengthChange = (event: InputSelectEvent) => {
    emit("change", {
      page: pagination.currentPage,
      limit: Number(event.target.value),
    });
  };

  const handleNavClick = (page: number | null): void => {
    emit("change", {
      page: page || pagination.currentPage,
      limit: pagination.dataLength,
    });
  };
</script>

<template>
  <div
    class="kt-datatable__pager"
    :class="{
      'kt-datatable__pager--loaded': !isLoading,
    }"
  >
    <ul class="kt-datatable__pager__nav">
      <PaginationLink
        :class-modifiers="['first']"
        :is-disabled="!arrowNavigation.firstPage"
        @onClick="handleNavClick(arrowNavigation.firstPage)"
      >
        <i class="la la-angle-double-left"></i>
      </PaginationLink>

      <PaginationLink
        :class-modifiers="['prev']"
        :is-disabled="!arrowNavigation.previousPage"
        @onClick="handleNavClick(arrowNavigation.previousPage)"
      >
        <i class="la la-angle-left"></i>
      </PaginationLink>

      <!--<li style="display: none;">
        <input type="text" class="kt-pager-input form-control" title="Page number">
      </li>-->

      <PaginationLink
        v-for="page in pagination.lastPage"
        :key="page"
        :class-modifiers="['number']"
        :is-active="page === pagination.currentPage"
        @onClick="handleNavClick(page)"
      >
        {{ page }}
      </PaginationLink>

      <PaginationLink
        :class-modifiers="['next']"
        :is-disabled="!arrowNavigation.nextPage"
        @onClick="handleNavClick(arrowNavigation.nextPage)"
      >
        <i class="la la-angle-right"></i>
      </PaginationLink>

      <PaginationLink
        :class-modifiers="['last']"
        :is-disabled="!arrowNavigation.lastPage"
        @onClick="handleNavClick(arrowNavigation.lastPage)"
      >
        <i class="la la-angle-double-right" />
      </PaginationLink>
    </ul>

    <div class="kt-datatable__pager__info">
      <div class="dropdown bootstrap-select kt-datatable__pager__size">
        <select
          id="select-per-page"
          :value="pagination.dataLength"
          name="select-per-page"
          class="kt-datatable__pager__size form-control selectpicker"
          @change="handleLengthChange"
        >
          <option v-for="option in limitOptions" :value="option" :key="option">
            {{ option }}
          </option>
        </select>
      </div>

      <span class="kt-datatable__pager__detail"
        >Showing {{ arrowNavigation.from }} - {{ arrowNavigation.to }} of
        {{ pagination.total }}</span
      >
    </div>
  </div>
</template>
