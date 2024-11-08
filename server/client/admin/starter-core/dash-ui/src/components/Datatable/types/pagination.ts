export interface onPaginationChangeParams {
  page: number;
  limit: number;
}

export type onPaginationChange = (params: onPaginationChangeParams) => void;
