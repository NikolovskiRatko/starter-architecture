<script setup lang="ts">
  import { inject, PropType, computed } from 'vue';
  import { TableSections } from "@/components/Datatables/typings";

  const props = defineProps({
    width: {
      type: String,
      required: false
    },
    section: {
      type: String as PropType<TableSections>,
      default: 'body'
    }
  })

  const isLoading = inject('isLoading');
  const hasError = inject('hasError');
  const isEvenRow = inject('isEvenRow');
  const style = computed(() => {
    const stylesArray: string[] = [];
    if (props.width) {
      stylesArray.push(`width:${props.width};`)
    }

    return stylesArray.join('');
  })

  import './TableColumn.scss';
</script>

<template>
  <td
    class="kt-datatable__cell"
    :class="[
      `kt-datatable__cell--${section}`, {
        'kt-datatable__cell--loaded': !isLoading,
        'kt-datatable__cell--error': hasError,
        'kt-datatable__cell--even': isEvenRow
      }
    ]"
    :style="style"
  >
    <slot />
  </td>
</template>
