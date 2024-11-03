<script setup lang="ts">
  import { NavMenu } from "@starter-core/dash-ui/src";
  import { HeaderTopBar } from "@/components";
  import { useInitialData } from "@/composables";
  import "./AdminHeader.scss";

  const { data } = useInitialData();

  // activeTopSubmenu
  // setActiveTopSubmenu
</script>
<template>
  <div class="kt-header">
    <button
      id="kt_header_menu_mobile_close_btn"
      class="kt-header-menu-wrapper-close"
    >
      <i class="la la-close" />
    </button>
    <div id="kt_header_menu_wrapper" class="kt-header-menu-wrapper">
      <div
        id="kt_header_menu"
        class="kt-header-menu kt-header-menu-mobile kt-header-menu--layout-default"
      >
        <NavMenu :data="data.navMenu" type="horizontal" />
      </div>
    </div>
    <HeaderTopBar />
  </div>
</template>
