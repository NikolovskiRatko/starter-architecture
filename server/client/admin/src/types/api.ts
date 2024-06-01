export type ApiResponse<T = void> = {
  success?: boolean;
  message?: string;
  data: T;
  code?: number;
};

export type PaginatedApiResponse<T> = ApiResponse<T> & {
  pagination: {
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
  };
};
