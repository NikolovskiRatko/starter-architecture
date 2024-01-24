<script setup>
  const route = useRoute()
  console.log(route.params) // { id: '123' }
</script>

<template>
  <div class="jumbotron">
    <div class="jumbotron_background">

    </div>
    <div class="container-fluid jumbotron_wrapper">
      <h1 class="offset-md-2">Magazine ID: {{ $route.params.id }}</h1>
    </div>
  </div>
</template>