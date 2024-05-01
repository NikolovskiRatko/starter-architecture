export type OrderDirection = "asc" | "desc";
export type TableSections = "head" | "body" | "footer";

export interface TableInfo {
  category?: number;
  source?: string;
  error?: boolean;
  errorMessage?: string;
  noRecords?: boolean;
}

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
