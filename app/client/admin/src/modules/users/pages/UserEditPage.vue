<script lang="ts" setup>
  import { IconSave, IconArrowleft } from '@starter-core/icons';
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRoute } from 'vue-router';
  import { UserFormPasswordTab, UserFormBasicInfo, UserFormAvatar } from '../components';
  import { useGetUser, useUpdateUser, useUploadAvatar, useUserForm } from '../composables';
  import { TabbedContent, TabbedContentTab, PageWrapper, PAGE_WRAPPER_SLOTS, SubheaderTitle, SkSection } from '@/components';
  import UserRolesDropdown from '@/modules/users/components/UserRolesDropdown.vue';
  import { DashButton, DashLink, FormSwitch } from '@starter-core/dash-ui/src';

  const { t } = useI18n();
  const personalInformationLabel = t('users.personal-information.label');
  const changePasswordLabel = t('users.password.change');
  const route = useRoute();
  const userId = computed(() => Number(route.params.userId));

  const { isLoading: isUserLoading, data: formData } = useGetUser(userId);
  const { mutate: updateUser, isPending: isUserUpdating } = useUpdateUser(userId);
  const { uploadAvatar, isLoading: isUploadingAvatar } = useUploadAvatar({ userId });

  const { handleSubmit, errors, form } = useUserForm(formData);
  const { lastName, firstName, email, role, password, isDisabled } = form;

  const isLoading = computed(() => isUserUpdating.value || isUploadingAvatar.value || isUserLoading.value);

  const submitHandler = handleSubmit((values) => {
    updateUser(values);
  });

  const uploadAvatarHandler = (file: File) => {
    uploadAvatar(file);
  };
</script>

<template>
  <PageWrapper size="large" justify-content="center">
    <template #[PAGE_WRAPPER_SLOTS.subheaderMain]>
      <SubheaderTitle title="Edit user" :description="`${firstName} ${lastName}`" />
    </template>
    <template #[PAGE_WRAPPER_SLOTS.subheaderToolbox]>
      <DashLink to="/admin/users" :icon="IconArrowleft" theme="clean">
        {{ t('buttons.back') }}
      </DashLink>
      <DashButton type="submit" :icon="IconSave" :loading="isLoading" @click="submitHandler">
        {{ t('buttons.save') }}
      </DashButton>
    </template>
    <form autocomplete="off" enctype="multipart/form-data" @submit.prevent="submitHandler">
      <TabbedContent :isLoading="isLoading">
        <TabbedContentTab :label="personalInformationLabel" id="basic-info">
          <SkSection :title="t('users.user_status')">
            <UserRolesDropdown v-model:role="role" />
            <form-switch
              v-model="isDisabled"
              id="enabled"
              theme="danger"
              type="outline"
              :label="t('users.status.label')"
              :helper-text="`User is  ${isDisabled ? 'disabled' : 'enabled'}`"
            />
          </SkSection>
          <SkSection title="Customer Info">
            <UserFormAvatar :user-id="userId" :src="formData?.avatar_thumbnail" />
            <UserFormBasicInfo
              v-model:lastName="lastName"
              v-model:email="email"
              v-model:firstName="firstName"
              :avatar="formData?.avatar_thumbnail"
              @uploadAvatar="uploadAvatarHandler"
              :errors="errors"
              has-read-only-email
            />
          </SkSection>
        </TabbedContentTab>
        <TabbedContentTab :label="changePasswordLabel" id="change-password">
          <UserFormPasswordTab v-model:password="password" />
        </TabbedContentTab>
      </TabbedContent>
    </form>
  </PageWrapper>
</template>
