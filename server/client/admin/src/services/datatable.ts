import { ref, reactive } from 'vue';
import http from '@/services/http';
import router from '@/router';

// We're defining the data as a function to make it reactive
function useDatatable() {
    // State
    const endpoint = ref('no_endpoint');
    const datatable_data = ref<Object[]>([]);
    const loading = ref(true);
    const columns = ref([
        {id: 0, width: '70%', label: 'name', name: 'name', sortable: true},
        {id: 1, width: '15%', label: 'strings.actions', name: 'actions', sortable: false},
        {id: 2, width: '15%', label: 'strings.delete', name: 'actions', sortable: false}
    ]);
    const tableData = reactive({
        draw: 1,
        length: 10,
        search: '',
        column: 0,
        dir: 'desc'
    });
    const pagination = reactive({
        lastPage: 0,
        currentPage: 0,
        total: 0,
        lastPageUrl: '',
        nextPageUrl: '',
        prevPageUrl: '',
        dataLength: 10,
        from: 0,
        to: 0
    });
    const sortOrders = ref<Object>({});
    const sortKey = ref('id');
    const success = ref<any>(0);

    // Methods
    function getIndex(array: any[], key: string, value: string): number {
        return array.findIndex(i => i[key] == value);
    }

    async function getData(url: string = ''): Promise<void> {
        // Use `http` directly as axios was provided in your imports
        // logic...
    }

    function configPagination(data: any): void {
        // logic...
    }

    async function sortBy(key: string, columns: any): Promise<void> {
        // Use `http` directly as axios was provided in your imports
        // logic...
    }

    async function changeLength(length: number): Promise<void> {
        // Use `http` directly as axios was provided in your imports
        // logic...
    }

    async function deleteRow(index: number): Promise<void> {
        // Use `http` directly as axios was provided in your imports
        // logic...
    }

    async function setOrder(item: any, dir: string): Promise<void> {
        // Use `http` directly as axios was provided in your imports
        // logic...
    }

    // Return the state and methods for the component to use
    return {
        endpoint,
        datatable_data,
        loading,
        tableData,
        pagination,
        sortOrders,
        sortKey,
        success,
        getIndex,
        getData,
        configPagination,
        sortBy,
        changeLength,
        deleteRow,
        setOrder
    };
}

export default useDatatable;
