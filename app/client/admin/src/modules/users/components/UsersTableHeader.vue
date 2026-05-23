<script lang="ts" setup>
  import { IconAdduser } from '@starter-core/icons';
  import { computed } from 'vue';
  import { USER_ROUTES_DATA } from '../constants';
  import { useCan } from '@/composables/useCan';
  import { DashLink } from '@starter-core/dash-ui/src';

  const { hasPermission } = useCan();
  const { add } = USER_ROUTES_DATA;

  const isUserAllowedToCreate = computed(() => hasPermission('write_users'));
</script>
<template>
  <DashLink v-if="isUserAllowedToCreate" :to="{ name: add.name }" :icon="IconAdduser" theme="secondary">
    {{ $t('admin.users.add') }}
  </DashLink>
</template>
