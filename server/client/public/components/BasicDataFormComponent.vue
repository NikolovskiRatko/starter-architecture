<script setup>
  import { ref, onMounted, defineProps } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import useAxios from '@/composables/useAxios';

  const router = useRouter();
  const route = useRoute();
  // const validationErrors = ref({});
  const isEdit = ref(false);
  const itemId = ref(route.params.id);

  const { getItem, postForm } = useAxios();

  const {
    model,
    type,
    propertyArray} =
  defineProps([
    'model',
    'type',
    'propertyArray']);

  const modelProxy = computed({
    get: () => model.value,
    set: (newValue) => {
      model.value = { ...model.value, ...newValue };
    },
  });

  onMounted(async () => {
    isEdit.value = route.params.id !== 'new';
    if (isEdit.value) {
      fetchData();
    }
  });

  async function fetchData() {
    try {
      const response = await getItem(type, route.params.id);
      model.value = response;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const saveModel = async () => {
    try {
      await postForm(type, itemId, modelProxy);
      router.push(`/${type}s`);
    } catch (error) {
      console.log(error);
      // Handle validation errors
      // validationErrors.value = error.errors;
      console.log(validationErrors.value);
    }
  };
</script>

<template>
  <div class="jumbotron">
    <div class="jumbotron_background">

    </div>
    <div class="container-fluid jumbotron_wrapper">
      <div class="offset-md-2">
        <h1>{{ itemId == 'new' ? 'Add New' : 'Edit' }} {{type}}</h1>
        <p v-for="(property, key) in propertyArray" :key="key">
          <label :for="key">{{ property }}</label><br />
          <input v-if="modelProxy"
                  type="text"
                  :id="key"
                  v-model="modelProxy[property]" />
        </p>

        <!-- Display validation errors using v-for -->
<!--        <div v-for="(error, fieldName) in validationErrors" :key="fieldName">-->
<!--          <span class="text-red-600">{{ fieldName }}: {{ error[0] }}</span>-->
<!--        </div>-->

        <button @click="saveModel">Save</button>
      </div>
    </div>
  </div>
</template>