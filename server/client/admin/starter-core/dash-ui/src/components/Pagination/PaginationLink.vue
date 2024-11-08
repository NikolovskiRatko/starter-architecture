<script setup lang="ts">
  import { computed } from "vue";
  import "./PaginationLink.scss";

  interface PaginationLinkProps {
    isDisabled?: boolean;
    isActive?: boolean;
    classModifiers?: string[];
  }

  const emit = defineEmits<{
    (e: "onClick", event: HTMLAnchorElement): void;
  }>();
  const {
    classModifiers = [],
    isActive = false,
    isDisabled = false
  } = defineProps<PaginationLinkProps>();

  const classNames = computed(() => {
    return classModifiers.map((modifier) => {
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
          'kt-datatable__pager__link--disabled': isDisabled,
          'kt-datatable__pager__link--active': isActive,
        },
      ]"
      @click.prevent="(event) => emit('onClick', event)"
    >
      <slot />
    </a>
  </li>
</template>
