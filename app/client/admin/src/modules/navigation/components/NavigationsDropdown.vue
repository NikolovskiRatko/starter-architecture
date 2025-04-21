<script lang="ts" setup>
  import type { FormDropdownOption } from '@starter-core/dash-ui/dist/components/Form/types';
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useNavigations } from '../composables';
  import { FormDropdown } from '@starter-core/dash-ui/src';

  const { t } = useI18n();

  const { disabledOptions = [], label } = defineProps<{
    disabledOptions?: number[];
    label?: string;
  }>();

  const model = defineModel<number | null>({
    set(value) {
      const numberValue = Number(value);
      if (numberValue > 0) {
        return numberValue;
      }
      return null;
    },
    get(value) {
      if (!value) {
        return 0;
      }

      return value;
    },
  });

  const { isLoading, data: navigations } = useNavigations();

  const options = computed(() => {
    if (isLoading.value || !navigations.value) {
      return [];
    }

    const mappedOptions: FormDropdownOption[] = [
      {
        id: '0',
        name: 'None',
      },
    ];

    navigations.value.forEach((navigation) => {
      mappedOptions.push({
        id: String(navigation.id),
        name: navigation.title,
        isDisabled: disabledOptions.includes(navigation.id),
      });
    });

    return mappedOptions;
  });
  const computedLabel = computed(() => label ?? t('navigation.plural'));
</script>
<template>
  <form-dropdown v-if="!isLoading" v-model="model" id="navigation" :options="options" :label="computedLabel" is-inline />
</template>
