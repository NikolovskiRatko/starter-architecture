<script lang="ts" setup>
  import { FormInput } from "@starter-core/dash-ui/src";
  import { useI18n } from "vue-i18n";

  const { t } = useI18n();
  const password = defineModel("password", { required: true });
</script>
<template>
  <div class="kt-section">
    <div class="kt-section__body">
      <h3 class="kt-section__title kt-section__title-lg">
        {{ t("users.password.new_password") }}:
      </h3>
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
