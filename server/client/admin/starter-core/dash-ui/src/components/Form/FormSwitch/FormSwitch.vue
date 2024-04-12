<script setup lang="ts">
  import { withDefaults, toRefs } from "vue";
  import FormGroup from "../FormGroup/FormGroup.vue";
  import type { FormSwitchProps } from "../types";
  import "./FormSwitch.scss";

  const props = withDefaults(defineProps<FormSwitchProps>(), {
    isDisabled: false,
    size: "md",
    type: "solid",
    theme: "primary",
  });
  const { size, type, label, id } = props;
  const { modelValue, isDisabled, theme, helperText } = toRefs(props);

  const emit = defineEmits<{
    "update:modelValue": [value: boolean];
  }>();

  const onChangeHandler = (event: Event) => {
    if (event.target) {
      emit("update:modelValue", (event.target as HTMLInputElement).checked);
    }
  };
</script>
<template>
  <FormGroup :is-inline="true" class-name="d-form-switch" :id="id">
    <template v-slot:label>
      {{ label }}
    </template>
    <template v-slot:input>
      <span class="d-form-switch__switch">
        <label>
          <input
            class="d-form-switch__input"
            :value="modelValue"
            type="checkbox"
            name=""
            :checked="modelValue"
            @change="onChangeHandler"
          />
          <span
            :class="[
              'd-form-switch__handle',
              {
                'd-form-switch__handle--checked': modelValue,
                'd-form-switch__handle--disabled': isDisabled,
                [`d-form-switch__handle--${type}`]: type,
                [`d-form-switch__handle--${theme}`]: theme,
                [`d-form-switch__handle--${size}`]: size,
              },
            ]"
          ></span>
        </label>
        <span v-if="helperText" class="d-form-switch__helper-text">{{
        helperText
      }}</span>
      </span>
    </template>
  </FormGroup>
</template>
