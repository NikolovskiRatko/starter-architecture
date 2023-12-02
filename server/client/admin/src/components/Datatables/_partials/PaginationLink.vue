<script setup lang="ts">
import { inject, PropType, computed } from "vue";

import "./PaginationLink.scss";

const emit = defineEmits<{
  (e: "onClick", event: HTMLAnchorElement): void;
}>();
const props = defineProps({
  isDisabled: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  classModifiers: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
});

const classNames = computed(() => {
  return props.classModifiers.map((modifier) => {
    return `kt-datatable__pager__link--${modifier}`;
  });
});
</script>

<template>
  <li>
    <a
      class="kt-datatable__pager__link"
      :class="[
        ...classNames,
        {
          'kt-datatable__pager__link--disabled': props.isDisabled,
          'kt-datatable__pager__link--active': props.isActive,
        },
      ]"
      @click.prevent="(event) => emit('onClick', event)"
    >
      <slot />
    </a>
  </li>
</template>
