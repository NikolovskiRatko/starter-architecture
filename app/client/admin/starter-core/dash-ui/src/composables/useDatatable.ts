import { computed, type ComputedRef } from "vue";
import { useRoute, useRouter } from "vue-router";
import { DATATABLE_ORDER_DIRECTIONS, INITIAL_QUERY_DATA } from "../constants";
import type { onPaginationChange } from "../components/Pagination";
import type { TableQuery } from "../types";
import { useQueryParams, TRANSFORMS } from './useQueryParams';

export function useDatatable<TCustom extends Record<string, string | undefined> = {}>(): {
  query: ComputedRef<TableQuery>;
  customParams: ComputedRef<TCustom>;
  onPaginationChange: onPaginationChange;
} {
  const route = useRoute();
  const router = useRouter();

  const query = computed<TableQuery>(() => {
    return useQueryParams<TableQuery>({
      values: {
        search: TRANSFORMS.toString,
        dir: (value: string) => {
          const isDirValue = Object.values(DATATABLE_ORDER_DIRECTIONS).indexOf(value) != -1

          return isDirValue ? value : null;
        },
        column: TRANSFORMS.toString,
        length: TRANSFORMS.toNumber,
        page: TRANSFORMS.toNumber
      },
      defaultValues: {
        search: null,
        dir: INITIAL_QUERY_DATA.dir,
        column: null,
        length: INITIAL_QUERY_DATA.length,
        page: 1
      }
    });
  });

  const customParams = computed<TCustom>(() => {
    const knownKeys = ["page", "length", "column", "dir", "search"];
    const result: Record<string, string | undefined> = {};

    Object.entries(route.query).forEach(([key, value]) => {
      if (!knownKeys.includes(key)) {
        result[key] = Array.isArray(value) ? value[0] : value;
      }
    });

    return result as TCustom;
  });

  const onPaginationChange: onPaginationChange = ({ limit, page }) => {
    router.push({
      path: route.path,
      query: {
        ...route.query,
        length: limit,
        page,
      },
    });
  };

  return {
    query,
    customParams,
    onPaginationChange,
  };
}
