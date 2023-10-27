<script>
    import './Admin.scss';

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
        <!-- @TOC -->
        <!-- =================================================== -->
        <!--
          + @Page Loader
          + @App Content
              - #Left Sidebar
                  > $Sidebar Header
                  > $Sidebar Menu

              - #Main
                  > $Topbar
                  > $App Screen Content
        -->

        <!-- @Page Loader -->
        <!-- =================================================== -->
<!--        <div id='loader'>-->
<!--            <div class="spinner"></div>-->
<!--        </div>-->

        <!-- @App Content -->
        <!-- =================================================== -->
        <div>
            <AdminSidebar />

            <!-- #Main ============================ -->
            <div class="page-container">
                <AdminHeader />

                <router-view></router-view>

                <AdminFooter />
            </div>
        </div>
    </div>
</template>
