<script setup lang="ts">
  import { debounce } from 'lodash';
  import { ref, computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { FormSelect } from '@/components';
  import { useUsersTable } from '@/modules/users/composables';
  import type { FormSelectOption, FormSelectOptions } from '@/types';
  import { INITIAL_QUERY_DATA } from '@starter-core/dash-ui/src/constants';
  import type { TableQuery } from '@starter-core/dash-ui/src/types';
  const { t } = useI18n();
  const query = ref<TableQuery>(INITIAL_QUERY_DATA);
  const { data } = useUsersTable(query);
  const emit = defineEmits<{
    'update:modelValue': [value: number];
  }>();
  const props = defineProps<{ modelValue: number | null }>();
  const computedOptions = computed<FormSelectOptions>(() => {
    if (!data) {
      return [];
    }
    return (data?.value?.data ?? []).map(({ last_name, first_name, id }) => ({
      label: `${first_name} ${last_name}`,
      value: id,
    }));
  });
  const model = computed({
    get: () => {
      return computedOptions.value.find((option) => option.value === props.modelValue);
    },
    set: (newValue: FormSelectOption) => {
      const stringValue = newValue?.value ?? newValue;
      emit('update:modelValue', Number(stringValue));
      return true;
    },
  });
  const searchHandler = debounce(async (search) => {
    if (search.length) {
      query.value.search = search;
    }
  }, 350);
</script>
<template>
  <FormSelect v-model="model" :options="computedOptions" :placeholder="t('users.label')" @search="searchHandler" />
</template>
