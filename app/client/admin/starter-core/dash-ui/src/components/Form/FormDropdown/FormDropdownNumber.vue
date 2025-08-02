<script setup lang="ts">
import { computed } from 'vue';
import FormDropdown from './FormDropdown.vue';
import type { FormDropdownProps } from '../types';

const props = defineProps<Omit<FormDropdownProps, 'modelValue'>>();
const model = defineModel<number | null>({ required: true });

const internalValue = computed({
  get() {
    return model.value != null ? String(model.value) : '';
  },
  set(value: string) {
    const numericValue = Number(value);
    model.value = isNaN(numericValue) || value === '' ? null : numericValue;
  },
});
</script>

<template>
  <FormDropdown
    v-bind="props"
    v-model="internalValue"
  />
</template>
