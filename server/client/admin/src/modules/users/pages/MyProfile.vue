<script setup lang="ts">
  import { IconArrowleft, IconMail, IconSave } from "@starter-core/icons";
  import { cloneDeep } from "lodash";
  import { computed, onMounted, provide, ref } from "vue";
  // import AdminUserForm from '../../../features/Admin/UsersCrud/_components/MyProfileForm.vue';
  import { useI18n } from "vue-i18n";
  import { useRoute } from "vue-router";
  import {
    PageWrapper,
    PAGE_WRAPPER_SLOTS,
    SubheaderTitle,
  } from "../../../components";
  import { user } from "../constants";
  import { useForm } from "@/composables";
  import { getPhotoPath } from "@/helpers";
  import { useUserRoles } from "@/modules/users/composables";
  import { useRootStore } from "@/store/root";
  import {
    PortletComponent,
    PortletBody,
    FormInput,
    FormDropdown,
    DashButton,
    DashLink,
  } from "@starter-core/dash-ui";
  // import { useEventsBus } from "@/composables";

  const { setBackUrl, setActiveClasses } = useRootStore();
  const { t } = useI18n();

  onMounted(() => {
    setActiveClasses({
      main: "/users",
      sub: "edit.user",
      title: "users.myprofile",
    });
    initFormFromItem();
    // Not 100% sure but probably this is used for the same purpose as redirect route and should be removed
    setBackUrl("/");
  });

  const route = useRoute();
  const { isLoading: isFetchingRoles, data: roles } = useUserRoles();

  const item = ref(cloneDeep(user));
  // const edit = route.name == 'edit.user';
  const id = 1; //Number(route.params.userId);
  const fetchUri = `/user/${id}`;
  const {
    form,
    messageClass,
    message,
    loading,
    onSubmitTest,
    initFormFromItem,
    // clearErrors
  } = useForm(fetchUri, user);

  provide("form", form.value);
  provide("labelStart", "user");

  // const postUri = computed(() => edit ? `/user/${id}/update` : '/user/create');
  const postUri = `/user/${id}/update`;
  const redirectRoute = "users";

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

  const submitHandler = (hasToRedirect = true) => {
    onSubmitTest(postUri, redirectRoute.value, hasToRedirect);
  };
</script>

<template>
  <PageWrapper>
    <template #[PAGE_WRAPPER_SLOTS.subheaderMain]>
      <SubheaderTitle
        :title="t('users.basic.information')"
        :description="`${form.first_name} ${form.last_name}`"
      />
    </template>
    <template #[PAGE_WRAPPER_SLOTS.subheaderToolbox]>
      <DashLink to="/admin/users" :icon="IconArrowleft" theme="clean">
        {{ t("buttons.cancel") }}
      </DashLink>
      <DashButton
        type="submit"
        :icon="IconSave"
        :loading="loading"
        @click="submitHandler"
      >
        {{ t("buttons.save") }}
      </DashButton>
    </template>
    <form
      autocomplete="off"
      enctype="multipart/form-data"
      @submit.prevent="submitHandler"
      @keydown="form.errors.clear($event.target.name)"
    >
      <PortletComponent :has-sticky-header="true" :is-loading="loading">
        <PortletBody>
          <div class="kt-section kt-section--first">
            <div class="kt-section__body">
              <h3 class="kt-section__title kt-section__title-lg">
                {{ t("users.user_status") }}:
              </h3>
              <FormDropdown
                :label="t('users.roles.label')"
                v-if="!isFetchingRoles"
                v-model="form.role"
                :options="roles"
                :value="form.role"
              />
              <!--                        <FormInputRadio-->
              <!--                            :id="'enabled'"-->
              <!--                            :label="t('users.status')"-->
              <!--                            v-model="form.is_disabled"-->
              <!--                            :options="[{'id': 0, 'name':'Enabled'},{'id': 1, 'name':'Disabled'}]"-->
              <!--                            :value="form.is_disabled"-->
              <!--                        />-->
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
              <file-upload
                :label="t('users.avatar')"
                :id="'uploaded_file'"
                v-model="form.uploaded_file"
                :placeholder-image="avatar"
                :form="form"
              />
              <FormInput
                :label="t('users.last_name.label')"
                v-model="form.last_name"
                id="last_name"
              />
              <FormInput
                :label="t('users.first_name.label')"
                v-model="form.first_name"
                id="first_name"
              />
              <FormInput
                :label="t('users.email.label')"
                v-model="form.email"
                id="email"
              >
                <template v-slot:prependContent>
                  <IconMail />
                </template>
              </FormInput>
              <span class="form-text text-muted"
                >We'll never share your email with anyone else.</span
              >
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
              <FormInput
                v-model="form.password"
                :id="'password'"
                :label="t('users.password.label')"
              />
              <FormInput
                v-model="form.password_confirmation"
                id="password_confirmation"
                :label="t('users.password.confirm')"
              />
            </div>
          </div>
        </PortletBody>
      </PortletComponent>
      <!--    <unsaved-changes-modal-->
      <!--      v-if="confirmUnsavedChangesModal"-->
      <!--      @confirm-unsaved-changes="confirmUnsavedChanges"-->
      <!--      @cancel-unsaved-changes="cancelUnsavedChanges"-->
      <!--    />-->
    </form>
  </PageWrapper>
</template>
