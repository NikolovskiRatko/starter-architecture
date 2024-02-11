<script setup lang="ts">
  import { computed } from "vue";
  import { storeToRefs } from "pinia";
  import { useRootStore } from "@/store/root";
  import {
    IconAngledoubleleft,
    IconAngledoubleright,
  } from "@starter-core/icons";
  import "./AsideBrand.scss";

  const rootStore = useRootStore();
  const { sidebarState } = storeToRefs(rootStore);

  const isLogoVisible = computed(
    () =>
      !sidebarState.value.minimized ||
      (sidebarState.value.minimized && sidebarState.value.minimizeHover),
  );
</script>

<template>
  <div class="kt-aside__brand">
    <div class="kt-aside__brand-logo">
      <router-link to="/admin/dashboard">
        <img
          v-if="isLogoVisible"
          alt="Logo"
          src="/build/images/sm_logo_white.png"
        />
      </router-link>
    </div>
    <div class="kt-aside__brand-tools">
      <button
        class="kt-aside__brand-aside-toggler"
        @click="$emit('toggleSidebar')"
      >
        <IconAngledoubleright v-if="sidebarState.minimized" size="26" />
        <IconAngledoubleleft v-else size="26" />
      </button>
      <button
        class="kt-aside__brand-aside-toggler kt-aside__brand-aside-toggler--left"
        @click="$emit('toggleSidebar')"
      >
        <span />
      </button>
    </div>
  </div>
</template>
