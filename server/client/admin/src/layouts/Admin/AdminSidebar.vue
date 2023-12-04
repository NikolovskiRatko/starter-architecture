<script setup lang="ts">
import "./AdminSidebar.scss";

import { computed, onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import useAuthComp from "@/composables/useAuthComp";
import { useRootStore } from "@/store/root";
import AsideBrand from "@/components/Admin/AsideBrand.vue";
import FirstLevelMenuItem from "@/components/Admin/FirstLevelMenuItem.vue";

const { permissionsArray } = useAuthComp();
const rootStore = useRootStore();
const { mainMenu, sidebarState } = storeToRefs(rootStore);
const { setMenu, setSidebarState } = rootStore;
const emit = defineEmits(["sidebarHover"]);

const clearMinimizingTimeout = ref<number>(0);
const blockToggle = ref<boolean>(false);

const menuItems = computed(() => {
  return (
    mainMenu.value.filter((menuItem) =>
      permissionsArray.value.includes(menuItem.permission),
    ) || []
  );
});

const setMinimizing = () => {
  clearTimeout(clearMinimizingTimeout.value);
  sidebarState.value.minimizing = true;
  clearMinimizingTimeout.value = window.setTimeout(() => {
    sidebarState.value.minimizing = false;
    console.log("minimizingOff");
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

onMounted(() => {
  setMenu([]);
});
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
        <ul class="kt-menu__nav">
          <li class="kt-menu__section">
            <h4 class="kt-menu__section-text">Main</h4>
            <i class="kt-menu__section-icon flaticon-more-v2" />
          </li>

          <first-level-menu-item
            v-for="(item, key) in menuItems"
            :key="key"
            :item="item"
          />
        </ul>
      </div>
    </div>
  </div>
</template>
