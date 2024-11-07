import type { DATATABLE_ORDER_DIRECTIONS } from "@/components/Datatables";

export type OrderDirection = typeof DATATABLE_ORDER_DIRECTIONS[
  keyof typeof DATATABLE_ORDER_DIRECTIONS
];
export type TableSections = "head" | "body" | "footer";

interface PaginationOptions {
  pageName: string;
  path: string;
}

export interface PaginationObject {
  count: number;
  currentPage: number;
  lastPage: number;
  total: number;
  options: PaginationOptions;
  dataLength: number;
}
export interface TableQuery {
  page?: number;
  dir?: OrderDirection;
  column?: string;
  search?: string;
  length?: number;
}
