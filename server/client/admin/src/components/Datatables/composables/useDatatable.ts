import type { QueryFunction } from "@tanstack/vue-query";
import { useQueryClient, useQuery } from "@tanstack/vue-query";
import axios, { type AxiosError } from "axios";
import { ref, computed } from "vue";
import type { Ref } from "vue";
import { PaginationObject, TableInfo, TableQuery } from "../typings";

const initTableData: TableInfo = {
  error: false,
  errorMessage: "",
  noRecords: false,
};

const initQueryData: TableQuery = {
  length: 10,
  search: "",
  dir: "asc",
};

const initPagination: PaginationObject = {
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

const DATATABLE_QUERY_KEY = "datatable";

export function useDatatable<T>({ endpoint, sortKey = "id" }) {
  const pagination: Ref<PaginationObject> = ref(initPagination);
  const query: Ref<TableQuery> = ref({
    ...initQueryData,
    column: sortKey,
  });
  const queryClient = useQueryClient();

  const isEnabled = computed(() => !!endpoint);
  const { data, isLoading, isFetching, error, isError } = useQuery({
    queryKey: [DATATABLE_QUERY_KEY, endpoint, query],
    queryFn: async (): QueryFunction<unknown, AxiosError> => {
      const { data } = await axios.get(endpoint, {
        params: query.value,
      });
      pagination.value = data.pagination;
      return data;
    },
    enabled: isEnabled,
    initialData: {
      data: [],
      pagination: {},
    },
  });

  console.log(error.value);

  // const actualUser = computed(() => auth.user());

  const setQuery = (queryObject: TableQuery) => {
    query.value = {
      ...query.value,
      ...queryObject,
    };
  };

  // const deleteRow = async (index: number): Promise<void> => {
  //   // if (!await dialog('general.confirm.delete', true)) {
  //   //   return;
  //   // }
  //   get(endpoint.value + "/" + index + "/delete")
  //     .then(() => {
  //       // dialog('strings.front.deleted_successfully', false);
  //       console.log("strings.front.deleted_successfully");
  //       getData();
  //     })
  //     .catch((error) => {
  //       // dialog(error.response.data.message, false);
  //       console.log(error.response.data.message);
  //     });
  // };

  const tableInfo = computed<TableInfo>(() => {
    if (!isLoading) {
      return initTableData;
    }

    return {
      errorMessage: isError ? error.value : "",
      error: isError.value,
      noRecords: !isLoading && data.value.data.length <= 0,
    };
  });

  const records = computed(() => data.value.data);

  const refreshData = () => {
    queryClient.invalidateQueries({ queryKey: [DATATABLE_QUERY_KEY] });
  };

  const loading = computed(() => isLoading.value || isFetching.value);

  return {
    records,
    query,
    loading,
    pagination,
    tableInfo,
    refreshData,
    setQuery,
  };
}
