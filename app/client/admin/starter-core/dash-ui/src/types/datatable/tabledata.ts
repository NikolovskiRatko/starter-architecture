import type { DATATABLE_ORDER_DIRECTIONS } from "../constants";

export type OrderDirection = typeof DATATABLE_ORDER_DIRECTIONS[
  keyof typeof DATATABLE_ORDER_DIRECTIONS
];
export type TableSections = "head" | "body" | "footer";

export interface TableQuery {
  page?: number;
  dir?: OrderDirection;
  column?: string;
  search?: string;
  length?: number;
}
