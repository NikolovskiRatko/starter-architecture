<script setup lang="ts">
  import { h, toRefs, useSlots } from "vue";
  import FormGroup from "../FormGroup/FormGroup.vue";
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

  const { id, label, isInline, type } = props;
  const { modelValue, hasError, disabled, helperText } = toRefs(props);

  const renderInput = () => {
    return h("input", {
      id,
      value: modelValue.value,
      name: id,
      class: [
        "form-input__input",
        {
          "form-input__input--error": hasError.value,
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
  <FormGroup :is-inline="isInline" class-name="form-input">
    <template v-slot:columnLeft>
      <label v-if="label" :for="id" class="form-input__label">
        {{ label }}
      </label>
    </template>
    <template v-slot:columnRight>
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
      <span v-if="helperText" class="form-input__helper-text">{{
        helperText
      }}</span>
    </template>
  </FormGroup>
</template>
