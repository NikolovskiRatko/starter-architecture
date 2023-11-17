<script setup lang="ts">
  import { computed } from 'vue';

  const props = defineProps(['form', 'value', 'id', 'isInline', 'label', 'isDisabled', 'options']);
  const emit = defineEmits(['update:modelValue']);
  const colOneClass = props.isInline ? 'col-12' : 'col-lg-4 col-md-2';
  const colTwoClass = props.isInline || !!props.label ? 'col-12' : 'col-lg-8 col-md-10';
  const labelClass = props.isInline ? 'text-2' : 'col-form-label text-2';
  const formGroupClass = props.isInline ? 'form-group' : 'form-group form-group-inline';

  const hasError = computed(() => props?.form?.errors?.has(props.id));

  const emitValue = (value) => {
    emit('update:modelValue', value)
  }
</script>

<template>
  <div :class="formGroupClass">
    <div class="form-row">
      <div
        v-if="label !== undefined"
        :class="colOneClass"
      >
        <label
          :for="id"
          :class="labelClass"
        >{{ $t(label) }}</label>
      </div>
      <div :class="colTwoClass">
        <select
          :id="id"
          :name="id"
          class="form-control"
          :class="{
            'error': hasError
          }"
          :value="value"
          :disabled="isDisabled"
          @input="emitValue($event.target.value)"
        >
          <option value="">
            Select an Option
          </option>
          <option
            v-for="option in options"
            :key="option.id"
            :selected="option.name == value? 'selected': ''"
            :value="option.name"
          >
            {{ option.name }}
          </option>
        </select>
        <div
          v-if="typeof form != 'undefined' && form.errors.has(id)"
          class="invalid-feedback"
        >
          <span v-for="error in form.errors.errors[id]">{{ $t(error) }}</span>
        </div>
      </div>
    </div> <!-- .form-row -->
  </div> <!-- .form-group -->
</template>
