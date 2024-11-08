import type { TableQuery } from "./types";
import type { PaginationObject } from "../Pagination";

export const INITIAL_PAGINATION: PaginationObject = {
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

export const DATATABLE_ORDER_DIRECTIONS = {
  asc: "asc",
  desc: "desc",
} as const;

export const INITIAL_QUERY_DATA: TableQuery = {
  length: 10,
  dir: DATATABLE_ORDER_DIRECTIONS.asc,
};
