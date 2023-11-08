<script setup lang="ts">
  import { inject, ref, provide, PropType } from 'vue';
  import { TableSections } from '../typings';

  import './TableRow.scss';

  const props = defineProps({
    section: {
      type: String as PropType<TableSections>,
      default: 'body'
    },
    isEven: {
      default: false
    }
  })

  provide('isEvenRow', props.isEven);

  const isHovering = ref(false);
  const isLoading = inject('isLoading');
  const toggleHover = () => {
    isHovering.value = !isHovering.value
  }
</script>

<template>
  <tr
    class="kt-datatable__row"
    :class="[
      `kt-datatable__row--${section}`, {
      'kt-datatable__row--hover': isHovering,
      'kt-datatable__row--loaded': !isLoading
    }]"
    @mouseover="toggleHover"
    @mouseout="toggleHover"
  >
    <slot />
  </tr>
</template>
