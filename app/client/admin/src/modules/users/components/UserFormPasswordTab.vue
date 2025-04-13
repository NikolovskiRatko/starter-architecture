<script lang="ts" setup>
  import { useI18n } from "vue-i18n";
  import { FormInput } from "@starter-core/dash-ui/src";

  const { t } = useI18n();
  const password = defineModel("password", { required: true, type: String });
</script>
<template>
  <div class="kt-section">
    <div class="kt-section__body">
      <h3 class="kt-section__title kt-section__title-lg">
        {{ t("users.password.new") }}:
      </h3>
      <div class="alert alert-danger" role="alert">
        <div class="alert-icon"><i class="flaticon-questions-circular-button"></i></div>
        <div class="alert-text">We need password reset functionality in Backend</div>
      </div>
      <form-input
        name="password"
        type="password"
        :label="t('users.password.label')"
        v-model="password"
        is-inline
      />
      <!-- <form-input
                      id="confirm-password"
                      type="password"
                      :label="t('users.password.confirm')"
                      v-model="form.password_confirmation"
                      is-inline
                    /> -->
    </div>
  </div>
</template>
