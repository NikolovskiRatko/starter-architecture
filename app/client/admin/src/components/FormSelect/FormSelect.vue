<script setup lang="ts">
  import VueSelect from 'vue-select';
  import 'vue-select/dist/vue-select.css';
  import './FormSelect.scss';

  defineProps<{
    modelValue: string | string[] | null;
    options: (string | { label: string; value: string })[];
    placeholder?: string;
    multiple?: boolean;
  }>();

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string | string[] | null): void;
  }>();
</script>

<template>
  <VueSelect
    :model-value="modelValue"
    :options="options"
    :placeholder="placeholder"
    :multiple="multiple"
    taggable
    :clearable="false"
    class="dui-form-select"
    @update:modelValue="emit('update:modelValue', $event)"
  />
</template>
