<script setup>
  import { ref, onMounted } from 'vue';
  import { cloneDeep } from 'lodash-es';
  import { useRouter, useRoute } from 'vue-router';
  import useAxios from '@/composables/useAxios';
  import { productObject } from '@/composables/data/productObject';

  const router = useRouter();
  const route = useRoute();
  const product = ref(cloneDeep(productObject));
  const validationErrors = ref([]);
  const isEdit = ref(false);
  const entryId = ref(route.params.id);

  const { getEntityById, postForm } = useAxios();

  const type = 'product';

  onMounted(async () => {
    isEdit.value = route.params.id !== 'new';
    if (isEdit.value) {
      try {
        const res = await getEntityById(type + entryId);
        product.value = res.data;
      } catch (error) {
        console.error(error);
      }
    }
  });

  const saveProduct = async () => {
    try {
      const res = await postForm(type, entryId, product, true, '/products');
      console.error(res.data);
      validationErrors.value = res.data;
    } catch (error) {
      console.error(error);
    }
  };
</script>

<template>
  <div class="jumbotron">
    <div class="jumbotron_background">

    </div>
    <div class="container-fluid jumbotron_wrapper">
      <div class="offset-md-2">
        <h1>{{ entryId == 'new' ? 'Add New' : 'Edit' }}</h1>
        <p>
          <label for="text1">Title</label><br />
          <input type="text" id="text1" v-model="product.name" />
        </p>
        <p>
          <label for="text2">Content</label><br />
          <textarea id="text2" v-model="product.description"></textarea>
        </p>

        <button @click="saveProduct">Save</button>

        <div v-if="validationErrors">Validation errors: {{validationErrors}}</div>
      </div>
    </div>
  </div>
</template>