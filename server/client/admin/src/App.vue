<script setup lang="ts">
  import { useAuth } from "@websanova/vue-auth/src/v3.js";
  import { computed } from "vue";
  import { isTouchDevice } from "@/helpers";
  import { useRootStore } from "@/store/root";
  import "@starter-core/dash-ui/src/assets/main.scss";
  // eslint-disable-next-line import/no-unresolved
  import "@starter-core/dash-ui/index.css";
  import "./App.scss";

  const auth = useAuth();
  const rootStore = useRootStore();
  const touchDevice = isTouchDevice();

  const isAuthLoaded = computed(() => auth.ready());

  const bodyStyles = computed(() => {
    const { isBodyOverflowing, modalOpen, scrollBarWidth, navMenuOpen } =
      rootStore.bodyClasses;

    if (isTouchDevice() && isBodyOverflowing) {
      if (modalOpen || navMenuOpen) {
        return `padding-right:${scrollBarWidth}px;`;
      }
    }

    return "";
  });
</script>

<template>
  <router-view
    v-show="isAuthLoaded"
    :style="bodyStyles"
    :class="[
      'main-wrapper',
      {
        'main-wrapper--modal-open': rootStore.bodyClasses.modalOpen,
        'main-wrapper--dimmed': rootStore.bodyClasses.navMenuOpen,
        'main-wrapper--nav-search-active':
          rootStore.bodyClasses.navSearchActive,
        'main-wrapper--touch-device': touchDevice,
        'main-wrapper--no-touch-device': !touchDevice,
      },
    ]"
  />
  <!-- Main tag from subview is displayed instead of this-->
</template>
