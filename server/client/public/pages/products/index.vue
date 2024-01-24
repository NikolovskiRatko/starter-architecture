<script setup>
  import { ref, onMounted } from 'vue';
  import useAxios from '@/composables/useAxios';
  const { getDatatableData } = useAxios();
  import { productColumns } from '@/composables/data/productColumns';
  let products = ref([]);

  const type = 'products';

  onMounted(async () => {
    fetchData();
  });

  async function fetchData() {
    try {
      products = await getDatatableData(type);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

</script>

<template>
  <div class="jumbotron">
    <div class="jumbotron_background">

    </div>
    <div class="container-fluid jumbotron_wrapper">
      <h1 class="offset-md-2">Products</h1>
      <h5 class="offset-md-2 add_new-button">
        <router-link :to="{ name: 'products-id', params: { id: 'new' } }">Add New Product</router-link>
      </h5>
      <DatatableComponent :records="products" type="product" :mainRow="productColumns" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  body {
    font-family: 'lato', sans-serif;
    background-color: white !important;
    color: black;
    background-color: white;
  }
  .container {
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 10px;
    padding-right: 10px;
  }

  h2 {
    font-size: 26px;
    margin: 20px 0;
    text-align: center;
    small {
      font-size: 0.5em;
    }
  }
  .add_new-button {
    & > a {
      color: black;
      background: lightblue;
    }
    text-align: right;
    font-weight: 700;
  }
</style>
