<script lang="ts" setup>
  import { IconArrowleft, IconSave, IconPlus } from '@starter-core/icons';
  import { useForm } from 'vee-validate';
  import { computed, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRoute, useRouter } from 'vue-router';
  import * as yup from 'yup';
  import { PageWrapper, SubheaderTitle, PAGE_WRAPPER_SLOTS } from '../../../components';
  import { useNavigation, useNavigationCreate, useNavigations } from '../composables';
  import { NAVIGATION_ROUTES_DATA } from '../constants';
  import { useNavigationDropdownOptions } from '../helpers';
  import type { NavigationForm } from '../types';
  import {
    FormInput,
    FormSwitch,
    PortletComponent,
    PortletBody,
    DashButton,
    DashLink,
    FormDropdownNumber,
  } from '@starter-core/dash-ui/src';

  const { mutateAsync: createNavigation } = useNavigationCreate();

  const { t } = useI18n();
  const route = useRoute();
  const router = useRouter();
  const navigationId = computed(() => Number(route.params.navigationId));
  const isEditPage = computed(() => route.name == NAVIGATION_ROUTES_DATA.editNavigation.name);

  const validationSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    parent_id: yup
      .number()
      .nullable()
      .transform((value, originalValue) => (String(originalValue).trim() === '' ? null : value)),
    slug: yup.string().when('parent_id', {
      is: (val: number | null) => val !== null,
      then: (schema) =>
        schema.required('Slug is required').matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase and use hyphens only'),
      otherwise: (schema) => schema.notRequired().nullable(),
    }),
    visible: yup.boolean().required(),
  });

  const { handleSubmit, errors, setValues, defineField } = useForm<NavigationForm>({
    initialValues: {
      visible: 1,
      parent_id: null,
      slug: '',
    },
    validationSchema,
  });

  const { data, isLoading } = useNavigation(navigationId);
  const { data: navigations } = useNavigations();
  const parentNavigationDropdownOptions = useNavigationDropdownOptions(
    navigations,
    computed(() => (navigationId?.value ? [navigationId.value] : undefined))
  );

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

  const [title] = defineField('title');
  const [slug] = defineField('slug');
  const [visible] = defineField('visible');
  const [parentId] = defineField('parent_id');

  const submitHandler = handleSubmit((values) => {
    if (isEditPage.value) {
      console.log('edit', values);
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
    if (!isEditPage.value) {
      if (parentId.value && navigations.value) {
        const parentNavigation = navigations.value.find((navigation) => navigation.id === parentId.value);

        if (parentNavigation) {
          return parentNavigation.path;
        }
      }

      return '/';
    }

    if (!data?.value?.parent_path) {
      return '/';
    }

    return `${data.value.parent_path}/`;
  });
  const isStatic = computed(() => data?.value?.static);
</script>
<template>
  <PageWrapper>
    <template #[PAGE_WRAPPER_SLOTS.subheaderMain]>
      <SubheaderTitle title="Edit navigation" :description="data?.title" />
    </template>
    <template #[PAGE_WRAPPER_SLOTS.subheaderToolbox]>
      <DashLink :to="{ name: NAVIGATION_ROUTES_DATA.main.name }" :icon="IconArrowleft" theme="clean">
        {{ t('buttons.back') }}
      </DashLink>
      <DashButton
        v-if="!isStatic"
        type="submit"
        :icon="isEditPage ? IconSave : IconPlus"
        :loading="isLoading"
        @click="submitHandler"
      >
        {{ isEditPage ? t('navigation.save') : t('navigation.add') }}
      </DashButton>
    </template>
    <PortletComponent :isLoading="isLoading">
      <PortletBody>
        <form autocomplete="off" @submit.prevent="submitHandler">
          <FormDropdownNumber
            v-if="!isStatic"
            v-model="parentId"
            id="navigation"
            :options="parentNavigationDropdownOptions"
            :label="t('navigation.parent')"
            :error="errors?.parent_id"
            is-inline
          />
          <FormInput v-model="title" name="title" label="Title" :disabled="isStatic" is-inline :error="errors.title" />
          <FormInput v-model="slug" name="slug" label="Slug" :disabled="isStatic" :error="errors.slug" is-inline>
            <template v-slot:prependContent>
              {{ slugPrepend }}
            </template>
          </FormInput>
          <FormSwitch v-if="!isStatic" v-model="visible" id="visible" label="Visible" />
          <span v-else>Visible</span>
        </form>
      </PortletBody>
    </PortletComponent>
  </PageWrapper>
</template>
