<script lang="ts" setup>
import { inject } from "vue";

interface FormInputRadioProps {
  value: any;
  id: string;
  label?: string;
  options: Array<any>;
  isInline?: boolean;
  disabled?: boolean;
}

const props: FormInputRadioProps = defineProps({
  value: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
  },
  options: {
    type: Array,
    required: true,
  },
  isInline: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const form = inject("form");

const emit = defineEmits(["update:modelValue"]);

function emitValue(value: unknown) {
  emit("update:modelValue", value);
}
</script>

<template>
  <div
    class="form-group form-radio"
    :class="{
      'form-group-inline': isInline,
    }"
  >
    <div class="form-row">
      <div
        v-if="label !== undefined"
        :class="{
          'col-12': !isInline,
          'col-lg-4 col-md-2': isInline,
        }"
      >
        <label
          class="text-2"
          :class="{
            'col-form-label': isInline,
          }"
        >
          {{ $t(label) }}
        </label>
      </div>
      <div
        :class="{
          'col-12': !isInline,
          'col-lg-8 col-md-10': isInline,
        }"
      >
        <template v-for="option in options">
          <input
            :id="id + 'checkbox-' + option.id"
            :name="id"
            type="radio"
            aria-describedby="PLACEHOLDER"
            class="checkbox"
            :value="option.id"
            :checked="value === option.id"
            :disabled="disabled"
            @click="emitValue(option.id)"
          />

          <label
            v-if="option.imageSrc === undefined"
            :for="id + 'checkbox-' + option.id"
            class="radio-label"
          >
            {{ option.name }}
          </label>

          <label v-else :for="id + 'checkbox-' + option.id" class="radio-label">
            <img :src="option.imageSrc" class="img-fluid" />
          </label>
        </template>
        <span v-if="form.errors.has(id)" class="help is-danger">
          {{ $t(form.errors.get(id)) }}
        </span>
      </div>
    </div>
  </div>
</template>
