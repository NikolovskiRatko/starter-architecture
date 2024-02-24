<script setup lang="ts">
  import type { FormGroupProps } from "../types";
  import "./FormGroup.scss";

  const { isInline, className } = withDefaults(defineProps<FormGroupProps>(), {
    isInline: false,
    className: "",
  });

  const slots = defineSlots<{
    columnLeft: () => void;
    columnRight: () => void;
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
      <slot name="columnLeft"></slot>
    </div>
    <div
      class="form-group__column form-group__column--right"
      :class="{
        'form-group__column--inline': isInline,
      }"
    >
      <slot name="columnRight"></slot>
    </div>
  </div>
</template>
