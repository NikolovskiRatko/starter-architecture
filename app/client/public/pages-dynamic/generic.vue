<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const { id, type } = route.meta;
</script>
<template>
  <Jumbotron>
    <h1>Generic dynamic page</h1>
    {{type}} - {{id}}
  </Jumbotron>
</template>
