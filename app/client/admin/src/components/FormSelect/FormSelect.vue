<script setup lang="ts">
  import VueSelect from 'vue-select';
  import type { FormSelectOptions, FormSelectOnSearch } from '@/types';
  import 'vue-select/dist/vue-select.css';
  import './FormSelect.scss';

  interface FormSelectProps {
    modelValue: string | string[] | null;
    options: FormSelectOptions;
    placeholder?: string;
    taggable?: boolean;
  }

  const {
    modelValue,
    placeholder,
    options,
    taggable,
  } = defineProps<FormSelectProps>();

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string | string[] | null): void;
    (e: 'search', ...args: Parameters<FormSelectOnSearch>): void;
  }>();

  const onSearch: FormSelectOnSearch = (search, loading) => {
    emit('search', search, loading);
  };
</script>

<template>
  <VueSelect
    :model-value="modelValue"
    :options="options"
    :placeholder="placeholder"
    :taggable="taggable"
    :clearable="false"
    class="dui-form-select"
    @search="onSearch"
    @update:modelValue="emit('update:modelValue', $event)"
  />
</template>
