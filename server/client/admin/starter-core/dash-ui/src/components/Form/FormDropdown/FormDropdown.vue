<script setup lang="ts">
  import { toRefs } from "vue";
  import type { FormDropdownProps } from "../types";
  import FormGroup from "../FormGroup/FormGroup.vue";
  import "./FormDropdown.scss";

  const props = defineProps<FormDropdownProps>();
  const emit = defineEmits<{
    "update:modelValue": [value: number];
  }>();
  const { label, id, isInline } = props;
  const { modelValue, errors, isDisabled, options } = toRefs(props);
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
        :value="modelValue"
        :disabled="isDisabled"
        @input="
          (event: Event) => {
            emit(
              'update:modelValue',
              Number((event.target as HTMLInputElement).value),
            );
          }
        "
      >
        <option value="">Select an Option</option>
        <option
          v-for="option in options"
          :key="option.id"
          :selected="option.id == modelValue"
          :value="option.id"
        >
          {{ option.name }}
        </option>
      </select>
      <div v-if="errors?.length" class="form-dropdown__error">
        <span v-for="error in errors" :key="error">
          {{ error }}
        </span>
      </div>
    </template>
  </form-group>
</template>
