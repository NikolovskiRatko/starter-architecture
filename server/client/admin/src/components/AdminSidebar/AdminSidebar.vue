<script setup lang="ts">
  import { storeToRefs } from "pinia";
  import { ref } from "vue";
  import { AsideBrand } from "@/components";
  import { useSideMenu } from "@/composables";
  import { useRootStore } from "@/store/root";
  import { NavMenu } from "@starter-core/dash-ui/src";
  import "./AdminSidebar.scss";

  const { mainMenu } = useSideMenu();
  const rootStore = useRootStore();
  const { sidebarState, isSidebarMinimized } = storeToRefs(rootStore);
  const emit = defineEmits(["sidebarHover"]);

  const blockToggle = ref<boolean>(false);

  const toggleSidebar = () => {
    if (!blockToggle.value) {
      blockToggle.value = true;
      sidebarState.value.minimized = !isSidebarMinimized.value;
      if (!isSidebarMinimized.value) {
        sidebarState.value.minimizeHover = false;
      }

      window.setTimeout(() => {
        blockToggle.value = false;
      }, 300);

      emit("sidebarHover", sidebarState);
    }
  };

  const sidebarHover = (isOver: boolean) => {
    if (isSidebarMinimized.value && !blockToggle.value) {
      sidebarState.value.minimizeHover = isOver;
      emit("sidebarHover", sidebarState);
    }
  };
</script>

<template>
  <!--<button class="aside-close " id="kt_aside_close_btn"><i class="la la-close"></i></button>-->
  <div
    class="aside"
    :class="{
      'aside--minimize': isSidebarMinimized,
      'aside--minimize-hover': sidebarState.minimizeHover
    }"
    @mouseover="sidebarHover(true)"
    @mouseleave="sidebarHover(false)"
  >
    <AsideBrand @toggleSidebar="toggleSidebar" />

    <div class="aside__menu-wrapper">
      <div
        class="aside__menu"
        :class="{
          'aside__menu--minimize':
            isSidebarMinimized && !sidebarState.minimizeHover,
          'aside__menu--minimize-hover': sidebarState.minimizeHover
        }"
      >
        <NavMenu
          :data="mainMenu"
          :is-minimized="isSidebarMinimized && !sidebarState.minimizeHover"
          type="vertical"
        />
      </div>
    </div>
  </div>
</template>
