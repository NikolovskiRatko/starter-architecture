<script setup lang="ts">
  import './AdminHeader.scss';

  import { storeToRefs } from 'pinia';
  import { navMenu as navMenuData } from '@/data/navMenu';
  import { NavMenu, HeaderTopBar } from '@/components/Admin';
  import { useRootStore } from '@/store/root';

  const rootStore = useRootStore();
  const { sidebarState } = storeToRefs(rootStore);

  // activeTopSubmenu
  // setActiveTopSubmenu
</script>
<template>
  <div class="kt-header kt-header--fixed" :class="{
    'kt-header--sidebar-minimized': sidebarState.minimized
  }">
    <button
      id="kt_header_menu_mobile_close_btn"
      class="kt-header-menu-wrapper-close"
    >
      <i class="la la-close" />
    </button>
    <div
      id="kt_header_menu_wrapper"
      class="kt-header-menu-wrapper"
    >
      <div
        id="kt_header_menu"
        class="kt-header-menu kt-header-menu-mobile  kt-header-menu--layout-default "
      >
        <NavMenu :data="navMenuData" />
      </div>
    </div>
    <HeaderTopBar />
  </div>
</template>
