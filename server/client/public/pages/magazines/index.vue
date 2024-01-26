<script setup>
  import { ref } from 'vue';
  import { cloneDeep } from 'lodash-es';
  import { magazineColumns } from '@/composables/data/magazineColumns';
  const type = ref('magazine');
  const modelColumns = ref(cloneDeep(magazineColumns));
</script>

<template>
  <BasicDisplayComponent
          v-if="modelColumns.length > 0"
          :type=type
          :modelColumns="modelColumns" />
</template>