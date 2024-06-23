<script setup lang="ts">
  import { navMenu as navMenuData } from "@/data/navMenu";
  import { HeaderTopBar } from "@/components/Admin";
  import { NavMenu } from "@starter-core/dash-ui";
  import "./AdminHeader.scss";

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
        <NavMenu :data="navMenuData" type="horizontal" />
      </div>
    </div>
    <HeaderTopBar />
  </div>
</template>
