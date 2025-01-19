export interface EloquentModelCommonFields {
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponsePagination {
  total: number;
  count: number;
  currentPage: number;
  lastPage: number;
  limit: number;
  options: {
    path: string;
    pageName: string;
  };
  dataLength: number;
}

export type PaginatedApiResponse<T> = {
  data: T[];
  pagination: ApiResponsePagination;
};
