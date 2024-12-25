<script lang="ts" setup>
  import type { FormInputRadioProps } from "../types";
  import FormGroup from "../FormGroup/FormGroup.vue";
  import "./FormInputRadio.scss";

  const {
    direction = "horizontal",
    isDisabled = false,
    type = "default",
    theme = "default",
    label,
    isInline,
    id,
    error,
    modelValue,
    options,
    helperText
  } = defineProps<FormInputRadioProps>();

  const emit = defineEmits<{
    "update:modelValue": [value: string];
  }>();
</script>

<template>
  <FormGroup class-name="form-input-radio" :is-inline="isInline" :id="id">
    <template v-slot:label>
      {{ label }}
    </template>
    <template v-slot:input>
      <div
        :class="[
          'form-input-radio__group',
          `form-input-radio__group--${direction}`,
          {
            'form-input-radio__group--inline': isInline,
          },
        ]"
      >
        <label
          :class="[
            'form-input-radio__radio',
            `form-input-radio__radio--${direction}`,
            `form-input-radio__radio--${type}-type`,
            {
              'form-input-radio__radio--disabled': isDisabled,
              [`form-input-radio__radio--${theme}`]: theme,
            },
          ]"
          v-for="{ id: optionId, name: optionName } in options"
          :key="optionId"
        >
          <input
            class="form-input-radio__input"
            :id="id + 'radio-' + optionId"
            :name="id"
            type="radio"
            :value="optionId"
            :checked="modelValue === optionId"
            :disabled="isDisabled"
            @click="
              () => {
                emit('update:modelValue', optionId);
              }
            "
          />
          {{ optionName }}
          <span
            :class="[
              'form-input-radio__dot',
              `form-input-radio__dot--${type}-type`,
              `form-input-radio__dot--${theme}-theme`,
              {
                'form-input-radio__dot--checked': modelValue === optionId,
                'form-input-radio__dot--disabled': isDisabled,
              },
            ]"
          ></span>
        </label>
      </div>
      <span v-if="helperText" class="form-input-radio__helper-text">{{
        helperText
      }}</span>
      <span v-if="error" class="form-input-radio__error">
        {{ error }}
      </span>
    </template>
  </FormGroup>
</template>
