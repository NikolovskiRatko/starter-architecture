<script setup lang="ts">
  import { h, toRefs, useSlots } from "vue";
  import FormGroup from "../FormGroup/FormGroup.vue";
  import FormHelperText from "../FormHelperText/FormHelperText.vue";
  import type { FormInputProps } from "../types";
  import "./FormInput.scss";

  defineSlots<{
    prependContent?: () => void;
    appendContent?: () => void;
  }>();
  const slots = useSlots();
  const isFormGroup = !!slots["prependContent"] || !!slots["appendContent"];

  const emit = defineEmits<{
    "update:modelValue": [value: string];
  }>();
  const props = defineProps<FormInputProps>();

  const { name, label, isInline, type } = props;
  const { modelValue, disabled, helperText, error } = toRefs(props);

  const renderInput = () => {
    return h("input", {
      value: modelValue.value,
      name,
      class: [
        "form-input__input",
        {
          "form-input__input--error": error.value,
          "form-input__input--inline": isInline,
        },
      ],
      disabled: disabled.value,
      type: type ?? "text",
      onInput: (event: Event) => {
        emit("update:modelValue", (event.target as HTMLInputElement).value);
      },
    });
  };
</script>

<template>
  <FormGroup :is-inline="isInline" class-name="form-input" :id="name">
    <template v-slot:label>
      {{ label }}
    </template>
    <template v-slot:input>
      <div
        v-if="isFormGroup"
        class="form-input__group"
        :class="{
          'form-input__group--inline': isInline,
        }"
      >
        <div v-if="slots['prependContent']" class="form-input__attachment">
          <slot name="prependContent"></slot>
        </div>
        <renderInput />
        <div v-if="slots['appendContent']" class="form-input__attachment">
          <slot name="appendContent"></slot>
        </div>
      </div>
      <renderInput v-else />
      <FormHelperText :text="helperText" :error="error" />
    </template>
  </FormGroup>
</template>
