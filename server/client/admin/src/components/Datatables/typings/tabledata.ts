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
  dataLength: number | undefined;
  lastPage: number;
  currentPage: number;
  total: number;
  options: PaginationOptions;
}
export interface TableQuery {
  draw?: any;
  page?: number;
  dir?: OrderDirection;
  column?: string;
  search?: string;
  length?: number;
}
