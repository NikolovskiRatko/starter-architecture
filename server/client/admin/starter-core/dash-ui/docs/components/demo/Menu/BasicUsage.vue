<script setup lang="ts">
import NavMenu from "../../../../src/components/Menu/NavMenu/NavMenu.vue";
import { navMenu } from "./constants/data";
</script>
<template>
  <div class="kt-header-menu-wrapper kt-header-menu-wrapper--aside-enabled">
    <div class="kt-header">
      <NavMenu
          :data="navMenu"
          type="horizontal"
          theme="classic"
      />
    </div>
  </div>
</template>
<style>
@import "https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css";
</style>
