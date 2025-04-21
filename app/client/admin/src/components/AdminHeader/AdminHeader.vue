<script setup lang="ts">
  import { HeaderTopBar } from '@/components';
  import { useInitialData } from '@/composables';
  import { NavMenu, MenuItem } from '@starter-core/dash-ui/src';

  import './AdminHeader.scss';

  const { data } = useInitialData();

  // activeTopSubmenu
  // setActiveTopSubmenu
</script>
<template>
  <div class="kt-header">
    <button id="kt_header_menu_mobile_close_btn" class="kt-header-menu-wrapper-close">
      <i class="la la-close" />
    </button>
    <div id="kt_header_menu_wrapper" class="kt-header-menu-wrapper">
      <div id="kt_header_menu" class="kt-header-menu kt-header-menu-mobile kt-header-menu--layout-default">
        <NavMenu v-if="data" type="horizontal">
          <MenuItem
            v-for="navMenuItem in data.navMenu"
            :key="`${navMenuItem.label}-menu-item`"
            :item="navMenuItem"
            :style="'icons'"
            :is-active="navMenuItem.isActive"
            is-top-level-item
          />
        </NavMenu>
      </div>
    </div>
    <HeaderTopBar />
  </div>
</template>
