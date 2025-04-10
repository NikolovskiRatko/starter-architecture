<script setup lang="ts">
  import { IconSave } from "@starter-core/icons";
  import { useForm } from "vee-validate"; //useForm custom hook remove this
  import { watch } from "vue";
  import { useI18n } from "vue-i18n";
  import { UserFormBasicInfoTab } from "../components";
  import { useAuth } from "@/composables";
  import { useUsersForm } from "@/modules/users/composables";
  import type { UserFormItem } from "@/modules/users/types";
  import {
    PortletComponent,
    PortletBody,
    PortletHead,
    PortletHeadLabel,
    DashButton,
  } from "@starter-core/dash-ui/src";

  const { t } = useI18n();

  const title = t("users.personal-information.label");

  const { user: authUser } = useAuth();

  const id = authUser.value.id;

  const {
    isLoading,
    data: formData,
    updateUser,
    uploadAvatar,
  } = useUsersForm(id);

  const validationSchema = {
    last_name(value: string) {
      if (value?.length >= 5) return true;
      return "Name needs to be at least 5 characters.";
    },
  };

  const { handleSubmit, errors, setValues, defineField } =
    useForm<UserFormItem>({
      validationSchema,
    });

  const submitHandler = handleSubmit((values) => {
    // Let's validate in the Backend if the user is not allowed to write_users to block him
    updateUser(values);
  });

  const uploadAvatarHandler = (file: File) => {
    uploadAvatar(file);
  };

  watch(() => {
    if (formData.value) {
      setValues({
        id: formData.value.id,
        email: formData.value.email,
        first_name: formData.value.first_name,
        last_name: formData.value.last_name,
      });
    }
  }, [formData]);

  const [lastName] = defineField("last_name");
  const [firstName] = defineField("first_name");
  const [email] = defineField("email");
</script>

<template>
  <PortletComponent>
    <PortletHead>
      <PortletHeadLabel>
        {{ title }}
      </PortletHeadLabel>
    </PortletHead>
    <PortletBody size="large">
      <form
        autocomplete="off"
        enctype="multipart/form-data"
        @submit.prevent="submitHandler"
      >
        <UserFormBasicInfoTab
          v-model:lastName="lastName"
          v-model:email="email"
          v-model:firstName="firstName"
          :errors="errors"
          :avatar="formData?.avatar_thumbnail"
          @upload-avatar="uploadAvatarHandler"
        />
        <DashButton
          type="submit"
          :icon="IconSave"
          :loading="isLoading"
          @click="submitHandler"
        >
          {{ t("buttons.save") }}
        </DashButton>
        <!--    <unsaved-changes-modal-->
        <!--      v-if="confirmUnsavedChangesModal"-->
        <!--      @confirm-unsaved-changes="confirmUnsavedChanges"-->
        <!--      @cancel-unsaved-changes="cancelUnsavedChanges"-->
        <!--    />-->
      </form>
    </PortletBody>
  </PortletComponent>
</template>
