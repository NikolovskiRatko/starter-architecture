<script setup lang="ts">
  import { IconSave } from "@starter-core/icons";
  import { useForm } from "vee-validate";
  import { useI18n } from "vue-i18n";
  import * as yup from "yup";
  import { useAppErrors } from "../../../composables";
  import type { UpdatePasswordForm } from "../types";
  import { useMyProfile } from "@/modules/users/composables";
  import { DashButton, FormInput } from "@starter-core/dash-ui/src";

  const { t } = useI18n();
  const { isLoading, updatePassword } = useMyProfile();

  const validationSchema = yup.object().shape({
    current_password: yup.string().required(),
    password: yup.string().min(5).required(),
    password_confirmation: yup
      .string()
      .required()
      .oneOf([yup.ref("password")], t("users.password.messages.confirmed")),
  });

  const { handleSubmit, errors, defineField, setErrors, resetForm } =
    useForm<UpdatePasswordForm>({
      validationSchema,
    });
  const { handleAPIError } = useAppErrors({ setErrors, translator: t });

  const [currentPassword] = defineField("current_password");
  const [password] = defineField("password");
  const [passwordConfirmation] = defineField("password_confirmation");

  const submitHandler = handleSubmit((values) => {
    updatePassword(values)
      .then(() => {
        resetForm();
      })
      .catch(handleAPIError);
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
          type="password"
          name="currentPassword"
          id="current-password"
          :label="t('users.password.current')"
          :error="errors.current_password"
        />
        <FormInput
          v-model="password"
          type="password"
          name="password"
          id="password"
          :label="t('users.password.new')"
          :error="errors.password"
        />
        <FormInput
          v-model="passwordConfirmation"
          type="password"
          name="password_confirmation"
          id="password-confirmation"
          :label="t('users.password.confirm')"
          :error="errors.password_confirmation"
        />
        <DashButton type="submit" :icon="IconSave" :loading="isLoading">
          {{ t("users.password.change") }}
        </DashButton>
      </form>
    </div>
  </div>
</template>
