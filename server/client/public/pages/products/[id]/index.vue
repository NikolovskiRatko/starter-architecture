<script setup>
  import { ref } from 'vue';
  import { cloneDeep } from 'lodash-es';
  import { productObject } from '@/composables/data/productObject';
  import { productPropertyArray } from '@/composables/data/productPropertyArray';

  const model = ref(cloneDeep(productObject));
  const propertyArray = ref(cloneDeep(productPropertyArray));
  const type = 'product';
</script>

<template>
  <div class="jumbotron">
    <div class="jumbotron_background">

    </div>
    <BasicDataFormComponent v-if="propertyArray.length > 0"
                            :model=model
                            :type=type
                            :propertyArray="propertyArray" />
  </div>
</template>