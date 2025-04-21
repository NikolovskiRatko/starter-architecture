<script lang="ts" setup>
  import { IconSave, IconArrowleft } from '@starter-core/icons';
  import { useForm } from 'vee-validate';
  import { watch, computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRoute } from 'vue-router';
  import { UserFormPasswordTab, UserFormBasicInfo } from '../components';
  import { useUsersForm } from '../composables';
  import type { UserFormItem } from '../types';
  import { TabbedContent, TabbedContentTab, PageWrapper, PAGE_WRAPPER_SLOTS, SubheaderTitle, SkSection } from '@/components';
  import UserRolesDropdown from '@/modules/users/components/UserRolesDropdown.vue';
  import { DashButton, DashLink, FormSwitch } from '@starter-core/dash-ui/src';

  const { t } = useI18n();
  const personalInformationLabel = t('users.personal-information.label');
  const changePasswordLabel = t('users.password.change');
  const route = useRoute();
  const isEditPage = computed(() => route.name == 'edit.user');
  const userId = Number(route.params.userId);

  const validationSchema = {
    last_name(value: string) {
      if (value?.length >= 5) return true;
      return 'Name needs to be at least 5 characters.';
    },
  };

  const { isLoading, data: formData, createUser, updateUser, uploadAvatar } = useUsersForm(userId);

  const { handleSubmit, errors, setValues, defineField } = useForm<UserFormItem>({
    validationSchema,
  });

  const submitHandler = handleSubmit((values) => {
    if (isEditPage.value) {
      updateUser(values);
    } else {
      createUser(values);
    }
  });

  const uploadAvatarHandler = (file: File) => {
    uploadAvatar(file);
  };

  watch(() => {
    if (formData.value) {
      setValues({
        id: formData.value.id,
        email: formData.value.email,
        first_name: formData.value.first_name,
        last_name: formData.value.last_name,
        role: formData.value.role,
        is_disabled: formData.value.is_disabled,
      });
    }
  }, [formData]);

  const [lastName] = defineField('last_name');
  const [firstName] = defineField('first_name');
  const [email] = defineField('email');
  const [isDisabled] = defineField('is_disabled');
  const [role] = defineField('role');
  const [password] = defineField('password');
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
            <user-roles-dropdown v-model:role="role" />
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
            <UserFormBasicInfo
              v-model:lastName="lastName"
              v-model:email="email"
              v-model:firstName="firstName"
              :avatar="formData?.avatar_thumbnail"
              @upload-avatar="uploadAvatarHandler"
              :errors="errors"
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
