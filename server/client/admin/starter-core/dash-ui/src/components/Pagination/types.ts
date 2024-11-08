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

export interface onPaginationChangeParams {
  page: number;
  limit: number;
}

export type onPaginationChange = (params: onPaginationChangeParams) => void;
