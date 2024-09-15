<script setup lang="ts">
  import { useAuth } from "@websanova/vue-auth/src/v3.js";
  import { storeToRefs } from "pinia";
  import { provide, ref, toRefs } from "vue";
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
  const { sidebarState } = storeToRefs(rootStore);
  const auth = useAuth();

  const { minimized } = toRefs(sidebarState.value);
  const [block, element] = useBEMBuilder(
    "admin-layout",
    ref({
      "aside-minimized": minimized,
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
            'aside-minimized': sidebarState.minimized,
          }),
        ).value
      "
    >
      <AdminHeader />
      <div :class="element('content').value">
        <router-view :key="$route.fullPath" />
      </div>
    </div>
  </div>
</template>

<!--    <dialogs-wrapper wrapper-name="default" />-->
