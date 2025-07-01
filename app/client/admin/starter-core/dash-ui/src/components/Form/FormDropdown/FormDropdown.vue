<script setup lang="ts">
  import { computed } from "vue";
  import type { FormDropdownProps } from "../types";
  import FormGroup from "../FormGroup/FormGroup.vue";
  import FormHelperText from "../FormHelperText/FormHelperText.vue";
  import "./FormDropdown.scss";

  const { label, id, isInline, error, helperText, isDisabled, options } =
    defineProps<FormDropdownProps>();

  const model = defineModel({
    required: true,
    type: String
  });

  const hasDefaultOption = computed(() => !options.some(
    (option) => option.id === String(model.value)
  ));
</script>

<template>
  <form-group :is-inline="isInline" class-name="form-dropdown" :id="id">
    <template v-slot:label>
      {{ label }}
    </template>
    <template v-slot:input>
      <select
        :id="id"
        :name="id"
        :class="[
          'form-dropdown__input',
          {
            'form-dropdown__input--error': errors?.length,
          },
        ]"
        :disabled="isDisabled"
        v-model="model"
      >
        <option v-if="hasDefaultOption" value="">Select an Option</option>
        <option
          v-for="option in options"
          :key="option.id"
          :value="option.id"
          :disabled="option.isDisabled"
        >
          {{ option.name }}
        </option>
      </select>
      <FormHelperText :text="helperText" :error="error" />
    </template>
  </form-group>
</template>
