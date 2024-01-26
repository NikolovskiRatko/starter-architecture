<script setup>
  import { ref } from 'vue';
  import { cloneDeep } from 'lodash-es';
  import { productColumns } from '@/composables/data/productColumns';
  const type = ref('product');
  const modelColumns = ref(cloneDeep(productColumns));
</script>

<template>
  <BasicDisplayComponent
          v-if="modelColumns.length > 0"
          :type=type
          :modelColumns="modelColumns" />
</template>