<script setup lang="ts">
  import type { ComputedRef } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { UserAvatarUpload } from '../UserAvatarUpload';
  import { useUploadAvatar } from '@/modules/users/composables';

  interface UserFormAvatarProps {
    src?: string | null;
    userId?: ComputedRef<number>;
  }

  type EmitsType = {
    (event: 'upload'): void;
  };
  const emit = defineEmits<EmitsType>();

  const { t } = useI18n();
  const { userId, src } = defineProps<UserFormAvatarProps>();
  const { uploadAvatar } = useUploadAvatar({
    userId,
    onSuccess: () => {
      emit('upload');
    },
  });

  const uploadAvatarHandler = (file: File) => {
    uploadAvatar(file);
  };
</script>
<template>
  <div class="form-group form-input form-group--inline">
    <div class="form-group__column form-group__column--left form-group__column--inline">
      <label class="form-group__label" for="avatar">{{ t('users.avatar') }}</label>
    </div>
    <div class="form-group__column form-group__column--left form-group__column--inline">
      <UserAvatarUpload :src="src" @change="uploadAvatarHandler" is-circle is-outline />
    </div>
  </div>
</template>
