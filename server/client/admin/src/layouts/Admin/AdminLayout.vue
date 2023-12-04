<script setup lang="ts">
import { onMounted, provide } from "vue";
import { storeToRefs } from "pinia";
import { useAuth } from "@websanova/vue-auth/src/v3.js";
import AdminHeader from "@/layouts/Admin/AdminHeader.vue";
import AdminSidebar from "@/layouts/Admin/AdminSidebar.vue";
import { GridComponent, GridItem } from "@/components/Grid";
import { useRootStore } from "@/store/root";
import { layoutConfigKey } from "./types/Admin";
import "./Admin.scss";

const layoutConfig = {
  hasFixedHeader: true,
  hasSubHeader: false,
  hasSubHeaderFixed: false,
};

const rootStore = useRootStore();
const { setMenu } = rootStore;
const { sidebarState } = storeToRefs(rootStore);
const auth = useAuth();

provide(layoutConfigKey, layoutConfig);

onMounted(() => {
  auth.load().then(async () => {
    if (auth.check()) {
      await rootStore.setData();
    }
  });
});
</script>

<template>
  <div
    class="kt-quick-panel--right kt-demo-panel--right kt-offcanvas-panel--right aside--enabled aside--fixed"
  >
    <GridComponent direction="horizontal" isRoot>
      <GridItem className="kt-page" isFluid>
        <GridComponent direction="vertical">
          <AdminSidebar />
          <GridItem isFluid>
            <div
              class="wrapper-page"
              :class="{
                'wrapper-page--fixed-header': layoutConfig.hasFixedHeader,
                'wrapper-page--has-subheader': layoutConfig.hasSubHeader,
                'wrapper-page--fixed-subheader':
                  layoutConfig.hasSubHeader && layoutConfig.hasSubHeaderFixed,
                'wrapper-page--aside-minimized': sidebarState.minimized,
              }"
            >
              <GridComponent direction="horizontal">
                <GridItem>
                  <AdminHeader />
                </GridItem>
                <GridItem isFluid>
                  <div class="wrapper-page__content">
                    <router-view :key="$route.fullPath" />
                  </div>
                </GridItem>
              </GridComponent>
            </div>
          </GridItem>
        </GridComponent>
      </GridItem>
    </GridComponent>

    <dialogs-wrapper wrapper-name="default" />
  </div>
</template>
