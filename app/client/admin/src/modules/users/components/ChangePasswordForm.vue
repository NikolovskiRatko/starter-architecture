<script setup lang="ts">
  import { IconSave } from "@starter-core/icons";
  import { useForm } from "vee-validate";
  import { useI18n } from "vue-i18n";
  import { DashButton, FormInput } from "@starter-core/dash-ui/src";

  const { t } = useI18n();

  const { handleSubmit, errors, defineField } = useForm<{
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }>({
    validationSchema: {},
  });

  const [currentPassword] = defineField("currentPassword");
  const [newPassword] = defineField("newPassword");
  const [confirmPassword] = defineField("confirmPassword");

  const submitHandler = handleSubmit((values) => {
    console.log(values);
  });
</script>
<template>
  <div class="kt-section">
    <div class="kt-section__body">
      <form
        autocomplete="off"
        enctype="multipart/form-data"
        @submit.prevent="submitHandler"
      >
        <FormInput
          v-model="currentPassword"
          name="currentPassword"
          id="current-password"
          :label="t('users.password.current')"
          :error="errors.currentPassword"
        />
        <FormInput
          v-model="newPassword"
          name="newPassword"
          id="new-password"
          :label="t('users.password.new')"
          :error="errors.newPassword"
        />
        <FormInput
          v-model="confirmPassword"
          name="confirmPassword"
          id="confirm-password"
          :label="t('users.password.confirm')"
          :error="errors.confirmPassword"
        />
        <DashButton type="submit" :icon="IconSave" :loading="false">
          {{ t("users.password.change") }}
        </DashButton>
      </form>
    </div>
  </div>
</template>
