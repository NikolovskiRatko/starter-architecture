<script lang="ts" setup>
  import { FormInput, FormSwitch } from "@starter-core/dash-ui";
  import { IconMail } from "@starter-core/icons";
  import { useI18n } from "vue-i18n";
  import UserFormAvatar from "./UserFormAvatar.vue";
  import UserRolesDropdown from "./UserRolesDropdown.vue";

  const { t } = useI18n();
  const isDisabled = defineModel("isDisabled", { required: true });
  const role = defineModel("role", { required: true });
  const lastName = defineModel("lastName", { required: true });
  const firstName = defineModel("firstName", { required: true });
  const email = defineModel("email", { required: true });
  const { errors = {} } = defineProps<{ errors: any }>();
</script>
<template>
  <div class="kt-section kt-section--first">
    <div class="kt-section__body">
      <h3 class="kt-section__title kt-section__title-lg">
        {{ t("users.user_status") }}:
      </h3>
      <user-roles-dropdown v-model:role="role" />
      <form-switch
        v-model="isDisabled"
        id="enabled"
        theme="danger"
        type="outline"
        :label="t('users.status.label')"
        :helper-text="`User is  ${isDisabled ? 'disabled' : 'enabled'}`"
      />
    </div>
  </div>

  <div
    class="kt-separator kt-separator--border-dashed kt-separator--space-lg"
  ></div>

  <div class="kt-section">
    <div class="kt-section__body">
      <h3 class="kt-section__title kt-section__title-lg">Customer Info:</h3>
      <user-form-avatar />
      <form-input
        v-model="lastName"
        name="last-name"
        :label="t('users.last_name.label')"
        :error="errors.last_name"
        is-inline
      />
      <form-input
        v-model="firstName"
        name="first-name"
        :label="t('users.first_name.label')"
        is-inline
      />
      <form-input
        v-model="email"
        name="email"
        :label="t('users.email.label')"
        helper-text="We'll never share your email with anyone else."
        is-inline
      >
        <template v-slot:prependContent>
          <IconMail />
        </template>
      </form-input>
    </div>
  </div>
</template>
