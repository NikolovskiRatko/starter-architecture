<script setup lang="ts">
  import {
    PortletComponent,
    PortletBody,
    PortletHead,
    PortletHeadToolbar,
    PortletHeadLabel,
    FormInput,
    FormInputRadio,
    FormDropdown,
  } from "@starter-core/dash-ui";
  import { cloneDeep } from "lodash";
  import { computed, onMounted, provide, ref } from "vue";
  // import AdminUserForm from '../../../features/Admin/UsersCrud/_components/MyProfileForm.vue';
  import { useRoute } from "vue-router";
  import { user } from "../constants";
  import { CustomForm } from "@/components/Form";
  import { useForm } from "@/composables";
  import { getPhotoPath } from "@/helpers";
  import { useUserRoles } from "@/modules/users/composables";
  import { useRootStore } from "@/store/root";
  // import { useEventsBus } from "@/composables";

  const { setBackUrl, setActiveClasses } = useRootStore();

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

  const beforeSubmit = (hasToRedirect = true) => {
    onSubmitTest(postUri, redirectRoute.value, hasToRedirect);
  };
</script>

<template>
  <span>My profile form</span>
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
          <PortletHead :size="'lg'">
            <PortletHeadLabel>
              {{ $t("users.basic.information") }}
            </PortletHeadLabel>
            <PortletHeadToolbar>
              <router-link
                :loading="loading"
                :to="`/admin/users`"
                exact=""
                class="btn btn-clean kt-margin-r-10"
              >
                <i class="la la-arrow-left"></i>
                <span class="kt-hidden-mobile">{{ $t("buttons.cancel") }}</span>
              </router-link>
              <div class="btn-group">
                <button type="submit" :loading="loading" class="btn btn-brand">
                  <i class="la la-save mr-1" />
                  {{ $t("buttons.save") }}
                </button>
                <button
                  type="button"
                  class="btn btn-brand dropdown-toggle dropdown-toggle-split"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                ></button>
                <div class="dropdown-menu dropdown-menu-right">
                  <ul class="kt-nav">
                    <li class="kt-nav__item">
                      <a href="#" class="kt-nav__link">
                        <i class="kt-nav__link-icon flaticon2-reload"></i>
                        <span class="kt-nav__link-text">Save & continue</span>
                      </a>
                    </li>
                    <li class="kt-nav__item">
                      <a href="#" class="kt-nav__link">
                        <i class="kt-nav__link-icon flaticon2-power"></i>
                        <span class="kt-nav__link-text">Save & exit</span>
                      </a>
                    </li>
                    <li class="kt-nav__item">
                      <a href="#" class="kt-nav__link">
                        <i
                          class="kt-nav__link-icon flaticon2-edit-interface-symbol-of-pencil-tool"
                        ></i>
                        <span class="kt-nav__link-text">Save & edit</span>
                      </a>
                    </li>
                    <li class="kt-nav__item">
                      <a href="#" class="kt-nav__link">
                        <i class="kt-nav__link-icon flaticon2-add-1"></i>
                        <span class="kt-nav__link-text">Save & add new</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </PortletHeadToolbar>
          </PortletHead>
          <PortletBody>
            <div class="row">
              <div class="col-xl-3"></div>
              <div class="col-xl-6">
                <div class="kt-section kt-section--first">
                  <div class="kt-section__body">
                    <h3 class="kt-section__title kt-section__title-lg">
                      {{ $t("users.user_status") }}:
                    </h3>
                    <div class="form-group row">
                      <label class="col-3 col-form-label">{{
                        $t("users.roles.label")
                      }}</label>
                      <div class="col-9">
                        <FormDropdown
                          v-if="!isFetchingRoles"
                          v-model="form.role"
                          :options="roles"
                          :value="form.role"
                        />
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-3 col-form-label">{{
                        $t("users.status")
                      }}</label>
                      <div class="col-9">
                        <!--                        <FormInputRadio-->
                        <!--                            :id="'enabled'"-->
                        <!--                            v-model="form.is_disabled"-->
                        <!--                            :options="[{'id': 0, 'name':'Enabled'},{'id': 1, 'name':'Disabled'}]"-->
                        <!--                            :value="form.is_disabled"-->
                        <!--                        />-->
                      </div>
                    </div>
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
                        $t("users.avatar")
                      }}</label>
                      <div class="col-9">
                        <file-upload
                          :id="'uploaded_file'"
                          v-model="form.uploaded_file"
                          :placeholder-image="avatar"
                          :form="form"
                        />
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-3 col-form-label">{{
                        $t("users.last_name.label")
                      }}</label>
                      <div class="col-9">
                        <FormInput v-model="form.last_name" :id="'last_name'" />
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-3 col-form-label">{{
                        $t("users.first_name.label")
                      }}</label>
                      <div class="col-9">
                        <FormInput
                          v-model="form.first_name"
                          :id="'first_name'"
                        />
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-3 col-form-label">{{
                        $t("users.email.label")
                      }}</label>
                      <div class="col-9">
                        <div class="input-group">
                          <div class="input-group-prepend">
                            <span class="input-group-text"
                              ><i class="la la-at"></i
                            ></span>
                          </div>
                          <FormInput v-model="form.email" :id="'email'" />
                        </div>
                        <span class="form-text text-muted"
                          >We'll never share your email with anyone else.</span
                        >
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  class="kt-separator kt-separator--border-dashed kt-separator--space-lg"
                ></div>

                <div class="kt-section">
                  <div class="kt-section__body">
                    <h3 class="kt-section__title kt-section__title-lg">
                      {{ $t("users.password.new_password") }}:
                    </h3>
                    <div class="form-group row">
                      <label class="col-3 col-form-label">{{
                        $t("users.password.label")
                      }}</label>
                      <div class="col-9">
                        <FormInput v-model="form.password" :id="'password'" />
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-3 col-form-label">{{
                        $t("users.password.confirm")
                      }}</label>
                      <div class="col-9">
                        <FormInput
                          v-model="form.password_confirmation"
                          :id="'password_confirmation'"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-3"></div>
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
