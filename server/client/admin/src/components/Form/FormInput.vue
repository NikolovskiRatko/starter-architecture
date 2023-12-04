<script setup lang="ts">
import { inject, computed } from "vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps([
  "modelValue",
  "id",
  "type",
  "isInline",
  "disabled",
  "hasLabel",
]);
const form = inject("form");
const labelStart = inject("labelStart");

const inputValue = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emit("update:modelValue", newValue);
  },
});
</script>

<template>
  <div
    class="d-flex"
    :class="{
      'd-inline-flex': isInline,
      'flex-column': !isInline,
    }"
  >
    <label
      v-if="!!id"
      :for="id"
      class="text-2"
      :class="{
        'col-form-label': !isInline,
      }"
    >
      {{ $t(labelStart + "." + id) }}
    </label>
    <input
      :id="id"
      aria-describedby="PLACEHOLDER"
      :value="inputValue"
      :name="id"
      :class="['form-control', { error: form.errors.has(id) }]"
      :disabled="disabled"
      :type="type ?? 'text'"
      @input="(event) => (inputValue = event.target.value)"
    />
  </div>
</template>
