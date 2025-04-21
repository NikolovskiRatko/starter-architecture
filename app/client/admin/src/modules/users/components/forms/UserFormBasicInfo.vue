<script lang="ts" setup>
  import { IconMail } from '@starter-core/icons';
  import { useI18n } from 'vue-i18n';
  import UserFormAvatar from '../UserFormAvatar.vue';
  import { FormInput } from '@starter-core/dash-ui/src';

  type EmitsType = {
    (event: 'uploadAvatar', file: File): void;
  };

  const { t } = useI18n();
  const lastName = defineModel('lastName', { required: true, type: String });
  const firstName = defineModel('firstName', { required: true, type: String });
  const email = defineModel('email', { required: true, type: String });
  const { errors = {}, avatar } = defineProps<{
    errors: any;
    avatar: string | null;
  }>();
  const emit = defineEmits<EmitsType>();

  const uploadAvatar = (file: File) => {
    emit('uploadAvatar', file);
  };
</script>
<template>
  <div class="form-group form-input form-group--inline">
    <div class="form-group__column form-group__column--left form-group__column--inline">
      <label class="form-group__label" for="avatar">{{ t('users.avatar') }}</label>
    </div>
    <div class="form-group__column form-group__column--left form-group__column--inline">
      <user-form-avatar :src="avatar" @change="uploadAvatar" is-circle is-outline />
    </div>
  </div>
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
