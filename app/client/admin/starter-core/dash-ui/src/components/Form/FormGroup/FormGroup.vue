<script setup lang="ts">
  import type { FormGroupProps } from "../types";
  import "./FormGroup.scss";

  const {
    isInline = false,
    className = "",
    id
  } = defineProps<FormGroupProps>();

  const slots = defineSlots<{
    label: () => void;
    input: () => void;
  }>();
</script>
<template>
  <div
    class="form-group"
    :class="[
      className,
      {
        'form-group--inline': isInline,
      },
    ]"
  >
    <div
      class="form-group__column form-group__column--left"
      :class="{
        'form-group__column--inline': isInline,
      }"
    >
      <label class="form-group__label" :for="id">
        <slot name="label"></slot>
      </label>
    </div>
    <div
      class="form-group__column form-group__column--right"
      :class="{
        'form-group__column--inline': isInline,
      }"
    >
      <slot name="input"></slot>
    </div>
  </div>
</template>
