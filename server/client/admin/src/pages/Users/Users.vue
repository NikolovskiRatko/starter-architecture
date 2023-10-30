<script setup lang="ts">
    import './Users.scss';
    import { ColumnObject } from '@/components/Datatables/typings';
    import UserDatatable from '@/features/UsersCrud/UserDatatable.vue';

    const columns: ColumnObject[] = [
        { id: 0, width: '40%', label: 'name', name: 'name', sortable: true },
        { id: 1, width: '40%', label: 'email', name: 'email', sortable: true },
        { id: 2, width: '10%', label: 'actions', name: 'actions', sortable: false },
        { id: 3, width: '10%', label: 'delete', name: 'actions', sortable: false }
    ];
</script>
<template>
    <!-- ### $App Screen Content ### -->
    <main class='main-content bgc-grey-100'>
        <div id='mainContent'>
            <div class="container-fluid">
                <h4 class="c-grey-900 mT-10 mB-30">Users Table Display</h4>
                <div class="row">
                    <div class="col-md-12">
                        <div class="bgc-white bd bdrs-3 p-20 mB-20">
                            <h4 class="c-grey-900 mB-20">Admin Users</h4>
                            <user-datatable :columns="columns" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>