<script setup lang="ts">
  import { storeToRefs } from "pinia";
  import { ref } from "vue";
  import { AsideBrand } from "@/components";
  import { useSideMenu } from "@/composables";
  import { useRootStore } from "@/store/root";
  import "./AdminSidebar.scss";

  import { NavMenu } from "@starter-core/dash-ui";

  const { items: menuItems } = useSideMenu();
  const rootStore = useRootStore();
  const { sidebarState } = storeToRefs(rootStore);
  const emit = defineEmits(["sidebarHover"]);

  const clearMinimizingTimeout = ref<number>(0);
  const blockToggle = ref<boolean>(false);

  const setMinimizing = () => {
    clearTimeout(clearMinimizingTimeout.value);
    sidebarState.value.minimizing = true;
    clearMinimizingTimeout.value = window.setTimeout(() => {
      sidebarState.value.minimizing = false;
    }, 300);
  };

  const toggleSidebar = () => {
    const { minimized } = sidebarState.value;
    if (!blockToggle.value) {
      blockToggle.value = true;
      sidebarState.value.minimized = !minimized;
      if (!minimized) {
        sidebarState.value.minimizeHover = false;
      }

      window.setTimeout(() => {
        blockToggle.value = false;
      }, 300);

      setMinimizing();
      emit("sidebarHover", sidebarState);
    }
  };

  const sidebarHover = (isOver: boolean) => {
    const { minimized } = sidebarState.value;
    if (minimized && !blockToggle.value) {
      sidebarState.value.minimizeHover = isOver;
      setMinimizing();
      emit("sidebarHover", sidebarState);
    }
  };
</script>

<template>
  <!--<button class="aside-close " id="kt_aside_close_btn"><i class="la la-close"></i></button>-->
  <div
    class="aside"
    :class="{
      'aside--minimize': sidebarState.minimized,
      'aside--minimize-hover': sidebarState.minimizeHover,
      'aside--minimizing': sidebarState.minimizing,
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
            sidebarState.minimized && !sidebarState.minimizeHover,
          'aside__menu--minimize-hover': sidebarState.minimizeHover,
          'aside__menu--minimizing': sidebarState.minimizing,
        }"
      >
        <NavMenu
          :data="menuItems"
          :is-minimized="sidebarState.minimized && !sidebarState.minimizeHover"
          type="vertical"
        />
      </div>
    </div>
  </div>
</template>
