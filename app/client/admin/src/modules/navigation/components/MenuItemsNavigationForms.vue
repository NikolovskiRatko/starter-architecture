<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useCreateNavigationMenuItem } from '../composables';
  import { MENU_ITEMS_NAVIGATION_ACCORDIONS_IDS } from '../constants';
  import type { Navigation } from '../types';
  import NavigationsForm from './NavigationsForm.vue';
  import { useBEMBuilder } from '@/helpers';
  import { AccordionContent, AccordionItem, DashButton, FormInput } from '@starter-core/dash-ui/src';
  import './MenuItemsNavigationForms.scss';

  const { externalNavigation: externalNavigationAccordionId, internalNavigation: internalNavigationAccordionId } =
    MENU_ITEMS_NAVIGATION_ACCORDIONS_IDS;

  const [block, element] = useBEMBuilder('menu-items-navigation-forms');
  const { t } = useI18n();

  const { menuId } = defineProps<{ menuId: number }>();
  const { mutate: createNavigationItem } = useCreateNavigationMenuItem();

  const selectedNavigations = ref<Navigation[]>([]);
  const externalUrl = ref<string>('');
  const externalNavigationLabel = ref<string>('');
  const activeAccordion = ref<string>('');

  const addHandler = () => {
    if (activeAccordion.value === externalNavigationAccordionId) {
      createNavigationItem({
        label: selectedNavigations.value[0].title,
        navigation_id: selectedNavigations.value[0].id,
        menu_id: menuId,
      });
    } else {
      createNavigationItem({
        label: externalNavigationLabel.value,
        external_url: externalUrl.value,
        menu_id: menuId,
      });
    }
  };

  const isSubmitDisabled = computed(() => {
    if (activeAccordion.value === externalNavigationAccordionId) {
      return !selectedNavigations.value.length || menuId <= 0;
    }
    return !externalUrl.value || menuId <= 0;
  });

  const onAccordionChangeHandler = (id: string) => {
    activeAccordion.value = id;
  };
</script>
<template>
  <div :class="block">
    <AccordionContent @onAccordionChange="onAccordionChangeHandler">
      <AccordionItem :label="t('navigation.external')" :id="externalNavigationAccordionId">
        <div :class="element('content').value">
          <NavigationsForm v-model="selectedNavigations" />
          <DashButton size="sm" @click="addHandler" :state="isSubmitDisabled ? 'disabled' : undefined">
            {{ t('navigation.add-to-menu') }}
          </DashButton>
        </div>
      </AccordionItem>
      <AccordionItem :label="t('navigation.internal')" :id="internalNavigationAccordionId">
        <div :class="element('content').value">
          <FormInput
            id="external-url-label"
            v-model="externalNavigationLabel"
            :label="t('navigation.external-navigation-label')"
            name="Menu item label"
          />
          <FormInput id="external-url" v-model="externalUrl" :label="t('navigation.external-url')" name="External url" />
          <DashButton size="sm" @click="addHandler" :state="isSubmitDisabled ? 'disabled' : undefined">
            {{ t('navigation.add-to-menu') }}
          </DashButton>
        </div>
      </AccordionItem>
    </AccordionContent>
  </div>
</template>
