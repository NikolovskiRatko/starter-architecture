<script setup lang="ts">
  import { onMounted } from 'vue';
  import { UsersDatatable } from '../components';
  import { PageWrapper } from '@/components';
  import { useRootStore } from '@/store/root';

  const { setBackUrl, setActiveClasses } = useRootStore();

  onMounted(() => {
    setBackUrl('/');
    setActiveClasses({
      main: 'users',
      sub: 'users',
      title: 'users.title',
      hasFilters: 'users',
    });
  });
</script>
<template>
  <PageWrapper>
    <UsersDatatable />
  </PageWrapper>
</template>
