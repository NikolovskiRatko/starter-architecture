<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { computed } from 'vue';
  import { isTouchDevice } from '@/helpers';
  import { useRootStore } from '@/store/root';
  import { useAuthStore } from '@/stores/auth';
  import 'bootstrap-4-grid/scss/grid.scss';
  import '@starter-core/dash-ui/src/assets/normalize.scss';
  import '@starter-core/dash-ui/src/assets/starter-variables.scss';
  import '@starter-core/dash-ui/src/assets/helpers.scss';
  import './App.scss';

  const authStore = useAuthStore();
  const { isInitialised } = storeToRefs(authStore);
  const rootStore = useRootStore();
  const touchDevice = isTouchDevice();

  const bodyStyles = computed(() => {
    const { isBodyOverflowing, modalOpen, scrollBarWidth, navMenuOpen } = rootStore.bodyClasses;

    if (isTouchDevice() && isBodyOverflowing) {
      if (modalOpen || navMenuOpen) {
        return `padding-right:${scrollBarWidth}px;`;
      }
    }

    return '';
  });
</script>

<template>
  <router-view
    v-show="isInitialised"
    :style="bodyStyles"
    :class="[
      'main-wrapper',
      {
        'main-wrapper--modal-open': rootStore.bodyClasses.modalOpen,
        'main-wrapper--dimmed': rootStore.bodyClasses.navMenuOpen,
        'main-wrapper--nav-search-active': rootStore.bodyClasses.navSearchActive,
        'main-wrapper--touch-device': touchDevice,
        'main-wrapper--no-touch-device': !touchDevice,
      },
    ]"
  />
</template>
