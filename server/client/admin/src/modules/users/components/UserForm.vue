<script lang="ts" setup>
  import { DashButton, DashLink } from "@starter-core/dash-ui";
  import { IconSave, IconArrowleft } from "@starter-core/icons";
  import { useForm } from "vee-validate";
  import { watch } from "vue";
  import { useI18n } from "vue-i18n";
  import { TabbedContent, TabbedContentTab } from "../../../components";
  import { useUsersForm } from "../composables";
  import type { UserFormItem } from "../types";
  import UserFormBasicInfoTab from "./UserFormBasicInfoTab.vue";
  import UserFormPasswordTab from "./UserFormPasswordTab.vue";

  const { t } = useI18n();

  const validationSchema = {
    last_name(value: string) {
      if (value?.length >= 5) return true;
      return "Name needs to be at least 5 characters.";
    },
  };

  const { isLoading, data: formData, saveUser } = useUsersForm();

  const { handleSubmit, errors, setValues, defineField } =
    useForm<UserFormItem>({
      validationSchema,
    });

  const submitHandler = handleSubmit((values) => {
    saveUser(values);
  });

  watch(() => {
    if (formData.value) {
      setValues(formData.value);
    }
  }, [formData]);

  const [lastName] = defineField("last_name");
  const [firstName] = defineField("first_name");
  const [email] = defineField("email");
  const [isDisabled] = defineField("is_disabled");
  const [role] = defineField("role");
  const [password] = defineField("password");
</script>

<template>
  <form
    autocomplete="off"
    enctype="multipart/form-data"
    @submit.prevent="submitHandler"
  >
    <TabbedContent :isLoading="isLoading">
      <TabbedContentTab label="Basic info" id="basic-info">
        <UserFormBasicInfoTab
          v-model:isDisabled="isDisabled"
          v-model:role="role"
          v-model:lastName="lastName"
          v-model:email="email"
          v-model:firstName="firstName"
          :errors="errors"
        />
      </TabbedContentTab>
      <TabbedContentTab label="Change password" id="change-password">
        <UserFormPasswordTab v-model:password="password" />
      </TabbedContentTab>
    </TabbedContent>

    <DashLink to="/admin/users" :icon="IconArrowleft" theme="clean">
      {{ t("buttons.back") }}
    </DashLink>
    <DashButton type="submit" :icon="IconSave" :loading="isLoading">
      {{ t("buttons.save") }}
    </DashButton>
  </form>
</template>
