import type { ApiResponsePagination } from "@/types";

export const API_RESPONSE_DEFAULT_PAGINATION: ApiResponsePagination = {
  total: 0,
  count: 0,
  currentPage: 0,
  lastPage: 0,
  limit: 0,
  options: {
    path: "",
    pageName: "",
  },
  dataLength: 0,
};
