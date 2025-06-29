<script lang="ts" setup>
  import { IconMail } from '@starter-core/icons';
  import { useI18n } from 'vue-i18n';
  import { FormInput } from '@starter-core/dash-ui/src';

  interface UserFormBasicInfoProps {
    errors: any;
  }

  const { t } = useI18n();
  const lastName = defineModel('lastName', { required: true, type: String });
  const firstName = defineModel('firstName', { required: true, type: String });
  const email = defineModel('email', { required: true, type: String });
  const { errors = {} } = defineProps<UserFormBasicInfoProps>();
</script>
<template>
  <form-input v-model="firstName" name="first-name" :label="t('users.first_name.label')" is-inline />
  <form-input v-model="lastName" name="last-name" :label="t('users.last_name.label')" :error="errors.last_name" is-inline />
  <form-input
    v-model="email"
    name="email"
    :label="t('users.email.label')"
    helper-text="You can't update your email."
    is-inline
    readonly
  >
    <template v-slot:prependContent>
      <IconMail />
    </template>
  </form-input>
</template>
