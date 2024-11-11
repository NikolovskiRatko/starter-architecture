<script lang="ts" setup>
  import { IconArrowleft, IconSave, IconPlus } from "@starter-core/icons";
  import { useForm } from "vee-validate";
  import { computed, watch } from "vue";
  import { useI18n } from "vue-i18n";
  import { useRoute, useRouter } from "vue-router";
  import {
    PageWrapper,
    SubheaderTitle,
    PAGE_WRAPPER_SLOTS,
  } from "../../../components";
  import { NavigationsDropdown } from "../components";
  import {
    useNavigation,
    useNavigationCreate,
    useNavigations,
  } from "../composables";
  import { NAVIGATION_ROUTES_DATA } from "../constants";
  import { NavigationForm } from "../types";
  import {
    FormInput,
    FormSwitch,
    PortletComponent,
    PortletBody,
    DashButton,
    DashLink,
  } from "@starter-core/dash-ui/src";

  const { mutateAsync: createNavigation } = useNavigationCreate();

  const { t } = useI18n();
  const route = useRoute();
  const router = useRouter();
  const navigationId = computed(() => Number(route.params.navigationId));
  const isEditPage = computed(
    () => route.name == NAVIGATION_ROUTES_DATA.editNavigation.name,
  );

  const { handleSubmit, errors, setValues, defineField } =
    useForm<NavigationForm>({
      initialValues: {
        visible: true,
      },
    });

  const { data, isLoading } = useNavigation(navigationId);
  const { data: navigations } = useNavigations();

  watch(data, () => {
    if (data.value) {
      setValues({
        title: data.value.title,
        slug: data.value.slug,
        visible: data.value.visible,
        parent_id: data.value.parent_id,
      });
    }
  });

  const [title] = defineField("title");
  const [slug] = defineField("slug");
  const [visible] = defineField("visible");
  const [parentId] = defineField("parent_id");

  const submitHandler = handleSubmit((values) => {
    if (isEditPage.value) {
      console.log("edit", values);
    } else {
      createNavigation({
        title: values.title,
        parent_id: values.parent_id ?? null,
        slug: values.slug,
        visible: values.visible,
      }).then(() => {
        router.push({ name: NAVIGATION_ROUTES_DATA.main.name });
      });
    }
  });

  const slugPrepend = computed(() => {
    if (parentId && navigations.value) {
      const parentNavigation = navigations.value.find(
        ({ id: navigationId }) => {
          return parentId.value === navigationId;
        },
      );

      if (parentNavigation) {
        return `${parentNavigation.slug}`;
      }
    }

    return "/";
  });
</script>
<template>
  <PageWrapper>
    <template #[PAGE_WRAPPER_SLOTS.subheaderMain]>
      <SubheaderTitle title="Edit navigation" :description="data?.title" />
    </template>
    <template #[PAGE_WRAPPER_SLOTS.subheaderToolbox]>
      <DashLink
        :to="{ name: NAVIGATION_ROUTES_DATA.main.name }"
        :icon="IconArrowleft"
        theme="clean"
      >
        {{ t("buttons.back") }}
      </DashLink>
      <DashButton
        type="submit"
        :icon="isEditPage ? IconSave : IconPlus"
        :loading="isLoading"
        @click="submitHandler"
      >
        {{ isEditPage ? t("navigation.save") : t("navigation.add") }}
      </DashButton>
    </template>
    <PortletComponent :isLoading="isLoading">
      <PortletBody>
        <form autocomplete="off" @submit.prevent="submitHandler">
          <NavigationsDropdown
            v-model="parentId"
            :disabled-options="navigationId ? [navigationId] : undefined"
            :label="t('navigation.parent')"
          />
          <FormInput v-model="title" name="title" label="Title" is-inline />
          <FormInput v-model="slug" name="slug" label="Slug" is-inline>
            <template v-slot:prependContent>
              {{ slugPrepend }}
            </template>
          </FormInput>
          <FormSwitch v-model="visible" id="visible" label="Visible" />
        </form>
      </PortletBody>
    </PortletComponent>
  </PageWrapper>
</template>
