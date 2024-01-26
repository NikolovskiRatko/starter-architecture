<script setup>
  import { ref } from 'vue';
  import { cloneDeep } from 'lodash-es';
  import { magazineObject } from '@/composables/data/magazineObject';
  import { magazinePropertyArray } from '@/composables/data/magazinePropertyArray';

  const model = ref(cloneDeep(magazineObject));
  const propertyArray = ref(cloneDeep(magazinePropertyArray));
  const type = 'magazine';
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