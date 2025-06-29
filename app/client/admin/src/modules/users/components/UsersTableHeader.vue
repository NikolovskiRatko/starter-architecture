<script lang="ts" setup>
  import { IconAdduser } from '@starter-core/icons';
  import { useAuth } from '@websanova/vue-auth/src/v3.js';
  import { computed } from 'vue';
  import { USER_ROUTES_DATA } from '../constants';
  import { DashLink } from '@starter-core/dash-ui/src';

  const auth = useAuth();
  const { add } = USER_ROUTES_DATA;

  const isUserAllowedToCreate = computed(() => auth.user().permissions_array.includes('write_users'));
</script>
<template>
  <DashLink v-if="isUserAllowedToCreate" :to="{ name: add.name }" :icon="IconAdduser" theme="secondary">
    {{ $t('admin.users.add') }}
  </DashLink>
</template>
