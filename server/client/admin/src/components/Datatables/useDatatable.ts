import { ref, computed, onMounted, watch } from 'vue';
import type { Ref } from 'vue'
import { post, get } from "@/services/HTTP";
import { useAuth } from '@websanova/vue-auth/src/v3.js';
import { useRouter } from 'vue-router';
import { PaginationObject, TableInfo, TableQuery } from './typings';

const initTableData: TableInfo = {
  error: false,
  errorMessage: '',
  noRecords: false,
}

const initQueryData: TableQuery = {
  draw: 1,
  length: 10,
  search: '',
  dir: 'asc',
}

const initPagination: PaginationObject = {
  lastPage: 0,
  currentPage: 0,
  total: 0,
  dataLength: 10,
  options: {
    path: '',
    pageName: ''
  }
}

export function useDatatable({
  endpoint, columns, redirectRoute, sortKey = 'id'
}) {
  const records: Ref<Object[]> = ref([]);
  const loading: Ref<boolean> = ref(true);
  const tableInfo: Ref<TableInfo> = ref(initTableData);
  const pagination: Ref<PaginationObject> = ref(initPagination);
  const query: Ref<TableQuery> = ref({
    ...initQueryData,
    column: sortKey
  });
  const auth = useAuth();

  const router = useRouter();

  const actualUser = computed(() => auth.user());

  const setQuery = (queryObject: TableQuery) => {
    query.value = {
      ...query.value,
      ...queryObject
    }
  }

  const setTableInfo = (newData: TableInfo) => {
    tableInfo.value = {
      ...tableInfo.value,
      ...newData
    }
  }

  const setDatatableError = (message= '') => setTableInfo({
    error: true,
    errorMessage: message
  })

  const deleteRow = async (index: number): Promise<void> => {
    // if (!await dialog('general.confirm.delete', true)) {
    //   return;
    // }
    get(endpoint.value + '/' + index + '/delete')
      .then(() => {
        // dialog('strings.front.deleted_successfully', false);
        console.log('strings.front.deleted_successfully');
        getData();
      })
      .catch((error) => {
        // dialog(error.response.data.message, false);
        console.log(error.response.data.message);
      });
  }

  const getData = async (url?: string) => {
    loading.value = true;
    query.value.draw++; //TODO: Figure out what this does

    const getDataEndpoint = url ?? `${endpoint}/draw`;

    //TODO: Switch to get
    const response = await post(getDataEndpoint, query.value);
    const { data, success, status, message } = response;

    if (success) {
      const {
        data: newRecords,
        pagination: newPagination,
        draw,
        errors
      } = data;
      loading.value = false;

      switch (status) {
        case 200: {
          if (errors) {
            setDatatableError();
            return;
          }

          records.value = newRecords;
          if (query.value.draw == draw) {
            pagination.value = newPagination;
            setTableInfo({
              noRecords: newRecords.length <= 0
            })
          }
          break;
        }
        case 401: {
          router.push(redirectRoute);
          return;
        }
        default: {
          setDatatableError();
          return;
        }
      }
    } else {
      setDatatableError(message);
    }

    loading.value = false;
  }

  // This is unused left just in case it is needed again
  // async changePage(page: number): Promise<void>  {
  //   let url = this.endpoint;
  //   url = url+'/draw';
  //   url = url+'?page='+ String(page);
  //   this.getData(url);
  // }

  watch(query, () => {
    getData();
  })

  onMounted(() => {
    getData();
  })

  return {
    records,
    query,
    loading,
    pagination,
    tableInfo,
    getData,
    setQuery
  };
}
