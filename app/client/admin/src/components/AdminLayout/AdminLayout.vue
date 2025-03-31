<script setup lang="ts">
  import { storeToRefs } from "pinia";
  import { provide, ref } from "vue";
  import { AdminHeader, AdminSidebar } from "@/components";
  import { useBEMBuilder } from "@/helpers";
  import { useRootStore } from "@/store/root";
  import { layoutConfigKey } from "@/types";
  import "./AdminLayout.scss";

  const layoutConfig = {
    hasSubHeader: false,
    hasSubHeaderFixed: false,
  };

  const rootStore = useRootStore();
  const { isSidebarMinimized } = storeToRefs(rootStore);

  const [block, element] = useBEMBuilder(
    "admin-layout",
    ref({
      "aside-minimized": isSidebarMinimized,
    }),
  );

  provide(layoutConfigKey, layoutConfig);
</script>

<template>
  <div :class="block">
    <div :class="element('aside').value">
      <AdminSidebar />
    </div>
    <div
      :class="
        element(
          'main',
          ref({
            'has-subheader': layoutConfig.hasSubHeader,
            'fixed-subheader':
              layoutConfig.hasSubHeader && layoutConfig.hasSubHeaderFixed,
            'aside-minimized': isSidebarMinimized,
          }),
        ).value
      "
    >
      <AdminHeader />
      <router-view :key="$route.fullPath" />
    </div>
  </div>
</template>

<!--    <dialogs-wrapper wrapper-name="default" />-->
