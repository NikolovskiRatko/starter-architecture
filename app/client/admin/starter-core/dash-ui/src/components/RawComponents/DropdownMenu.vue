<script setup lang="ts">
import './DropdownMenu.scss';

interface DropdownMenuProps {
  className?: string;
  isVisible?: boolean;
}

const { className, isVisible } = defineProps<DropdownMenuProps>();
</script>
<template>
  <div
      class="dropdown-menu"
      :class="{
        [`${className}`]: !!className,
        show: isVisible
      }"
  >
    <slot />
  </div>
</template>
