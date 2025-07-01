<script setup lang="ts">
  import { IconSave, IconArrowleft } from '@starter-core/icons';
  import { useI18n } from 'vue-i18n';
  import { useRouter } from 'vue-router';
  import { PageWrapper, SubheaderTitle, PAGE_WRAPPER_SLOTS } from '@/components';
  import { useAppErrors } from '@/composables';
  import { UserFormBasicInfo } from '@/modules/users/components';
  import UserRolesDropdown from '@/modules/users/components/UserRolesDropdown.vue';
  import { useCreateUser, useUserForm } from '@/modules/users/composables';
  import { USER_ROUTES_DATA } from '@/modules/users/constants';
  import { DashButton, DashLink, PortletComponent, PortletBody, FormInput } from '@starter-core/dash-ui/src';

  const { t } = useI18n();
  const router = useRouter();
  const { mutateAsync: createUser } = useCreateUser();
  const { handleSubmit, errors, form, setErrors } = useUserForm();
  const { handleAPIError } = useAppErrors({ setErrors });
  const { role, lastName, firstName, email, password, passwordConfirmation } = form;

  const submitHandler = handleSubmit((values) => {
    createUser(values)
      .then((user) => {
        router.push({ name: USER_ROUTES_DATA.edit.name, params: { userId: user.id } });
      })
      .catch(handleAPIError);
  });
</script>
<template>
  <PageWrapper size="large" justify-content="center">
    <template #[PAGE_WRAPPER_SLOTS.subheaderMain]>
      <SubheaderTitle title="Add user" />
    </template>
    <template #[PAGE_WRAPPER_SLOTS.subheaderToolbox]>
      <DashLink to="/admin/users" :icon="IconArrowleft" theme="clean">
        {{ t('buttons.back') }}
      </DashLink>
      <DashButton type="submit" :icon="IconSave" :loading="false" @click="submitHandler">
        {{ t('buttons.save') }}
      </DashButton>
    </template>
    <PortletComponent>
      <PortletBody>
        <form autocomplete="off" enctype="multipart/form-data" @submit.prevent="submitHandler">
          <UserRolesDropdown v-model:role="role" :error="errors.role" />
          <UserFormBasicInfo v-model:lastName="lastName" v-model:email="email" v-model:firstName="firstName" :errors="errors" />
          <FormInput
            v-model="password"
            type="password"
            name="password"
            id="password"
            :label="t('users.password.label')"
            :error="errors.password"
            is-inline
          />
          <FormInput
            v-model="passwordConfirmation"
            type="password"
            name="password-confirmation"
            id="password-confirmation"
            :label="t('users.password.confirm')"
            :error="errors.password_confirmation"
            is-inline
          />
        </form>
      </PortletBody>
    </PortletComponent>
  </PageWrapper>
</template>
