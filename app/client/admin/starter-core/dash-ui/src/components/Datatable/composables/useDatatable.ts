import { computed, type ComputedRef } from "vue";
import { useRoute, useRouter } from "vue-router";
import { DATATABLE_ORDER_DIRECTIONS, INITIAL_QUERY_DATA } from "../constants";
import type { onPaginationChange } from "../../Pagination";
import type { OrderDirection, TableQuery } from "../types";

export function useDatatable<TCustom extends Record<string, string | undefined> = {}>(): {
  query: ComputedRef<TableQuery>;
  customParams: ComputedRef<TCustom>;
  onPaginationChange: onPaginationChange;
} {
  const route = useRoute();
  const router = useRouter();

  const query = computed<TableQuery>(() => {
    const queryObject = Object.assign({}, INITIAL_QUERY_DATA);
    const { query: routeQuery } = route;

    const page = Number(routeQuery.page);
    const length = Number(routeQuery.length);
    const column = routeQuery.column ? String(routeQuery.column) : null;
    const dir = routeQuery.dir ? String(routeQuery.dir) : null;
    const search = routeQuery.search ? String(routeQuery.search) : null;

    if (page && !isNaN(page)) {
      queryObject["page"] = page;
    }

    if (length && !isNaN(length)) {
      queryObject["length"] = length;
    }

    if (column) {
      queryObject["column"] = column;
    }

    if (search) {
      queryObject["search"] = search;
    }

    if (
      dir &&
      Object.values(DATATABLE_ORDER_DIRECTIONS).indexOf(
        dir as OrderDirection,
      ) != -1
    ) {
      queryObject["dir"] = dir as OrderDirection;
    }

    return queryObject;
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
