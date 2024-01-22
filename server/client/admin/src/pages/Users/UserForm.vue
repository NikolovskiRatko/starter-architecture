<script lang="ts" setup>
import { ref, provide, computed, onMounted } from "vue";
import { cloneDeep } from "lodash";
import { useRoute } from "vue-router";
import { useForm } from "@/composables";
import {
  FormDropdown,
  FormInputRadio,
  FormInput,
  CustomForm,
} from "@/components/Form";
import { getPhotoPath } from "@/utils/imageProcessing";
import { user } from "@/utils/Objects";
import { get } from "@/services/HTTP";
import {
  PortletComponent,
  PortletBody,
  PortletHead,
  PortletHeadLabel,
} from "@starter-core/dash-ui";

const route = useRoute();

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

const postUri = computed(() => (edit ? `/user/${id}/update` : "/user/create"));
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
    const userAvatar = media.find((o) => o.collection_name === "user_avatars");
    if (userAvatar) {
      return getPhotoPath(userAvatar, 400);
    }
  }
  return "";
});

const beforeSubmit = (hasToRedirect = true) => {
  onSubmit(postUri.value, redirectRoute.value, hasToRedirect);
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
                        <FormDropdown v-model="form.role" :options="roles" />
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-3 col-form-label">{{
                        $t("users.status")
                      }}</label>
                      <div class="col-9">
                        <FormInputRadio
                          :id="'enabled'"
                          v-model="form.is_disabled"
                          :options="[
                            { id: 0, name: 'Enabled' },
                            { id: 1, name: 'Disabled' },
                          ]"
                        />
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
                        <FormInput v-model="form.last_name" />
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-3 col-form-label">{{
                        $t("users.first_name.label")
                      }}</label>
                      <div class="col-9">
                        <FormInput v-model="form.first_name" />
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
                          <FormInput v-model="form.email" />
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
                        <FormInput v-model="form.password" />
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-3 col-form-label">{{
                        $t("users.password.confirm")
                      }}</label>
                      <div class="col-9">
                        <FormInput v-model="form.password_confirmation" />
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
