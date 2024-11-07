import { PaginationObject, TableQuery } from "./typings";

export const initPagination: PaginationObject = {
  lastPage: 0,
  currentPage: 0,
  total: 0,
  count: 0,
  dataLength: 0,
  options: {
    path: "",
    pageName: "",
  },
};

export const DATATABLE_QUERY_KEY = "datatable";

export const DATATABLE_ORDER_DIRECTIONS = {
  asc: "asc",
  desc: "desc",
} as const;

export const initQueryData: TableQuery = {
  length: 10,
  search: "",
  dir: DATATABLE_ORDER_DIRECTIONS.asc,
};
