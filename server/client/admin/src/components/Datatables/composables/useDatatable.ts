import { computed } from "vue";
import { useRoute } from "vue-router";
import { DATATABLE_ORDER_DIRECTIONS, initQueryData } from "../constants";
import { OrderDirection, TableQuery } from "../typings";

export function useDatatable() {
  const route = useRoute();

  const query = computed<TableQuery>(() => {
    const queryObject = Object.assign({}, initQueryData);
    const { query: routeQuery } = route;
    const page = Number(routeQuery.page);
    const length = Number(routeQuery.length);
    const column = String(routeQuery.column);
    const dir = String(routeQuery.dir);

    if (page && !isNaN(page)) {
      queryObject["page"] = page;
    }

    if (length && !isNaN(length)) {
      queryObject["length"] = length;
    }

    if (column) {
      queryObject["column"] = column;
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

  return { query };
}
