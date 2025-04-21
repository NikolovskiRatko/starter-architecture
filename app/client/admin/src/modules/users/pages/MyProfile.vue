<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import { PageWrapper, PAGE_WRAPPER_SLOTS, SubheaderTitle } from '../../../components';
  import { UserProfileWidget } from '../components';

  const { t } = useI18n();
</script>

<template>
  <PageWrapper size="large">
    <template #[PAGE_WRAPPER_SLOTS.subheaderMain]>
      <SubheaderTitle :title="t('users.my-profile.label')" />
    </template>
    <div class="row">
      <div class="col-lg-5 col-xl-3">
        <UserProfileWidget />
      </div>
      <div class="col-lg-7 col-xl-9">
        <router-view />
      </div>
    </div>
  </PageWrapper>
</template>
