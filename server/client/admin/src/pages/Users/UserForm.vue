<script lang="ts" setup>
  import { ref, provide, computed, onMounted } from "vue";
  import { cloneDeep } from "lodash";
  import { useI18n } from "vue-i18n";
  import { useRoute } from "vue-router";
  import { useForm } from "@/composables";
  import { FormDropdown, CustomForm } from "@/components/Form";
  import { getPhotoPath } from "@/utils/imageProcessing";
  import { user } from "@/utils/Objects";
  import { get } from "@/services/HTTP";
  import {
    PortletComponent,
    PortletBody,
    PortletHead,
    PortletHeadLabel,
    PortletHeadToolbar,
    DashButton,
    DashLink,
    FormInput,
    FormInputRadio,
  } from "@starter-core/dash-ui";
  import { IconSave, IconArrowleft, IconMail } from "@starter-core/icons";

  const route = useRoute();
  const { t } = useI18n();

  const item = ref(cloneDeep(user));
  const edit = route.name == "edit.user";
  const id = Number(route.params.userId);
  const fetchUri = `/user/${id}/get`;
  const roles = ref([]);
  const {
    form,
    messageClass,
    message,
    loading,
    onSubmit,
    initFormFromItem,
    clearErrors,
  } = useForm(fetchUri, user);

  provide("form", form.value);
  provide("labelStart", "user");

  const postUri = computed(() =>
    edit ? `/user/${id}/update` : "/user/create",
  );
  const redirectRoute = "users";

  const fetchRoles = async () => {
    try {
      const response = await get("user/roles/get");
      roles.value = response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const avatar = computed(() => {
    const { media } = item.value;
    if (media != undefined) {
      const userAvatar = media.find(
        (o) => o.collection_name === "user_avatars",
      );
      if (userAvatar) {
        return getPhotoPath(userAvatar, 400);
      }
    }
    return "";
  });

  const beforeSubmit = (hasToRedirect = true) => {
    onSubmit(postUri.value, redirectRoute.value, hasToRedirect);
  };

  const getErrors = (key: string) => {
    if (form.value.errors.has(key)) {
      return form.value.errors[key];
    }
  };

  onMounted(() => {
    initFormFromItem();
    fetchRoles();
  });
</script>

<template>
  <CustomForm
    class="container-fluid"
    autocomplete="off"
    enctype="multipart/form-data"
    @beforeSubmit="beforeSubmit"
    @keydown="form.errors.clear($event.target.name)"
  >
    <div class="row">
      <div class="col-12">
        <PortletComponent :has-sticky-header="true" :is-loading="loading">
          <PortletHead size="lg">
            <PortletHeadLabel>
              {{ t("users.basic.information") }}
            </PortletHeadLabel>
            <PortletHeadToolbar>
              <DashLink to="/admin/users" :icon="IconArrowleft">
                {{ t("buttons.cancel") }}
              </DashLink>
              <DashButton :icon="IconSave" :loading="loading">
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
                      id="role"
                      :errors="getErrors('role')"
                      v-model="form.role"
                      :options="roles"
                      :label="t('users.roles.label')"
                    />
                    <form-input-radio
                      id="enabled"
                      :label="t('users.status.label')"
                      v-model="form.is_disabled"
                      :options="[
                        { id: 0, name: 'Enabled' },
                        { id: 1, name: 'Disabled' },
                      ]"
                      type="bold"
                      :error="getErrors('enabled')"
                      is-inline
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
                    <div class="form-group row">
                      <label class="col-3 col-form-label">{{
                        t("users.avatar")
                      }}</label>
                      <div class="col-9">
                        <file-upload
                          id="uploaded_file"
                          v-model="form.uploaded_file"
                          :placeholder-image="avatar"
                          :form="form"
                        />
                      </div>
                    </div>
                    <form-input
                      v-model="form.last_name"
                      id="last-name"
                      :label="t('users.last_name.label')"
                      :has-error="form.errors.has('last-name')"
                      is-inline
                    />
                    <form-input
                      v-model="form.first_name"
                      id="first-name"
                      :label="t('users.first_name.label')"
                      :has-error="form.errors.has('first-name')"
                      is-inline
                    />
                    <form-input
                      id="email"
                      v-model="form.email"
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
                      id="password"
                      type="password"
                      :label="t('users.password.label')"
                      v-model="form.password"
                      is-inline
                    />
                    <form-input
                      id="confirm-password"
                      type="password"
                      :label="t('users.password.confirm')"
                      v-model="form.password_confirmation"
                      is-inline
                    />
                  </div>
                </div>
              </div>
            </div>
          </PortletBody>
        </PortletComponent>
      </div>
    </div>
    <!--    <unsaved-changes-modal-->
    <!--      v-if="confirmUnsavedChangesModal"-->
    <!--      @confirm-unsaved-changes="confirmUnsavedChanges"-->
    <!--      @cancel-unsaved-changes="cancelUnsavedChanges"-->
    <!--    />-->
  </CustomForm>
</template>
