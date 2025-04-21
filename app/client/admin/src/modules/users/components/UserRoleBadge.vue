<script setup lang="ts">
  import { computed } from 'vue';
  import type { UserRoleId } from '../types';
  import UserRole from './UserRole.vue';
  import { BadgeComponent } from '@starter-core/dash-ui/src';

  const { userRoleId } = defineProps<{ userRoleId: UserRoleId }>();

  const badgeTheme = computed(() => {
    switch (userRoleId) {
      case 1:
        return 'danger';
      case 2:
        return 'success';
      case 3:
        return 'primary';
      default:
        return '';
    }
  });
</script>
<template>
  <span>
    <BadgeComponent :theme="badgeTheme" is-inline is-pill>
      <UserRole :userRoleId="userRoleId" />
    </BadgeComponent>
  </span>
</template>
