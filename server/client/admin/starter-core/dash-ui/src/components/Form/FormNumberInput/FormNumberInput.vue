<script setup lang="ts">
import { h, toRefs, useSlots } from "vue";
import FormGroup from "../FormGroup/FormGroup.vue";
import FormHelperText from "../FormHelperText/FormHelperText.vue";
import type { FormNumberInputProps } from "../types";
import "./FormNumberInput.scss";

defineSlots<{
  prependContent?: () => void;
  appendContent?: () => void;
}>();
const slots = useSlots();
const isFormGroup = !!slots["prependContent"] || !!slots["appendContent"];

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();
const props = defineProps<FormNumberInputProps>();

const { name, label, isInline } = props;
const { modelValue, disabled, helperText, error } = toRefs(props);

const renderInput = () => {
  return h("input", {
    value: modelValue.value,
    name,
    class: [
      "form-number-input__input",
      {
        "form-number-input__input--error": error.value,
        "form-number-input__input--inline": isInline,
      },
    ],
    disabled: disabled.value,
    type: "number",
    onInput: (event: Event) => {
      emit("update:modelValue", (event.target as HTMLInputElement).value);
    },
  });
};
</script>

<template>
  <FormGroup :is-inline="isInline" class-name="form-number-input" :id="name">
    <template v-slot:label>
      {{ label }}
    </template>
    <template v-slot:input>
      <div
          v-if="isFormGroup"
          class="form-number-input__group"
          :class="{
          'form-number-input__group--inline': isInline,
        }"
      >
        <div v-if="slots['prependContent']" class="form-number-input__attachment">
          <slot name="prependContent"></slot>
        </div>
        <renderInput />
        <div v-if="slots['appendContent']" class="form-number-input__attachment">
          <slot name="appendContent"></slot>
        </div>
      </div>
      <renderInput v-else />
      <FormHelperText :text="helperText" :error="error" />
    </template>
  </FormGroup>
</template>
