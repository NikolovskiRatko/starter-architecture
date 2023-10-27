<script>
    import AdminHeader from '@/layouts/Admin/AdminHeader.vue';
    import AdminSidebar from '@/layouts/Admin/AdminSidebar.vue';
    import AdminFooter from '@/layouts/Admin/AdminFooter.vue';

    export default {
        components: {
            AdminHeader,
            AdminSidebar,
            AdminFooter
        }
    }
</script>

<template>
    <div>
        <AdminHeader />

        <div class="container-fluid">
            <div class="row">
                <AdminSidebar />

                <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
                    <router-view></router-view>
                </main>
            </div>
        </div>

        <AdminFooter />
    </div>
</template>
