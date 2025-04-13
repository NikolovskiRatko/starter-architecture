<script setup lang="ts">
  import { IconSave } from "@starter-core/icons";
  import { useForm } from "vee-validate";
  import { watch } from "vue";
  import { useI18n } from "vue-i18n";
  import { UserFormBasicInfo } from "../components";
  import { useMyProfile } from "../composables";
  import type { UserMyProfileForm } from "../types";
  import {
    PortletComponent,
    PortletBody,
    PortletHead,
    PortletHeadLabel,
    DashButton,
  } from "@starter-core/dash-ui/src";

  const { t } = useI18n();
  const {
    isLoading,
    data: formData,
    updateUser,
    uploadAvatar,
  } = useMyProfile();

  const validationSchema = {
    last_name(value: string) {
      if (value?.length >= 5) return true;
      return "Name needs to be at least 5 characters.";
    },
  };

  const { handleSubmit, errors, setValues, defineField } =
    useForm<UserMyProfileForm>({
      validationSchema,
    });

  const submitHandler = handleSubmit((values) => {
    updateUser(values);
  });

  const uploadAvatarHandler = (file: File) => {
    uploadAvatar(file);
  };

  watch(() => {
    if (formData.value) {
      setValues({
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
        {{ t("users.personal-information.label") }}
      </PortletHeadLabel>
    </PortletHead>
    <PortletBody size="large">
      <form
        autocomplete="off"
        enctype="multipart/form-data"
        @submit.prevent="submitHandler"
      >
        <UserFormBasicInfo
          v-model:lastName="lastName"
          v-model:email="email"
          v-model:firstName="firstName"
          :avatar="formData?.avatar_thumbnail"
          @upload-avatar="uploadAvatarHandler"
          :errors="errors"
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
