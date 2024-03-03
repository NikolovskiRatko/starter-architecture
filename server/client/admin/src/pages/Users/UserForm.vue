<script lang="ts" setup>
  import { computed, watch } from "vue";
  import { useForm } from "vee-validate";
  import { useI18n } from "vue-i18n";
  import { useRoute } from "vue-router";
  import type { UserFormItem } from "@/types/userformitem";
  import { useUserRoles } from "@/composables/vue-query/useUserRoles";
  // import { getPhotoPath } from "@/utils/imageProcessing;
  import {
    PortletComponent,
    PortletBody,
    PortletHead,
    PortletHeadLabel,
    PortletHeadToolbar,
    DashButton,
    DashLink,
    FormInput,
    FormDropdown,
    FormSwitch,
  } from "@starter-core/dash-ui";
  import { IconSave, IconArrowleft, IconMail } from "@starter-core/icons";
  import { useUsersForm } from "./useUsersForm";

  const route = useRoute();
  const { t } = useI18n();

  const { handleSubmit, errors, setValues, defineField } =
    useForm<UserFormItem>({
      validationSchema: {
        last_name(value: string) {
          if (value?.length >= 5) return true;
          return "Name needs to be at least 5 characters.";
        },
      },
    });

  const id = String(route.params.userId);
  const postUri = computed(() =>
    route.name == "edit.user" ? `/user/${id}/update` : "/user/create",
  );

  const {
    isLoading,
    data: formData,
    saveUser,
  } = useUsersForm({
    id: String(route.params.userId),
    postUrl: postUri.value,
    getUrl: `/user/${id}/get`,
  });

  const { isLoading: isFetchingRoles, data: roles } = useUserRoles();

  // const avatar = computed(() => {
  //   const { media } = formData.value;
  //   if (media != undefined) {
  //     const userAvatar = media.find(
  //       (o) => o.collection_name === "user_avatars",
  //     );
  //     if (userAvatar) {
  //       return getPhotoPath(userAvatar, 400);
  //     }
  //   }
  //   return "";
  // });

  const submitHandler = handleSubmit((values) => {
    saveUser(values);
  });

  watch(() => {
    if (formData.value) {
      setValues(formData.value);
    }
  }, [formData.value]);

  const [lastName] = defineField("last_name");
  const [firstName] = defineField("first_name");
  const [email] = defineField("email");
  const [isDisabled] = defineField("is_disabled");
  const [role] = defineField("role");
  const [password] = defineField("password");
</script>

<template>
  <form
    class="container-fluid"
    autocomplete="off"
    enctype="multipart/form-data"
    @submit.prevent="submitHandler"
  >
    <div class="row">
      <div class="col-12">
        <PortletComponent :has-sticky-header="true" :is-loading="isLoading">
          <PortletHead size="lg">
            <PortletHeadLabel>
              {{ t("users.basic.information") }}
            </PortletHeadLabel>
            <PortletHeadToolbar>
              <DashLink to="/admin/users" :icon="IconArrowleft">
                {{ t("buttons.back") }}
              </DashLink>
              <DashButton type="submit" :icon="IconSave" :loading="isLoading">
                {{ t("buttons.save") }}
              </DashButton>
            </PortletHeadToolbar>
          </PortletHead>
          <PortletBody>
            <div class="row">
              <div class="col-xl-8 offset-2">
                <div class="kt-section kt-section--first">
                  <div class="kt-section__body">
                    <h3 class="kt-section__title kt-section__title-lg">
                      {{ t("users.user_status") }}:
                    </h3>
                    <form-dropdown
                      v-if="!isFetchingRoles"
                      v-model="role"
                      id="role"
                      :options="roles"
                      :label="t('users.roles.label')"
                      is-inline
                    />
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
                    <h3 class="kt-section__title kt-section__title-lg">
                      Customer Info:
                    </h3>
                    <!-- <div class="form-group row">
                      <label class="col-3 col-form-label">{{
                        t("users.avatar")
                      }}</label>
                      <div class="col-9">
                        <file-upload
                          id="uploaded_file"
                          v-model="image"
                          :placeholder-image="avatar"
                        />
                      </div>
                    </div> -->
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

                <div
                  class="kt-separator kt-separator--border-dashed kt-separator--space-lg"
                ></div>

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
              </div>
            </div>
          </PortletBody>
        </PortletComponent>
      </div>
    </div>
  </form>
</template>
